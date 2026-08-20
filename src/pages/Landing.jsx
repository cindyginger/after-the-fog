import { useNavigate } from 'react-router-dom'
import { isReturnVisit } from '../lib/persist.js'
import { t } from '../lib/i18n.js'

export default function Landing() {
  const nav = useNavigate()
  const returning = isReturnVisit()
  return (
    <div className="landing">
      <p className="letter-line">
        {returning
          ? t('The letter found you again. It remembers being read.')
          : t('You received a letter after the ending.')}
      </p>
      <button className="enter" onClick={() => nav('/begin')}>
        {returning ? t('Open it again') : t('Open it')}
      </button>
      <p className="disclaimer">
        AFTER THE FOG — a non-commercial fan study of Silent Hill 2.
        Not affiliated with Konami. No original game assets are used.
      </p>
    </div>
  )
}
