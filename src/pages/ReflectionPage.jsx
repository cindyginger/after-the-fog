import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../state/session.jsx'
import { REFLECTION_LINES } from '../data/script.js'
import { computeEnding } from '../lib/ending.js'
import { recordEnding, collectedEndings } from '../lib/persist.js'
import { exportCard } from '../lib/shareCard.js'
import { CHARACTERS } from '../data/characters.js'
import { SCENES } from '../data/scenes.js'
import { t, getLang } from '../lib/i18n.js'

const ALBUM = [
  { id: 'leave', title: 'LEAVE' },
  { id: 'water', title: 'IN WATER' },
  { id: 'maria', title: 'MARIA' },
  { id: 'dog', title: 'DOG' }
]

export default function ReflectionPage() {
  const { session, dispatch } = useSession()
  const [collected, setCollected] = useState(collectedEndings())

  const themeEntries = Object.entries(session.themeCounts).sort((a, b) => b[1] - a[1])
  const topThemes = themeEntries.slice(0, 3).map(([theme]) => theme)
  const totalTouches = themeEntries.reduce((s, [, n]) => s + n, 0)

  const evasive = Object.entries(session.evasions).sort((a, b) => b[1] - a[1])[0]
  const evasiveName = evasive ? CHARACTERS.find(c => c.id === evasive[0])?.name : null

  const placeNames = session.scenesVisited
    .map(id => SCENES.find(s => s.id === id)?.name)
    .filter(Boolean)

  const hasContent = totalTouches > 0 || placeNames.length > 0
  const line = REFLECTION_LINES[topThemes[0]] || REFLECTION_LINES.default
  const ending = computeEnding(session)

  // a reached ending goes into the permanent album
  useEffect(() => {
    if (ending.id !== 'fog') setCollected(recordEnding(ending.id))
  }, [ending.id])

  function keepCard() {
    exportCard({
      ending,
      topThemes,
      evasiveName,
      evasiveCount: evasive ? evasive[1] : 0,
      placeNames,
      objectCount: session.objectsExamined.length,
      line
    })
  }

  if (!hasContent) {
    return (
      <div className="page">
        <h1>{t('REFLECTION')}</h1>
        <p className="empty-note">
          {t('The card is still blank. Speak to someone, or touch something, and the archive will keep a record of what you circled.')}
        </p>
        <Album collected={collected} />
      </div>
    )
  }

  const evasiveLine = evasiveName
    ? (getLang() === 'zh'
        ? `${t(evasiveName)}（回避了 ${evasive[1]} 个问题）`
        : `${evasiveName} (${evasive[1]} question${evasive[1] > 1 ? 's' : ''} deflected)`)
    : t('No one evaded you. Or no one was pressed.')

  return (
    <div className="page">
      <h1>{t('REFLECTION')}</h1>
      <p className="lede">{t('What the archive kept of your visit.')}</p>

      <div className="reflection-card">
        <div className="rc-head">{t('Reflection Card')}</div>
        <div className="rc-sub">{t('AFTER THE FOG · VISITOR RECORD')}</div>
        <div className={`rc-ending rc-ending-${ending.id}`}>
          <span className="rc-ending-kicker">{t('The fog has reached a verdict')}</span>
          <span className="rc-ending-title">{t(ending.title)}</span>
          <p className="rc-ending-line">{t(ending.line)}</p>
          <p className="rc-ending-how">{t(ending.how)}</p>
        </div>
        <dl>
          <dt>{t('Themes circled')}</dt>
          <dd>{topThemes.length ? topThemes.map(th => t(th)).join(' · ') : '—'}</dd>
          <dt>{t('Most evasive')}</dt>
          <dd>{evasiveLine}</dd>
          <dt>{t('Places entered')}</dt>
          <dd>{placeNames.length ? placeNames.map(p => t(p)).join(' · ') : '—'}</dd>
          <dt>{t('Objects touched')}</dt>
          <dd>{session.objectsExamined.length || '—'}</dd>
        </dl>
        <div className="rc-line">{t(line)}</div>
        <div className="rc-stamp">{t('— IN MY RESTLESS DREAMS —')}</div>
      </div>

      <div className="rc-actions">
        <button className="btn-quiet" onClick={keepCard}>{t('Keep the card (PNG)')}</button>
        <button className="btn-quiet" onClick={() => dispatch({ type: 'RESET' })}>{t('Burn the card')}</button>
        <Link to="/begin"><button className="btn-quiet">{t('Return to the fog')}</button></Link>
      </div>

      <Album collected={collected} />
    </div>
  )
}

function Album({ collected }) {
  return (
    <div className="rc-album">
      <h3>{t('ENDINGS COLLECTED —')} {collected.length}/{ALBUM.length}</h3>
      <div className="rc-album-row">
        {ALBUM.map(e => {
          const got = collected.includes(e.id)
          return (
            <div key={e.id} className={`rc-slot ${got ? 'got' : ''}`}>
              <span className="rc-slot-title">{got ? t(e.title) : '?????'}</span>
              <span className="rc-slot-sub">{got ? t('reached') : t('unreached')}</span>
            </div>
          )
        })}
      </div>
      <p className="hint">
        {t('The album survives the burning of cards. Different questions, different company, different verdicts — the fog regrades every visit.')}
      </p>
    </div>
  )
}
