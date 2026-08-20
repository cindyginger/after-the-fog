import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { SCENES, sceneById } from '../data/scenes.js'
import { CHARACTERS } from '../data/characters.js'
import { SCENE_SCRIPTS, SCENE_SECRETS, DOUBT_LINES } from '../data/script.js'
import { useSpeech } from '../lib/useSpeech.js'
import { t } from '../lib/i18n.js'
import { useSession } from '../state/session.jsx'
import { startAmbience, stopAmbience, discover } from '../lib/sound.js'
import Portrait from '../components/Portrait.jsx'
import SceneArt from '../components/SceneArt.jsx'
import SpeechBubble from '../components/SpeechBubble.jsx'
import Thread from '../components/Thread.jsx'

const HOTSPOTS = {
  toluca:   { letter: { left: '71%', top: '74%' }, radio: { left: '30%', top: '57%' }, water: { left: '52%', top: '44%' } },
  hospital: { bed: { left: '50%', top: '58%' }, mirror: { left: '78%', top: '50%' }, flashlight: { left: '29%', top: '84%' } },
  room312:  { videotape: { left: '46%', top: '62%' }, television: { left: '58%', top: '52%' }, window: { left: '84%', top: '38%' } }
}

export default function ScenePage() {
  const { id } = useParams()
  const nav = useNavigate()
  const scene = sceneById(id)
  const { dispatch } = useSession()
  const speech = useSpeech()
  const [active, setActive] = useState(null)
  const [messages, setMessages] = useState([])
  const [spoken, setSpoken] = useState([])      // `${objectId}/${charId}` already heard
  const [torch, setTorch] = useState(false)
  const [lastDoubt, setLastDoubt] = useState(null)   // {speaker, evaded, tags}
  const keyRef = useRef(0)
  const doubtRef = useRef({})
  const stageRef = useRef(null)

  useEffect(() => {
    if (scene) {
      dispatch({ type: 'VISIT_SCENE', id: scene.id })
      setMessages([{ kind: 'system', text: scene.intro }])
      setActive(null)
      setSpoken([])
      setTorch(false)
      startAmbience(scene.id)
    }
    return () => stopAmbience()
  }, [scene?.id])

  if (!scene) return <Navigate to="/place" replace />

  const secret = SCENE_SECRETS[scene.id]
  const sceneIndex = SCENES.findIndex(s => s.id === scene.id)
  const prevScene = SCENES[(sceneIndex + SCENES.length - 1) % SCENES.length]
  const nextScene = SCENES[(sceneIndex + 1) % SCENES.length]

  // The line being typed lives in the bubble; it lands in the archive when done.
  const displayed = messages
    .filter(m => m.key === undefined || m.key !== speech.currentKey)
    .map(m => ({
      ...m,
      text: m.full !== undefined ? (speech.rendered[m.key] ?? '') : m.text,
      curator: m.curator && (speech.rendered[m.key] === t(m.full)) ? m.curator : null
    }))

  const bubbleText = speech.currentKey ? speech.rendered[speech.currentKey] : ''
  const witnesses = active
    ? active.isSecret
      ? CHARACTERS.filter(c => c.id === active.speaker)
      : CHARACTERS.filter(c => SCENE_SCRIPTS[`${scene.id}/${active.id}`]?.[c.id])
    : []

  function moveTorch(e) {
    if (!torch || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    stageRef.current.style.setProperty('--tx', `${e.clientX - rect.left}px`)
    stageRef.current.style.setProperty('--ty', `${e.clientY - rect.top}px`)
  }

  function examine(obj) {
    if (speech.busy) speech.skip()
    setActive(obj)
    dispatch({ type: 'EXAMINE', id: `${scene.id}/${obj.id}` })
    setMessages(m => [...m, { kind: 'system', text: `*The visitor reaches out and touches ${obj.name.toLowerCase()}.*` }])
  }

  function findSecret() {
    if (spoken.some(s => s.startsWith(`${secret.id}/`))) return
    if (speech.busy) speech.skip()
    const character = CHARACTERS.find(c => c.id === secret.speaker)
    discover()
    setActive({ ...secret, isSecret: true })
    dispatch({ type: 'EXAMINE', id: `${scene.id}/${secret.id}` })
    setSpoken(s => [...s, `${secret.id}/${secret.speaker}`])
    dispatch({ type: 'PICKUP', id: secret.id })
    const key = `sec-${keyRef.current++}`
    setMessages(m => [...m,
      { kind: 'system', text: `*The light catches something the room was keeping: ${secret.name.toLowerCase()}.*` },
      {
        kind: 'character', speaker: character.name, key, full: secret.line.text,
        theme: character.theme.accent, curator: secret.curator
      },
      { kind: 'system', text: '*(You pocket it while the room isn’t looking. Someone else might want to see this.)*' }
    ])
    speech.speak({
      key, speaker: secret.speaker, text: secret.line.text,
      onStart: () => {
        dispatch({ type: 'TAGS', characterId: secret.speaker, tags: secret.line.tags, evaded: secret.line.evaded })
        dispatch({ type: 'LOG', speaker: character.name, text: secret.line.text })
      },
      onDone: () => setLastDoubt({ speaker: secret.speaker, evaded: secret.line.evaded, tags: secret.line.tags })
    })
  }

  function ask(charId) {
    if (!active || active.isSecret) return
    if (speech.busy) speech.skip()
    const line = SCENE_SCRIPTS[`${scene.id}/${active.id}`]?.[charId]
    if (!line) return
    const character = CHARACTERS.find(c => c.id === charId)
    const spokenKey = `${active.id}/${charId}`
    if (spoken.includes(spokenKey)) return
    const first = !spoken.some(s => s.startsWith(`${active.id}/`))
    setSpoken(s => [...s, spokenKey])
    const key = `s-${keyRef.current++}`
    const obj = active
    setMessages(m => [...m, {
      kind: 'character', speaker: character.name, key, full: line.text,
      theme: character.theme.accent,
      curator: first ? obj.curator : null
    }])
    speech.speak({
      key, speaker: charId, text: line.text, static: line.evaded,
      onStart: () => {
        dispatch({ type: 'TAGS', characterId: charId, tags: line.tags, evaded: line.evaded })
        dispatch({ type: 'LOG', speaker: character.name, text: line.text })
      },
      onDone: () => setLastDoubt({ speaker: charId, evaded: line.evaded, tags: line.tags })
    })
  }

  // "I don't believe you." — challenge the last thing said.
  function doubt() {
    if (!lastDoubt || speech.busy) return
    const { speaker, evaded, tags } = lastDoubt
    setLastDoubt(null)
    const pool = DOUBT_LINES[speaker]?.[evaded ? 'caught' : 'rebuff']
    if (!pool) return
    const n = doubtRef.current[speaker] = (doubtRef.current[speaker] || 0) + 1
    const line = pool[(n - 1) % pool.length]
    const character = CHARACTERS.find(c => c.id === speaker)
    if (evaded) discover()
    const key = `dbt-${keyRef.current++}`
    setMessages(m => [...m,
      { kind: 'visitor', speaker: 'You', text: 'I don’t believe you.' },
      { kind: 'character', speaker: character.name, key, full: line.text, theme: character.theme.accent }
    ])
    dispatch({ type: 'LOG', speaker: 'visitor', text: 'I don’t believe you.' })
    speech.speak({
      key, speaker, text: line.text,
      onStart: () => {
        dispatch({ type: 'TAGS', characterId: speaker, tags: evaded ? [...tags, ...line.tags] : line.tags, evaded: false })
        dispatch({ type: 'LOG', speaker: character.name, text: line.text })
      }
    })
  }

  const secretFound = secret && spoken.some(s => s.startsWith(`${secret.id}/`))

  return (
    <div className="scene-page fadein" key={scene.id}>
      <div
        ref={stageRef}
        className={`scene-stage stage-${scene.id} ${torch ? 'torch-on' : ''}`}
        onClick={() => speech.busy && speech.skip()}
        onMouseMove={moveTorch}
      >
        <SceneArt id={scene.id} />

        {scene.objects.map(obj => (
          <button
            key={obj.id}
            className={`hotspot ${active?.id === obj.id ? 'active' : ''}`}
            style={HOTSPOTS[scene.id][obj.id]}
            onClick={() => examine(obj)}
            aria-label={t(obj.name)}
          >
            <span className="ring" /><span className="dot" /><span className="hlabel">{t(obj.name)}</span>
          </button>
        ))}

        {/* the hidden thing — only exists while the light is up */}
        {torch && secret && !secretFound && (
          <button className="secret-spot" style={secret.pos} onClick={findSecret} aria-label="Something glints">
            <span className="secret-glint" />
          </button>
        )}

        {/* darkness, pushed back by the beam */}
        <div className="torch-overlay" />

        {/* witnesses step out of the fog once something is touched */}
        {witnesses.length > 0 && (
          <div className="stage-witnesses">
            {witnesses.map(c => {
              const heard = spoken.includes(`${active.id}/${c.id}`)
              return (
                <div key={c.id} className={`witness fadein ${heard && !active.isSecret ? 'heard' : ''}`} style={{ '--char-accent': c.theme.accent }}>
                  <div className="bubble-anchor">
                    <SpeechBubble text={bubbleText} visible={speech.currentSpeaker === c.id} />
                    <Portrait
                      id={c.id} size={82}
                      speaking={speech.speakingId === c.id}
                      onClick={() => ask(c.id)}
                      title={t(c.name)}
                    />
                  </div>
                  <span>{t(c.name).split(' ')[0].split('-')[0]}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* flashlight toggle */}
        <button
          className={`torch-toggle ${torch ? 'on' : ''}`}
          onClick={(e) => { e.stopPropagation(); setTorch(t => !t) }}
          title={t(torch ? 'Lower the flashlight' : 'Raise the flashlight — some things only the light finds')}
        >
          {t(torch ? '🔦 LIGHT DOWN' : '🔦 FLASHLIGHT')}
        </button>

        {/* page through the places, like plates in an exhibition folio */}
        <button className="scene-pager prev" onClick={(e) => { e.stopPropagation(); nav(`/place/${prevScene.id}`) }} title={t(prevScene.name)}>‹</button>
        <button className="scene-pager next" onClick={(e) => { e.stopPropagation(); nav(`/place/${nextScene.id}`) }} title={t(nextScene.name)}>›</button>
        <span className="scene-pageno">{['I', 'II', 'III'][sceneIndex]} / III</span>

        <div className="scene-title">
          <h1>{t(scene.name).toUpperCase()}</h1>
          <p>{t(scene.tagline)}</p>
        </div>
      </div>

      <div className="scene-body">
        <div className="object-card">
          <span className="kicker">{t(active ? (active.isSecret ? 'Hidden — found by the light' : 'Object in focus') : 'Exhibit')}</span>
          <h2>{t(active ? active.name : scene.name)}</h2>
          <p className="blurb">{t(active ? active.blurb : 'Touch one of the marked objects above. Someone will step out of the fog to answer for it.')}</p>
          {!active && <p className="hint">{t('Rumor: each place keeps one thing off the record. Only the flashlight finds those.')}</p>}
          {active && !active.isSecret && <p className="hint">{t('Touch a face up there to hear them. The words land in this archive when spoken.')}</p>}
        </div>

        <main className="chat-main" onClick={() => speech.busy && speech.skip()}>
          {lastDoubt && !speech.busy && (
            <button className="doubt-btn fadein" onClick={(e) => { e.stopPropagation(); doubt() }}>
              {t('✕ I don’t believe you')}
            </button>
          )}
          <Thread messages={displayed} />
        </main>
      </div>
    </div>
  )
}
