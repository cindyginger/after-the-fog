import { Link } from 'react-router-dom'
import { SCENES } from '../data/scenes.js'
import { t } from '../lib/i18n.js'

export default function PlaceSelect() {
  return (
    <div className="page">
      <h1>{t('PLACES')}</h1>
      <p className="lede">{t('Rooms keep what people cannot. Choose one, and touch what was left there.')}</p>
      <div className="doors">
        {SCENES.map((s, i) => (
          <Link className="door" key={s.id} to={`/place/${s.id}`}>
            <span className="num">{['I', 'II', 'III'][i]}</span>
            <span className="kicker">{t('Memory-space')}</span>
            <h2>{t(s.name)}</h2>
            <p>{t(s.tagline)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
