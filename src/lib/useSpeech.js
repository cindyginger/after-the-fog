import { useEffect, useRef, useState, useCallback } from 'react'
import { staticBurst } from './sound.js'
import { speakLine, cancelSpeech } from './voice.js'
import { t } from './i18n.js'

// Speech engine: types a queue of lines out while the browser's speech
// synthesis reads them aloud in the character's voice. A line is "done"
// only when BOTH the typing and the voice finish; the bubble then lingers
// briefly so slower readers aren't robbed of the last sentence.
//
// State exposed:
//   speakingId     — whose mouth is moving (voice still going)
//   currentSpeaker — whose bubble is showing (includes the linger)
//   currentKey     — which message is in the bubble / held out of the archive
//
// Job: { key, speaker, text, static, onStart, onDone }
export function useSpeech({ charDelay = 34, gapDelay = 350 } = {}) {
  const [rendered, setRendered] = useState({})   // key -> partial text
  const [speakingId, setSpeakingId] = useState(null)
  const [currentSpeaker, setCurrentSpeaker] = useState(null)
  const [currentKey, setCurrentKey] = useState(null)
  const [busy, setBusy] = useState(false)
  const queueRef = useRef([])
  const currentJobRef = useRef(null)
  const busyRef = useRef(false)
  const timerRef = useRef(null)     // typing / static-delay / gap timer
  const lingerRef = useRef(null)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    return () => {
      aliveRef.current = false
      clearTimeout(timerRef.current)
      clearTimeout(lingerRef.current)
      cancelSpeech()
      if (typeof window !== 'undefined') window.__atfSpeechBusy = false
    }
  }, [])

  // the guided tour polls this to know when a line has finished
  useEffect(() => {
    if (typeof window !== 'undefined') window.__atfSpeechBusy = busy
  }, [busy])

  const pump = useCallback(() => {
    if (!aliveRef.current) return
    const job = queueRef.current.shift()
    if (!job) {
      busyRef.current = false
      setBusy(false)
      return
    }
    busyRef.current = true
    currentJobRef.current = job
    setBusy(true)

    const begin = () => {
      if (!aliveRef.current || currentJobRef.current !== job) return
      job.onStart?.()
      setSpeakingId(job.speaker)
      setCurrentSpeaker(job.speaker)
      setCurrentKey(job.key)

      let typingDone = false
      let voiceDone = false

      const finishLine = () => {
        if (!aliveRef.current || currentJobRef.current !== job) return
        if (!typingDone || !voiceDone) return
        // line fully delivered — mouth stops, bubble lingers, then next
        setSpeakingId(null)
        job.onDone?.()
        const linger = voiceStarted
          ? 900
          : Math.min(3500, Math.max(1500, 700 + job.text.length * 13))
        lingerRef.current = setTimeout(() => {
          if (!aliveRef.current || currentJobRef.current !== job) return
          setCurrentSpeaker(null)
          setCurrentKey(null)
          currentJobRef.current = null
          timerRef.current = setTimeout(pump, gapDelay)
        }, linger)
      }

      const voiceStarted = speakLine(job.speaker, job.text, {
        onEnd: () => {
          if (currentJobRef.current !== job) return
          voiceDone = true
          finishLine()
        }
      })
      if (!voiceStarted) voiceDone = true

      let i = 0
      const step = () => {
        if (!aliveRef.current || currentJobRef.current !== job) return
        i = Math.min(job.text.length, i + 2)
        setRendered(r => ({ ...r, [job.key]: job.text.slice(0, i) }))
        if (i < job.text.length) {
          timerRef.current = setTimeout(step, charDelay)
        } else {
          typingDone = true
          finishLine()
        }
      }
      step()
    }

    if (job.static) {
      staticBurst(0.7)
      timerRef.current = setTimeout(begin, 620)
    } else {
      begin()
    }
  }, [charDelay, gapDelay])

  const speak = useCallback((job) => {
    // translate at the door: typing, voice and archive all use the same text
    queueRef.current.push({ ...job, text: t(job.text) })
    if (!busyRef.current) pump()
  }, [pump])

  // Finish everything instantly (voice included).
  const skip = useCallback(() => {
    if (!busyRef.current) return
    clearTimeout(timerRef.current)
    clearTimeout(lingerRef.current)
    cancelSpeech()
    const current = currentJobRef.current
    const pending = queueRef.current
    queueRef.current = []
    currentJobRef.current = null
    const finished = {}
    if (current) {
      if (rendered[current.key] === undefined) current.onStart?.()
      finished[current.key] = current.text
      current.onDone?.()
    }
    for (const job of pending) {
      job.onStart?.()
      finished[job.key] = job.text
      job.onDone?.()
    }
    setRendered(r => ({ ...r, ...finished }))
    busyRef.current = false
    setBusy(false)
    setSpeakingId(null)
    setCurrentSpeaker(null)
    setCurrentKey(null)
  }, [rendered])

  return { rendered, speakingId, currentSpeaker, currentKey, busy, speak, skip }
}
