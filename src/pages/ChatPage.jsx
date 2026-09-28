import { useEffect, useMemo, useState, useRef } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { byId } from '../data/characters.js'
import { CHAT_SCRIPTS, DOUBT_LINES, ITEM_REACTIONS, POCKET_ITEMS } from '../data/script.js'
import { POCKET_ICONS } from '../components/pocketIcons.jsx'
import { discover } from '../lib/sound.js'
import { useSpeech } from '../lib/useSpeech.js'
import { t, getLang } from '../lib/i18n.js'
import { useSession } from '../state/session.jsx'
import { isReturnVisit } from '../lib/persist.js'
import Portrait from '../components/Portrait.jsx'
import SpeechBubble from '../components/SpeechBubble.jsx'
import ThemeRail from '../components/ThemeRail.jsx'
import Thread from '../components/Thread.jsx'

export default function ChatPage() {
  const { id } = useParams()
  const character = byId(id)
  const script = CHAT_SCRIPTS[id]
  const { session, dispatch } = useSession()
  const speech = useSpeech()
  const [messages, setMessages] = useState([])
  const [asked, setAsked] = useState([])
  const [unlocked, setUnlocked] = useState([])
  const [lastDoubt, setLastDoubt] = useState(null)   // {speaker, evaded, tags}
  const [shownItems, setShownItems] = useState([])   // item ids already shown to this character
  const keyRef = useRef(0)
  const pokeRef = useRef(0)
  const doubtRef = useRef(0)

  // Opening line plays on mount and when the route changes; the ref resets on
  // unmount so a StrictMode remount replays it instead of deadlocking.
  const openedRef = useRef(null)
  useEffect(() => {
    if (!character || openedRef.current === id) return
    openedRef.current = id
    setAsked([]); setUnlocked([]); setLastDoubt(null); setShownItems([])
    const key = `open-${id}`
    const opening = (isReturnVisit() && character.openingReturn) || character.opening
    setMessages([{ kind: 'character', speaker: character.name, key, full: opening }])
    speech.speak({ key, speaker: id, text: opening })
    return () => { openedRef.current = null }
  }, [id])

  const followupIds = useMemo(() => {
    if (!script) return new Set()
    return new Set(script.questions.flatMap(q => q.followups || []))
  }, [script])

  if (!character || !script) return <Navigate to="/talk" replace />

  const available = script.questions.filter(q =>
    !asked.includes(q.id) && (!followupIds.has(q.id) || unlocked.includes(q.id))
  )

  // The line being typed lives in the bubble above the portrait;
  // it lands in the archive below once fully spoken.
  const displayed = messages
    .filter(m => m.key === undefined || m.key !== speech.currentKey)
    .map(m => ({
      ...m,
      text: m.full !== undefined ? (speech.rendered[m.key] ?? '') : m.text,
      curator: m.curator && (speech.rendered[m.key] === t(m.full)) ? m.curator : null
    }))
  const bubbleText = speech.currentKey ? speech.rendered[speech.currentKey] : ''

  const fragments = displayed.filter(m => m.curator).map(m => m.curator)

  function ask(q) {
    if (speech.busy) speech.skip()   // impatience is allowed here
    setAsked(a => [...a, q.id])
    const key = `q-${keyRef.current++}`
    setMessages(m => [
      ...m,
      { kind: 'visitor', speaker: 'You', text: q.q },
      { kind: 'character', speaker: character.name, key, full: q.a, curator: q.curator }
    ])
    dispatch({ type: 'LOG', speaker: 'visitor', text: q.q })
    speech.speak({
      key, speaker: id, text: q.a, static: q.evaded,
      onStart: () => {
        dispatch({ type: 'TAGS', characterId: id, tags: q.tags, evaded: q.evaded })
        dispatch({ type: 'LOG', speaker: character.name, text: q.a })
      },
      onDone: () => {
        if (q.followups) setUnlocked(u => [...u, ...q.followups])
        setLastDoubt({ speaker: id, evaded: q.evaded, tags: q.tags })
      }
    })
  }

  function poke() {
    if (speech.busy) speech.skip()
    setLastDoubt(null)
    const line = script.pokes[pokeRef.current++ % script.pokes.length]
    const key = `poke-${keyRef.current++}`
    setMessages(m => [...m, { kind: 'character', speaker: character.name, key, full: line }])
    speech.speak({ key, speaker: id, text: line })
  }

  // "I don't believe you." — challenge the last answer.
  function doubt() {
    if (!lastDoubt || speech.busy) return
    const { evaded, tags } = lastDoubt
    setLastDoubt(null)
    const pool = DOUBT_LINES[id]?.[evaded ? 'caught' : 'rebuff']
    if (!pool) return
    const line = pool[doubtRef.current++ % pool.length]
    if (evaded) discover()
    const key = `dbt-${keyRef.current++}`
    setMessages(m => [...m,
      { kind: 'visitor', speaker: 'You', text: 'I don’t believe you.' },
      { kind: 'character', speaker: character.name, key, full: line.text }
    ])
    dispatch({ type: 'LOG', speaker: 'visitor', text: 'I don’t believe you.' })
    speech.speak({
      key, speaker: id, text: line.text,
      onStart: () => {
        dispatch({ type: 'TAGS', characterId: id, tags: evaded ? [...tags, ...line.tags] : line.tags, evaded: false })
        dispatch({ type: 'LOG', speaker: character.name, text: line.text })
      }
    })
  }

  // Take something out of your pocket and show it to them.
  function show(itemId) {
    const reaction = ITEM_REACTIONS[itemId]?.[id]
    if (!reaction || shownItems.includes(itemId)) return
    if (speech.busy) speech.skip()
    setLastDoubt(null)
    setShownItems(s => [...s, itemId])
    const itemName = POCKET_ITEMS[itemId].name
    const key = `show-${keyRef.current++}`
    setMessages(m => [...m,
      { kind: 'system', text: getLang() === 'zh'
        ? `*你掏出${t(itemName)}，举了起来。*`
        : `*You take out ${itemName.toLowerCase()} and hold it up.*` },
      { kind: 'character', speaker: character.name, key, full: reaction.text }
    ])
    dispatch({ type: 'LOG', speaker: 'visitor', text: `(shows ${itemName})` })
    speech.speak({
      key, speaker: id, text: reaction.text, static: reaction.evaded,
      onStart: () => {
        dispatch({ type: 'TAGS', characterId: id, tags: reaction.tags, evaded: reaction.evaded })
        dispatch({ type: 'LOG', speaker: character.name, text: reaction.text })
      },
      onDone: () => setLastDoubt({ speaker: id, evaded: reaction.evaded, tags: reaction.tags })
    })
  }

  return (
    <div
      className="chat-layout char-themed"
      style={{ '--char-accent': character.theme.accent, '--char-soft': character.theme.soft, '--char-dim': character.theme.dim }}
    >
      <main className="chat-main">
        <header className="chat-header with-portrait">
          <div className="bubble-anchor">
            <SpeechBubble text={bubbleText} visible={speech.currentSpeaker === id} />
            <Portrait
              id={id} size={132}
              speaking={speech.speakingId === id}
              onClick={poke}
              title={`${character.name} — they notice when you stare`}
            />
          </div>
          <div>
            <h1>{t(character.name)}</h1>
            <p className="sub">{t(character.short)}</p>
            <p className="hint">{t('Touch the portrait, if you must. They notice.')}</p>
          </div>
        </header>
        {session.inventory?.length > 0 && (
          <div className="pockets">
            <span className="pockets-label">{t('FROM YOUR POCKETS')}</span>
            {session.inventory.map(itemId => POCKET_ITEMS[itemId] && (
              <button
                key={itemId}
                className={`pocket-item ${shownItems.includes(itemId) ? 'shown' : ''}`}
                onClick={() => show(itemId)}
                disabled={shownItems.includes(itemId)}
                title={shownItems.includes(itemId)
                  ? `${character.name.split(' ')[0]} has seen ${POCKET_ITEMS[itemId].name.toLowerCase()}`
                  : `Show ${POCKET_ITEMS[itemId].name.toLowerCase()} to ${character.name.split(' ')[0]}`}
              >
                {POCKET_ICONS[itemId]}
                <span>{t(POCKET_ITEMS[itemId].name).replace('The ', '')}</span>
              </button>
            ))}
          </div>
        )}
        <div onClick={() => speech.busy && speech.skip()}>
          <Thread messages={displayed} />
        </div>
        {lastDoubt && !speech.busy && (
          <button className="doubt-btn fadein" onClick={doubt}>{t('✕ I don’t believe you')}</button>
        )}
        <div className="suggested">
          {available.map(q => (
            <button key={q.id} onClick={() => ask(q)}>
              {followupIds.has(q.id) ? '↳ ' : ''}{t(q.q)}
            </button>
          ))}
          {available.length === 0 && (
            <span className="archive-note">
              {t('The archive holds no more questions for')} {character.name.split(' ')[0]}. {t('What was said, was said.')}
            </span>
          )}
        </div>
      </main>
      <ThemeRail fragments={fragments} />
    </div>
  )
}
