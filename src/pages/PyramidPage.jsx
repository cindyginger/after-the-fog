import { useEffect, useRef, useState } from 'react'
import { judge } from '../data/script.js'
import { judgment as judgmentSound, startAmbience, stopAmbience } from '../lib/sound.js'
import { useSession } from '../state/session.jsx'
import { t } from '../lib/i18n.js'

// Pyramid Head is not a chat. You speak into the room; the room answers once,
// on a museum plaque beneath the figure. Original, abstract stylization —
// a monument, not a sprite.

function Figure({ judging }) {
  return (
    <svg viewBox="0 0 400 460" className={`phj-figure ${judging ? 'judging' : ''}`}>
      <defs>
        <linearGradient id="phj-helm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a2e26" />
          <stop offset="55%" stopColor="#331915" />
          <stop offset="100%" stopColor="#1c0e0b" />
        </linearGradient>
        <radialGradient id="phj-glow" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#8a3226" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#8a3226" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#8a3226" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="phj-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241512" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0c0705" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="460" fill="url(#phj-glow)" />

      {/* the great blade, point down, resting against the floor */}
      <path d="M318,180 L340,180 L333,420 L327,440 L322,420 Z" fill="#17130f" stroke="#33241d" strokeWidth="2" />
      <path d="M321,200 L337,200 M323,260 L335,260" stroke="#3f2c22" strokeWidth="1.4" opacity="0.7" />

      <g className="phj-body">
        {/* body — butcher's apron, stained dark */}
        <path d="M120,460 C122,360 138,290 166,252 L200,262 L234,252 C262,290 278,360 280,460 Z" fill="#282019" />
        <path d="M166,252 L200,262 L200,460 L150,460 C152,380 156,310 166,252 Z" fill="#302620" opacity="0.6" />
        <path d="M190,290 L192,460 M212,300 L210,460" stroke="#1a1310" strokeWidth="3" opacity="0.8" />
        <path d="M170,300 Q200,316 230,300 M164,352 Q200,368 236,352" stroke="#1a1310" strokeWidth="2" opacity="0.6" />
        {/* stitched hem + stains */}
        <path d="M150,430 L250,430" stroke="#171009" strokeWidth="2" strokeDasharray="6 5" opacity="0.7" />
        <ellipse cx="182" cy="330" rx="9" ry="16" fill="#1c100c" opacity="0.6" />
        <ellipse cx="226" cy="382" rx="7" ry="12" fill="#1c100c" opacity="0.5" />
        {/* arms hanging */}
        <path d="M136,290 C126,330 122,370 124,404 L142,404 C140,370 142,336 150,300 Z" fill="#231b15" />
        <path d="M264,290 C274,330 278,368 276,398 L258,398 C260,366 258,336 250,300 Z" fill="#231b15" />
        <ellipse cx="132" cy="410" rx="10" ry="8" fill="#8a7a64" opacity="0.85" />
        <ellipse cx="268" cy="404" rx="10" ry="8" fill="#8a7a64" opacity="0.85" />

        {/* the helm — a great rusted wedge, faceless */}
        <g className="phj-helm">
          <path d="M110,214 L200,64 L296,206 L262,258 L200,276 L138,258 Z" fill="url(#phj-helm-grad)" stroke="#5e352c" strokeWidth="2.5" />
          {/* red rim light on the leading edge */}
          <path d="M200,64 L296,206" stroke="#9a4434" strokeWidth="2.4" opacity="0.85" />
          <path d="M200,64 L200,276" stroke="#190c09" strokeWidth="2" opacity="0.7" />
          <path d="M138,258 L262,258" stroke="#5e352c" strokeWidth="1.6" opacity="0.8" />
          <path d="M156,196 L186,236 M214,236 L244,196" stroke="#200f0b" strokeWidth="2" opacity="0.7" />
          {[[150, 230], [178, 248], [222, 248], [250, 230]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#5e352c" />
          ))}
          <path d="M170,120 L164,200 M232,132 L240,206" stroke="#6a2f24" strokeWidth="3" opacity="0.5" />
        </g>
      </g>

      {/* floor pool + reflection */}
      <rect y="430" width="400" height="30" fill="url(#phj-floor)" />
      <ellipse cx="200" cy="446" rx="120" ry="10" fill="#8a3226" opacity="0.08" />
    </svg>
  )
}

export default function PyramidPage() {
  const { dispatch } = useSession()
  const [input, setInput] = useState('')
  const [record, setRecord] = useState([])   // {said, answer}
  const [judging, setJudging] = useState(false)
  const [answer, setAnswer] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => {
    startAmbience('judgment')
    return () => { stopAmbience(); clearTimeout(timerRef.current) }
  }, [])

  function speak(e) {
    e.preventDefault()
    const said = input.trim()
    if (!said || judging) return
    setInput('')
    setAnswer(null)
    setJudging(true)
    judgmentSound()
    dispatch({ type: 'LOG', speaker: 'visitor', text: said })
    const verdict = judge(said)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setAnswer(verdict)
      setJudging(false)
      setRecord(r => [...r, { said, answer: verdict }])
      dispatch({ type: 'TAGS', characterId: 'pyramid', tags: ['punishment'], evaded: false })
      dispatch({ type: 'LOG', speaker: 'The Room', text: verdict })
    }, 1900)
  }

  return (
    <div className={`phj-room ${judging ? 'phj-pulse' : ''}`}>
      <header className="phj-head">
        <span className="phj-kicker">{t('Special exhibit')} · VII</span>
        <h1>{t('THE JUDGMENT ROOM')}</h1>
        <p className="lede">
          {t('It does not converse. Say anything — a confession, a question, an excuse. The room answers once, on the plaque, and does not explain itself.')}
        </p>
      </header>

      <div className="phj-stage">
        <Figure judging={judging} />
      </div>

      <div className="phj-plaque">
        {judging ? (
          <p className="phj-waiting">{t('THE ROOM CONSIDERS')}<span className="phj-dots" /></p>
        ) : answer ? (
          <p className="phj-answer fadein">{t(answer)}</p>
        ) : (
          <p className="phj-idle">{t('— the plaque is blank. speak, and it will not stay blank —')}</p>
        )}
      </div>

      <form className="composer phj-composer" onSubmit={speak}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t('Speak into the room…')}
          disabled={judging}
          maxLength={200}
        />
        <button type="submit" disabled={judging || !input.trim()}>{t('Speak')}</button>
      </form>

      {record.length > 0 && (
        <div className="phj-record">
          <h3>{t('WHAT THE ROOM HAS SAID')}</h3>
          {record.slice().reverse().map((r, i) => (
            <div key={i} className="phj-entry">
              <span className="phj-said">“{r.said}”</span>
              <span className="phj-verdict">{t(r.answer)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
