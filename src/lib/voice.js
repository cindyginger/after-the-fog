// Character voices via the browser's speech synthesis, with a small
// prosody engine (pauses, question lift, emphasis, per-chunk drift) and
// hardening against the classic Chrome speechSynthesis failure modes:
//   - getVoices() being empty until voiceschanged fires  → wait for voices
//   - speak() right after cancel() going permanently mute → small delay
//   - long utterances cut off after ~15s                  → resume heartbeat
//   - utterances garbage-collected mid-speech             → keep references
// Original game audio is deliberately not used.

import { isMuted } from './sound.js'
import { getLang } from './i18n.js'

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

const PROFILES = {
  james:  { gender: 'm', slot: 0, pitch: 0.72, rate: 0.82, volume: 1.0 },
  maria:  { gender: 'f', slot: 0, pitch: 0.98, rate: 0.9,  volume: 1.0 },
  mary:   { gender: 'f', slot: 1, pitch: 0.85, rate: 0.78, volume: 0.95 },
  angela: { gender: 'f', slot: 2, pitch: 0.92, rate: 0.7,  volume: 0.85 },
  eddie:  { gender: 'm', slot: 1, pitch: 0.55, rate: 0.86, volume: 1.0 },
  laura:  { gender: 'f', slot: 3, pitch: 1.45, rate: 1.0,  volume: 1.0 }
}

const MALE_HINT = /daniel|alex|fred|david|evan|nathan|tom|aaron|arthur|oliver|male|guy/i
const FEMALE_HINT = /samantha|karen|victoria|moira|susan|zira|kate|serena|allison|ava|zoe|nicky|tessa|fiona|catherine|female/i

function quality(v) {
  let s = 0
  if (/premium/i.test(v.name)) s += 10
  if (/enhanced|natural/i.test(v.name)) s += 8
  if (/^Google/i.test(v.name)) s += 6
  if (/siri/i.test(v.name)) s += 5
  if (FEMALE_HINT.test(v.name) || MALE_HINT.test(v.name)) s += 3
  if (v.lang === 'en-US' || v.lang === 'en-GB') s += 2
  return s
}

let voiceCache = null
function buildCache() {
  if (!synth) return null
  const all = synth.getVoices()
  if (!all.length) return null
  const en = all.filter(v => v.lang.startsWith('en'))
  const pool = (en.length ? en : all).slice().sort((a, b) => quality(b) - quality(a))
  const males = pool.filter(v => MALE_HINT.test(v.name))
  const females = pool.filter(v => FEMALE_HINT.test(v.name))
  const fallback = pool.slice(0, 1)
  // Chinese pool — used when the exhibition runs in Chinese
  const zh = all.filter(v => v.lang.startsWith('zh')).sort((a, b) => quality(b) - quality(a))
  voiceCache = {
    m: males.length ? males : fallback,
    f: females.length ? females : fallback,
    zh
  }
  return voiceCache
}
if (synth) {
  buildCache()
  synth.onvoiceschanged = () => { voiceCache = null; buildCache() }
}

// Chrome loads voices asynchronously — wait briefly for them.
function whenVoicesReady(timeout = 1800) {
  return new Promise(resolve => {
    if (voiceCache || buildCache()) return resolve(voiceCache)
    const t0 = Date.now()
    const iv = setInterval(() => {
      if (voiceCache || buildCache()) { clearInterval(iv); resolve(voiceCache) }
      else if (Date.now() - t0 > timeout) { clearInterval(iv); resolve(null) }
    }, 150)
  })
}

// Speak a silent utterance inside a user gesture — unlocks TTS permission
// in browsers that require activation. Called once from the first click.
let primed = false
export function primeVoice() {
  if (primed || !synth) return
  primed = true
  try {
    const u = new SpeechSynthesisUtterance(' ')
    u.volume = 0
    synth.speak(u)
  } catch { /* fine */ }
}

export function voiceAvailable() {
  return !!synth && !!(voiceCache || buildCache())
}

// ---- prosody: split a line into breath-sized pieces with pause + tone hints
function chunkLine(text) {
  const chunks = []
  for (const para of text.split(/\n+/)) {
    // sentence-ish splits — Latin and CJK punctuation both count
    const parts = para.match(/[^.!?…。！？]+[.!?…。！？]*/g) || [para]
    let first = true
    for (const raw of parts) {
      const t = raw.trim()
      if (!t) continue
      chunks.push({
        say: t.replace(/…/g, '，').replace(/[「」]/g, ''),
        isQuestion: /[?？]$/.test(t),
        isShout: /[!！]$/.test(t) || /[A-Z]{3,}/.test(t),
        pauseBefore: first && /^\s*…/.test(para) ? 600 : 0,
        pauseAfter: /…$/.test(t) ? 700 : /[?？]$/.test(t) ? 460 : 340
      })
      first = false
    }
    if (chunks.length) chunks[chunks.length - 1].pauseAfter = 800
  }
  return chunks
}

let session = null

export function speakLine(charId, text, { onEnd } = {}) {
  if (!synth || isMuted()) return false
  const profile = PROFILES[charId]
  if (!profile) return false

  cancelSpeech()
  const me = { cancelled: false, timer: null, heartbeat: null, utter: null }
  session = me

  const finish = () => {
    if (me.cancelled) return
    me.cancelled = true
    clearInterval(me.heartbeat)
    clearTimeout(me.timer)
    onEnd?.()
  }

  ;(async () => {
    const voices = await whenVoicesReady()
    if (me.cancelled) return
    if (!voices) { finish(); return }   // no TTS on this browser — typing carries the line
    // in Chinese mode, use Chinese voices (differentiated by pitch/rate/slot)
    const zhMode = getLang() === 'zh' && voices.zh?.length
    const list = zhMode ? voices.zh : voices[profile.gender]
    const voice = list[profile.slot % list.length]

    // Chrome: the ~15s auto-cutoff is dodged by periodic resume()
    me.heartbeat = setInterval(() => {
      try { if (synth.speaking && !synth.paused) synth.resume() } catch { /* fine */ }
    }, 4000)

    const chunks = chunkLine(text)
    let idx = 0

    const speakNext = () => {
      if (me.cancelled) return
      if (idx >= chunks.length) { finish(); return }
      const c = chunks[idx++]

      const go = () => {
        if (me.cancelled) return
        const u = new SpeechSynthesisUtterance(c.say)
        me.utter = u   // hold a reference — Chrome GC bug
        u.voice = voice
        const drift = (Math.random() - 0.5) * 0.07
        u.pitch = Math.max(0.1, profile.pitch + drift + (c.isQuestion ? 0.12 : 0) + (c.isShout ? 0.05 : 0))
        u.rate = Math.max(0.5, profile.rate + (Math.random() - 0.5) * 0.05 + (c.isShout ? 0.08 : 0) - (c.isQuestion ? 0.03 : 0))
        u.volume = Math.min(1, profile.volume + (c.isShout ? 0.05 : 0))
        let done = false
        const next = () => {
          if (done || me.cancelled) return
          done = true
          me.timer = setTimeout(speakNext, c.pauseAfter)
        }
        u.onend = next
        u.onerror = next
        setTimeout(next, Math.max(2500, c.say.length * 110) + 1500)
        try { synth.speak(u) } catch { next() }
      }

      me.timer = setTimeout(go, c.pauseBefore || 0)
    }

    // Chrome: speaking immediately after cancel() can silence everything
    me.timer = setTimeout(speakNext, 80)
  })()

  return true
}

export function cancelSpeech() {
  if (session) {
    session.cancelled = true
    clearTimeout(session.timer)
    clearInterval(session.heartbeat)
    session = null
  }
  if (synth) { try { synth.cancel() } catch { /* fine */ } }
}
