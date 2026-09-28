import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { t, getLang } from '../lib/i18n.js'

// text-content matchers must follow the displayed language
const M = (en, zh) => (getLang() === 'zh' ? zh : en)

// Guided tour: drives the demo itself for ~4 minutes, with captions
// explaining the design as it goes. Built for the reviewer with three
// minutes and no patience — start it and watch.

export const START_TOUR_EVENT = 'atf-start-tour'

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function waitFor(pred, { timeout = 20000, every = 250 } = {}) {
  const t0 = Date.now()
  while (Date.now() - t0 < timeout) {
    try { if (pred()) return true } catch { /* keep polling */ }
    await sleep(every)
  }
  return false
}

const speechIdle = () => !window.__atfSpeechBusy

function clickWhere(selector, textIncludes) {
  const els = [...document.querySelectorAll(selector)]
  const el = textIncludes
    ? els.find(e => e.textContent.toLowerCase().includes(textIncludes.toLowerCase()))
    : els[0]
  if (el) { el.click(); return true }
  return false
}

export default function Tour() {
  const nav = useNavigate()
  const [active, setActive] = useState(false)
  const [caption, setCaption] = useState('')
  const [stepNo, setStepNo] = useState(0)
  const cancelRef = useRef(false)
  const navRef = useRef(nav)
  navRef.current = nav

  useEffect(() => {
    const onStart = () => run()
    window.addEventListener(START_TOUR_EVENT, onStart)
    return () => {
      window.removeEventListener(START_TOUR_EVENT, onStart)
      cancelRef.current = true
    }
  }, [])

  async function run() {
    cancelRef.current = false
    setActive(true)

    const steps = [
      async () => {
        setCaption(t('Welcome to After the Fog — a post-game conversation space for Silent Hill 2. The tour drives itself; take over anytime with ✕.'))
        navRef.current('/begin')
        await sleep(6500)
      },
      async () => {
        setCaption(t('Each character is written as a psychology, not a chatbot. James deflects by design — kindness makes him worse.'))
        navRef.current('/talk/james')
        await sleep(1200)
        await waitFor(speechIdle, { timeout: 30000 })
        await sleep(600)
      },
      async () => {
        setCaption(t('Watch the radio: static before an answer means the answer will dodge. The radio never lies, even when he does.'))
        if (!clickWhere('.suggested button', M('videotape', '录像带'))) return
        await sleep(1500)
        await waitFor(speechIdle, { timeout: 40000 })
        await sleep(500)
      },
      async () => {
        setCaption(t('Pressing the point unlocks the follow-up. Truth in this exhibition has to be paid for in questions.'))
        if (!clickWhere('.suggested button', M('end of the tape', '带子的结尾'))) return
        await sleep(1500)
        await waitFor(speechIdle, { timeout: 50000 })
        await sleep(700)
      },
      async () => {
        setCaption(t('Places are witnesses. Touch an object, and the people concerned step out of the fog to answer for it.'))
        navRef.current('/place/room312')
        await sleep(2200)
        clickWhere('.hotspot')
        await sleep(1000)
        clickWhere('.stage-witnesses .portrait')
        await sleep(1500)
        await waitFor(speechIdle, { timeout: 45000 })
        await sleep(500)
      },
      async () => {
        setCaption(t('The roundtable assembles its script around who is seated — different company, different evening. Let them argue a moment.'))
        navRef.current('/roundtable')
        await sleep(1500)
        clickWhere('.door', M('Silent Hill', '寂静岭'))
        // let a few voices land, then hurry the rest
        await waitFor(() => document.querySelectorAll('.msg').length >= 4, { timeout: 90000 })
        await sleep(2500)
        setCaption(t('You can hurry them — a click finishes the line. Impatience is a supported input.'))
        clickWhere('.rt-below .chat-main')
        await sleep(1400)
      },
      async () => {
        setCaption(t('Everything on the table can be picked up. This key is a mistake. Make it anyway.'))
        clickWhere('.rt-item', M('Dog Key', '狗钥匙'))
        await sleep(1500)
        await waitFor(speechIdle, { timeout: 60000 })
        await sleep(700)
      },
      async () => {
        setCaption(t('The fog has been grading you all along: your questions become a verdict, and the card is yours to keep. Thank you for walking through.'))
        navRef.current('/reflection')
        await sleep(9000)
      }
    ]

    for (let i = 0; i < steps.length; i++) {
      if (cancelRef.current) break
      setStepNo(i + 1)
      try { await steps[i]() } catch { /* skip broken step */ }
    }

    if (!cancelRef.current) {
      setCaption(t('End of the tour. The fog is yours now.'))
      await sleep(3500)
    }
    setActive(false)
    cancelRef.current = true
  }

  function exit() {
    cancelRef.current = true
    setActive(false)
  }

  if (!active) return null
  return (
    <div className="tour-bar fadein">
      <span className="tour-step">{t('TOUR')} {stepNo}/8</span>
      <p className="tour-caption">{caption}</p>
      <button className="tour-exit" onClick={exit} title={t('Take over')}>✕</button>
    </div>
  )
}

export function startTour() {
  window.dispatchEvent(new Event(START_TOUR_EVENT))
}
