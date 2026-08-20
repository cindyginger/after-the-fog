import { useRef, useState } from 'react'
import { TOPICS } from '../data/topics.js'
import { CHARACTERS } from '../data/characters.js'
import { ROUNDTABLE_SCRIPTS, TABLE_ITEMS } from '../data/script.js'
import { useSpeech } from '../lib/useSpeech.js'
import { t } from '../lib/i18n.js'
import { useSession } from '../state/session.jsx'
import Portrait from '../components/Portrait.jsx'
import SpeechBubble from '../components/SpeechBubble.jsx'
import Thread from '../components/Thread.jsx'
import ThemeRail from '../components/ThemeRail.jsx'

// Item positions on the tabletop (percent of the stage)
const ITEM_POS = {
  radio:          { left: '30%', top: '64%' },
  'health-drink': { left: '43%', top: '73%' },
  'canned-juice': { left: '57%', top: '73%' },
  'dog-key':      { left: '69%', top: '64%' },
  'music-box':    { left: '50%', top: '60%' }
}

const ITEM_ICONS = {
  radio: (
    <svg viewBox="0 0 40 40"><rect x="6" y="16" width="28" height="16" rx="3" fill="#2a2e26" stroke="#555c4e" /><circle cx="14" cy="24" r="4" fill="#181b15" stroke="#555c4e" /><rect x="22" y="20" width="9" height="2.5" fill="#555c4e" /><rect x="22" y="25" width="9" height="2.5" fill="#555c4e" /><line x1="30" y1="16" x2="36" y2="6" stroke="#555c4e" strokeWidth="1.6" /></svg>
  ),
  'health-drink': (
    <svg viewBox="0 0 40 40"><path d="M16,10 L24,10 L24,14 L26,18 L26,32 A3,3 0 0 1 23,35 L17,35 A3,3 0 0 1 14,32 L14,18 L16,14 Z" fill="#3d5a45" stroke="#6d8577" /><rect x="16" y="8" width="8" height="4" rx="1" fill="#20241d" /><rect x="16" y="21" width="8" height="8" rx="1" fill="#c9c2b2" opacity="0.75" /></svg>
  ),
  'canned-juice': (
    <svg viewBox="0 0 40 40"><rect x="13" y="10" width="14" height="22" rx="3" fill="#5a4a35" stroke="#8a7658" /><ellipse cx="20" cy="10.5" rx="7" ry="2.4" fill="#8a7658" /><rect x="15" y="17" width="10" height="9" rx="1" fill="#c9c2b2" opacity="0.6" /></svg>
  ),
  'dog-key': (
    <svg viewBox="0 0 40 40"><circle cx="14" cy="15" r="7" fill="none" stroke="#b3924c" strokeWidth="2.6" /><circle cx="10.5" cy="12" r="2" fill="#b3924c" /><circle cx="17.5" cy="12" r="2" fill="#b3924c" /><path d="M14,22 L14,33 M14,27 L19,27 M14,31 L18,31" stroke="#b3924c" strokeWidth="2.6" /></svg>
  ),
  'music-box': (
    <svg viewBox="0 0 40 40"><rect x="8" y="18" width="24" height="14" rx="2" fill="#3a2f26" stroke="#6e5a44" /><path d="M8,18 L20,10 L32,18" fill="#2c231c" stroke="#6e5a44" /><path d="M25,14 L25,6 Q29,5 29,8 A2.2,2.2 0 1 1 25,9" fill="none" stroke="#c9c2b2" strokeWidth="1.5" opacity="0.85" /></svg>
  )
}

// Seat layouts around the table, by party size.
const SEAT_LAYOUTS = {
  2: [{ left: '26%', top: '34%', size: 118 }, { left: '74%', top: '34%', size: 118 }],
  3: [{ left: '13%', top: '34%', size: 108 }, { left: '50%', top: '27%', size: 100 }, { left: '87%', top: '34%', size: 108 }],
  4: [{ left: '9%', top: '38%', size: 94 }, { left: '36%', top: '28%', size: 94 }, { left: '64%', top: '28%', size: 94 }, { left: '91%', top: '38%', size: 94 }]
}

const MIN_SEATS = 2
const MAX_SEATS = 4

// A line plays only if its speaker is seated, everyone it names is seated,
// and no one it's an "absence variant" for is seated.
function lineAvailable(line, sel) {
  return sel.includes(line.speaker) &&
    (line.needs || []).every(n => sel.includes(n)) &&
    !(line.notWith || []).some(n => sel.includes(n))
}

export default function RoundtablePage() {
  const { dispatch } = useSession()
  const speech = useSpeech({ gapDelay: 900 })
  const [selected, setSelected] = useState(['james', 'maria', 'mary'])
  const [topic, setTopic] = useState(null)
  const [messages, setMessages] = useState([])
  const [phase, setPhase] = useState('idle')      // idle | debate | open
  const [usedInterjections, setUsedInterjections] = useState([])
  const [usedItems, setUsedItems] = useState([])
  const keyRef = useRef(0)

  // The line being typed lives in a bubble over the speaker's head;
  // it lands in the archive below once fully spoken.
  const displayed = messages
    .filter(m => m.key === undefined || m.key !== speech.currentKey)
    .map(m => ({
      ...m,
      text: m.full !== undefined ? (speech.rendered[m.key] ?? '') : m.text,
      curator: m.curator && (speech.rendered[m.key] === t(m.full)) ? m.curator : null
    }))
  const fragments = displayed.filter(m => m.curator).map(m => m.curator)
  const bubbleText = speech.currentKey ? speech.rendered[speech.currentKey] : ''

  function toggleSeat(id) {
    setSelected(sel => {
      if (sel.includes(id)) {
        return sel.length > MIN_SEATS ? sel.filter(s => s !== id) : sel
      }
      return sel.length < MAX_SEATS ? [...sel, id] : sel
    })
  }

  function playLines(lines, { curatorOnLast, onAllDone } = {}) {
    if (lines.length === 0) { onAllDone?.(); return }
    lines.forEach((line, i) => {
      const character = CHARACTERS.find(c => c.id === line.speaker)
      const key = `rt-${keyRef.current++}`
      const isLast = i === lines.length - 1
      speech.speak({
        key,
        speaker: line.speaker,
        text: line.text,
        static: line.evaded,
        onStart: () => {
          setMessages(m => [...m, {
            kind: 'character', speaker: character.name, key, full: line.text,
            theme: character.theme.accent,
            curator: isLast ? curatorOnLast : null
          }])
          dispatch({ type: 'TAGS', characterId: line.speaker, tags: line.tags || [], evaded: line.evaded || false })
          dispatch({ type: 'LOG', speaker: character.name, text: line.text })
        },
        onDone: () => { if (isLast) onAllDone?.() }
      })
    })
  }

  function start(tp) {
    const turns = ROUNDTABLE_SCRIPTS[tp.id].turns.filter(l => lineAvailable(l, selected))
    setTopic(tp)
    dispatch({ type: 'ROUNDTABLE', id: tp.id })
    setMessages([{ kind: 'system', text: tp.seed }])
    setPhase('debate')
    setUsedInterjections([])
    playLines(turns, { onAllDone: () => setPhase('open') })
  }

  function interject(idx) {
    if (speech.busy) return
    const inj = ROUNDTABLE_SCRIPTS[topic.id].interjections[idx]
    setUsedInterjections(u => [...u, idx])
    setMessages(m => [...m, { kind: 'visitor', speaker: 'You', text: inj.label }])
    dispatch({ type: 'LOG', speaker: 'visitor', text: inj.label })
    playLines(inj.replies.filter(l => lineAvailable(l, selected)))
  }

  function touchItem(item) {
    if (speech.busy || usedItems.includes(item.id)) return
    setUsedItems(u => [...u, item.id])
    dispatch({ type: 'EXAMINE', id: `roundtable/${item.id}` })
    setMessages(m => [...m, { kind: 'system', text: `*The visitor picks up the ${item.name.toLowerCase()} from the table.*` }])
    if (item.id === 'dog-key') {
      dispatch({ type: 'PICKUP', id: 'dog-key' })
      setMessages(m => [...m, { kind: 'system', text: '*(While they argue about it, you quietly pocket the key. For research.)*' }])
    }
    const lines = item.exchange.filter(l => lineAvailable(l, selected))
    if (lines.length === 0) {
      setMessages(m => [...m, { kind: 'system', text: '*No one at this table has anything to say about it. It goes back where it was.*' }])
      return
    }
    playLines(lines, { curatorOnLast: item.curator })
  }

  // ---------------------------------------------------------------- lobby
  if (!topic) {
    return (
      <div className="page">
        <h1>{t('ROUNDTABLE')}</h1>
        <p className="lede">
          {t('First, decide who takes a seat — two to four of them. Then place a question on the table. Who is in the room changes what gets said.')}
        </p>

        <div className="rt-picker">
          <h3>{t('AT THE TABLE —')} {selected.length}/{MAX_SEATS}</h3>
          <div className="rt-picker-row">
            {CHARACTERS.map(c => {
              const on = selected.includes(c.id)
              return (
                <div key={c.id} className={`rt-pick ${on ? 'on' : ''}`} style={{ '--char-accent': c.theme.accent }}>
                  <Portrait id={c.id} size={84} active={on} onClick={() => toggleSeat(c.id)} title={t(c.name)} />
                  <span>{t(c.name).split(' ')[0].split('-')[0]}</span>
                </div>
              )
            })}
          </div>
          <p className="hint">
            {t('Some things only get said in certain company. James and Mary alone is a different evening than James, Maria and Eddie.')}
          </p>
        </div>

        <div className="doors">
          {TOPICS.map((tp, i) => (
            <button className="door" key={tp.id} onClick={() => start(tp)} style={{ textAlign: 'left' }}>
              <span className="num">{['I', 'II', 'III'][i]}</span>
              <span className="kicker">{t('Topic')}</span>
              <h2>{t(tp.title)}</h2>
              <p>{t(tp.subtitle)}</p>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------- table
  const seats = SEAT_LAYOUTS[selected.length] || SEAT_LAYOUTS[3]
  const interjections = ROUNDTABLE_SCRIPTS[topic.id].interjections
  const remainingInj = interjections
    .map((inj, i) => ({ inj, i }))
    .filter(({ inj, i }) =>
      !usedInterjections.includes(i) &&
      (inj.needs || []).every(n => selected.includes(n)) &&
      inj.replies.some(l => lineAvailable(l, selected))
    )

  return (
    <div className="rt-layout">
      <div className="rt-stage">
        <svg viewBox="0 0 900 340" preserveAspectRatio="xMidYMax meet" className="rt-table">
          <defs>
            <radialGradient id="rt-wood" cx="50%" cy="42%" r="70%">
              <stop offset="0%" stopColor="#4b3a28" /><stop offset="55%" stopColor="#392c1e" /><stop offset="100%" stopColor="#241b12" />
            </radialGradient>
            <radialGradient id="rt-lamp" cx="50%" cy="30%" r="55%">
              <stop offset="0%" stopColor="#d8cfa8" stopOpacity="0.34" /><stop offset="100%" stopColor="#d8cfa8" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="450" cy="150" rx="380" ry="150" fill="url(#rt-lamp)" />
          <ellipse cx="450" cy="185" rx="370" ry="118" fill="url(#rt-wood)" />
          <ellipse cx="450" cy="185" rx="370" ry="118" fill="none" stroke="#5b452e" strokeWidth="3" opacity="0.7" />
          <ellipse cx="450" cy="185" rx="330" ry="100" fill="none" stroke="#2c2115" strokeWidth="1.5" opacity="0.8" />
          <path d="M150,190 q150,-28 300,-24 q160,4 300,26" fill="none" stroke="#2e2317" strokeWidth="1.4" opacity="0.6" />
          <path d="M190,215 q140,-20 260,-18 q150,2 270,20" fill="none" stroke="#2e2317" strokeWidth="1.2" opacity="0.5" />
          <path d="M450,303 L420,340 L480,340 Z" fill="#1a130c" />
          <rect x="444" y="120" width="12" height="26" rx="2" fill="#b8ae94" />
          <ellipse cx="450" cy="147" rx="16" ry="5" fill="#8a8068" />
          <ellipse cx="450" cy="112" rx="4" ry="8" fill="#e0c78a" className="candle-flame" />
          <ellipse cx="450" cy="112" rx="14" ry="20" fill="#e0c78a" opacity="0.12" className="candle-flame" />
        </svg>

        {selected.map((id, i) => {
          const c = CHARACTERS.find(x => x.id === id)
          const seat = seats[i]
          return (
            <div key={id} className="rt-seat" style={{ left: seat.left, top: seat.top, '--char-accent': c.theme.accent }}>
              <div className="bubble-anchor">
                <SpeechBubble text={bubbleText} visible={speech.currentSpeaker === id} />
                <Portrait id={id} size={seat.size} speaking={speech.speakingId === id} active={speech.speakingId === id} title={t(c.name)} />
              </div>
              <span className={`rt-name ${speech.speakingId === id ? 'lit' : ''}`}>{t(c.name).split(' ')[0].split('-')[0]}</span>
            </div>
          )
        })}

        {TABLE_ITEMS.map(item => (
          <button
            key={item.id}
            className={`rt-item ${usedItems.includes(item.id) ? 'used' : ''}`}
            style={ITEM_POS[item.id]}
            onClick={() => touchItem(item)}
            disabled={speech.busy || usedItems.includes(item.id)}
            title={t(item.blurb)}
          >
            {ITEM_ICONS[item.id]}
            <span className="rt-item-label">{t(item.name)}</span>
          </button>
        ))}
      </div>

      <div className="chat-layout rt-below">
        <main className="chat-main" onClick={() => speech.busy && speech.skip()}>
          <header className="chat-header">
            <h1>{t(topic.title)}</h1>
            <p className="sub">
              {t(phase === 'debate' ? 'They are talking. Click the text to hurry them, if you dare.' : 'The table is open. Interrupt, or pick something up.')}
            </p>
          </header>
          <Thread messages={displayed} />
          {phase === 'open' && (
            <div className="suggested">
              {remainingInj.map(({ inj, i }) => (
                <button key={i} disabled={speech.busy} onClick={() => interject(i)}>{t(inj.label)}</button>
              ))}
              <button className="btn-quiet" disabled={speech.busy}
                onClick={() => { setTopic(null); setMessages([]); setPhase('idle'); setUsedItems([]) }}>
                {t('Change the table')}
              </button>
            </div>
          )}
        </main>
        <ThemeRail fragments={fragments} />
      </div>
    </div>
  )
}
