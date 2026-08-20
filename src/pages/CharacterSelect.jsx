import { Link } from 'react-router-dom'
import { CHARACTERS } from '../data/characters.js'
import { t } from '../lib/i18n.js'

export default function CharacterSelect() {
  return (
    <div className="page">
      <h1>{t('CHARACTERS')}</h1>
      <p className="lede">{t('Six people are waiting in the archive. Each remembers the same story differently.')}</p>
      <div className="doors">
        {CHARACTERS.map((c, i) => (
          <Link className="door" key={c.id} to={`/talk/${c.id}`}>
            <span className="num">{['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</span>
            <span className="kicker">{t('Persona file')}</span>
            <h2>{t(c.name)}</h2>
            <p>{t(c.short)}</p>
          </Link>
        ))}
        <Link className="door door-red" to="/judgment">
          <span className="num">VII</span>
          <span className="kicker">{t('Special exhibit')}</span>
          <h2>{t('Pyramid Head')}</h2>
          <p>{t('It does not converse. Speak into the room, and the room answers once.')}</p>
        </Link>
      </div>
    </div>
  )
}
