import { Link } from 'react-router-dom'
import { startTour } from '../components/Tour.jsx'
import { t } from '../lib/i18n.js'

export default function Hub() {
  return (
    <div className="page">
      <h1>{t('WHERE WOULD YOU LIKE TO BEGIN?')}</h1>
      <p className="lede">
        {t('This is not the town. It is the quiet that comes after it — a place to ask the questions the fog never let you finish.')}
      </p>
      <button className="tour-start" onClick={startTour}>
        <span className="tour-start-play">▶</span>
        <span>
          <strong>{t('GUIDED TOUR')}</strong>
          <em>{t('Four minutes. It drives itself — you just watch. Sound on.')}</em>
        </span>
      </button>
      <div className="doors">
        <Link className="door" to="/talk">
          <span className="num">I</span>
          <span className="kicker">{t('Character')}</span>
          <h2>{t('Talk to a character')}</h2>
          <p>{t('James, Maria, and Mary are here. They answer the way they lived: not always directly.')}</p>
        </Link>
        <Link className="door" to="/place">
          <span className="num">II</span>
          <span className="kicker">{t('Place')}</span>
          <h2>{t('Revisit a place')}</h2>
          <p>{t('The lake, the hospital, Room 312. Touch what was left behind and hear who answers.')}</p>
        </Link>
        <Link className="door" to="/roundtable">
          <span className="num">III</span>
          <span className="kicker">{t('Roundtable')}</span>
          <h2>{t('Start a roundtable')}</h2>
          <p>{t('Choose a question and let them argue it among themselves. You may interrupt.')}</p>
        </Link>
      </div>
    </div>
  )
}
