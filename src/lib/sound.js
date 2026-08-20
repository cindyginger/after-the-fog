// Synthesized audio — no audio assets, everything generated in WebAudio.
// Each character gets a distinct "voice murmur" (pitch + timbre) that
// plays in sync with the typewriter, plus UI ticks, radio static for
// evasive lines, and the judgment drone. Original game audio is
// copyrighted and deliberately not used.

let ctx = null
let muted = false
try { muted = localStorage.getItem('atf-muted') === '1' } catch { /* ignore */ }

function ensure() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function setMuted(m) {
  muted = m
  try { localStorage.setItem('atf-muted', m ? '1' : '0') } catch { /* ignore */ }
  if (!m) confirmTone()   // instant audible feedback when sound comes back on
}
export function isMuted() { return muted }

// Short dry tick for buttons — like a switch in an empty room.
export function click() {
  if (muted) return
  const c = ensure(); if (!c) return
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  const filter = c.createBiquadFilter()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(240, t)
  osc.frequency.exponentialRampToValueAtTime(120, t + 0.05)
  filter.type = 'lowpass'
  filter.frequency.value = 1000
  gain.gain.setValueAtTime(0.09, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
  osc.connect(filter).connect(gain).connect(c.destination)
  osc.start(t); osc.stop(t + 0.08)
}

// Two soft tones — confirmation when unmuting.
function confirmTone() {
  const c = ensure(); if (!c) return
  const t = c.currentTime
  ;[[392, 0], [523, 0.14]].forEach(([f, dt]) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.value = f
    gain.gain.setValueAtTime(0.0001, t + dt)
    gain.gain.exponentialRampToValueAtTime(0.08, t + dt + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.22)
    osc.connect(gain).connect(c.destination)
    osc.start(t + dt); osc.stop(t + dt + 0.25)
  })
}

// Per-character voice profiles: base pitch, waveform, and mumble character.
const VOICES = {
  james:  { freq: 102, type: 'sine',     wobble: 10, gain: 0.075 },
  maria:  { freq: 192, type: 'triangle', wobble: 26, gain: 0.06 },
  mary:   { freq: 148, type: 'sine',     wobble: 12, gain: 0.062 },
  angela: { freq: 176, type: 'sine',     wobble: 34, gain: 0.05 },
  eddie:  { freq: 84,  type: 'square',   wobble: 14, gain: 0.038 },
  laura:  { freq: 284, type: 'triangle', wobble: 40, gain: 0.06 }
}

let lastBlip = 0
export function blip(charId) {
  if (muted) return
  const v = VOICES[charId]
  if (!v) return
  const now = performance.now()
  if (now - lastBlip < 72) return   // syllable pacing
  lastBlip = now
  const c = ensure(); if (!c) return
  const t = c.currentTime
  const osc = c.createOscillator()
  const gain = c.createGain()
  const filter = c.createBiquadFilter()
  osc.type = v.type
  const jitter = (Math.random() * 2 - 1) * v.wobble
  osc.frequency.setValueAtTime(v.freq + jitter, t)
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, v.freq + jitter * 0.3 - 14), t + 0.07)
  filter.type = 'lowpass'
  filter.frequency.value = 1200
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(v.gain, t + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.085)
  osc.connect(filter).connect(gain).connect(c.destination)
  osc.start(t); osc.stop(t + 0.1)
}

// Radio static — plays just before an evasive line. The radio never lies.
export function staticBurst(duration = 0.7) {
  if (muted) return
  const c = ensure(); if (!c) return
  const t = c.currentTime
  const len = Math.floor(c.sampleRate * duration)
  const buffer = c.createBuffer(1, len, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buffer
  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1500
  filter.Q.value = 0.5
  const gain = c.createGain()
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.05, t + 0.06)
  gain.gain.setValueAtTime(0.05, t + duration * 0.55)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  src.connect(filter).connect(gain).connect(c.destination)
  src.start(t); src.stop(t + duration)
}

// The judgment drone — two low tones a tritone apart, swelling and dying.
export function judgment() {
  if (muted) return
  const c = ensure(); if (!c) return
  const t = c.currentTime
  ;[[46, 0.11], [65, 0.07]].forEach(([f, g]) => {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(f, t)
    osc.frequency.linearRampToValueAtTime(f * 0.94, t + 2.4)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(g, t + 0.5)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.6)
    osc.connect(gain).connect(c.destination)
    osc.start(t); osc.stop(t + 2.7)
  })
  // a breath of scraped static under it
  staticBurst(0.45)
}

// ---------------------------------------------------------------- ambience

// Looping synthesized room tone per place. One ambience at a time,
// faded in and out. All generated — no audio files.
let amb = null

function noiseSource(c) {
  const len = c.sampleRate * 2
  const buffer = c.createBuffer(1, len, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buffer
  src.loop = true
  return src
}

export function startAmbience(id) {
  stopAmbience()
  if (muted) return
  const c = ensure(); if (!c) return
  const t = c.currentTime
  const master = c.createGain()
  master.gain.setValueAtTime(0.0001, t)
  master.gain.linearRampToValueAtTime(1, t + 2.5)
  master.connect(c.destination)
  const sources = []
  const timers = []

  const noiseThrough = (filterType, freq, q, gainValue) => {
    const src = noiseSource(c)
    const f = c.createBiquadFilter()
    f.type = filterType; f.frequency.value = freq; f.Q.value = q
    const g = c.createGain(); g.gain.value = gainValue
    src.connect(f).connect(g).connect(master)
    src.start()
    sources.push(src)
    return g
  }
  const tone = (type, freq, gainValue) => {
    const o = c.createOscillator()
    o.type = type; o.frequency.value = freq
    const g = c.createGain(); g.gain.value = gainValue
    o.connect(g).connect(master)
    o.start()
    sources.push(o)
    return { o, g }
  }

  if (id === 'toluca') {
    // slow water: low rumble of filtered noise, swelling like small waves
    const water = noiseThrough('lowpass', 340, 0.6, 0.028)
    const lfo = c.createOscillator(); lfo.frequency.value = 0.09
    const lfoGain = c.createGain(); lfoGain.gain.value = 0.016
    lfo.connect(lfoGain).connect(water.gain)
    lfo.start(); sources.push(lfo)
    tone('sine', 46, 0.010)
  } else if (id === 'hospital') {
    // fluorescent hum + thin air
    tone('sawtooth', 100, 0.006)
    tone('sine', 200, 0.004)
    noiseThrough('highpass', 3200, 0.7, 0.0035)
    // loose starter crackle now and then
    timers.push(setInterval(() => {
      if (muted) return
      const tt = c.currentTime
      const src = noiseSource(c)
      const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2400; f.Q.value = 2
      const g = c.createGain()
      g.gain.setValueAtTime(0.02, tt)
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.05)
      src.connect(f).connect(g).connect(master)
      src.start(tt); src.stop(tt + 0.06)
    }, 2800 + Math.random() * 2600))
  } else if (id === 'room312') {
    // tv hiss + warm wiring + a patient clock
    noiseThrough('bandpass', 2600, 0.6, 0.005)
    tone('sine', 58, 0.007)
    let tick = false
    timers.push(setInterval(() => {
      if (muted) return
      const tt = c.currentTime
      const o = c.createOscillator()
      o.type = 'triangle'
      o.frequency.value = tick ? 620 : 480
      tick = !tick
      const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 1200
      const g = c.createGain()
      g.gain.setValueAtTime(0.02, tt)
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 0.06)
      o.connect(f).connect(g).connect(master)
      o.start(tt); o.stop(tt + 0.07)
    }, 1000))
  } else if (id === 'judgment') {
    // two low tones a breath apart — the room is awake
    tone('sine', 40, 0.016)
    tone('sine', 41.6, 0.012)
    noiseThrough('lowpass', 180, 0.5, 0.006)
  } else {
    master.disconnect()
    return
  }

  amb = { master, sources, timers, ctx: c }
}

export function stopAmbience() {
  if (!amb) return
  const { master, sources, timers, ctx } = amb
  amb = null
  timers.forEach(clearInterval)
  const t = ctx.currentTime
  try {
    master.gain.cancelScheduledValues(t)
    master.gain.setValueAtTime(master.gain.value, t)
    master.gain.linearRampToValueAtTime(0.0001, t + 0.9)
  } catch { /* context closed */ }
  setTimeout(() => {
    sources.forEach(s => { try { s.stop() } catch { /* already stopped */ } })
    try { master.disconnect() } catch { /* fine */ }
  }, 1000)
}

// A small glint — something hidden has been found.
export function discover() {
  if (muted) return
  const c = ensure(); if (!c) return
  const t = c.currentTime
  ;[[740, 0], [988, 0.11], [1318, 0.22]].forEach(([f, dt]) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.value = f
    g.gain.setValueAtTime(0.0001, t + dt)
    g.gain.exponentialRampToValueAtTime(0.05, t + dt + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.3)
    o.connect(g).connect(c.destination)
    o.start(t + dt); o.stop(t + dt + 0.35)
  })
}
