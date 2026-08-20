import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { isMuted, setMuted } from '../lib/sound.js'
import { getLang, setLang, t } from '../lib/i18n.js'

export default function Nav() {
  const [muted, setMutedState] = useState(isMuted())
  const lang = getLang()

  function toggleMute() {
    const next = !muted
    setMuted(next)
    setMutedState(next)
  }

  return (
    <nav className="nav">
      <Link to="/begin" className="brand">AFTER THE FOG</Link>
      <div className="links">
        <NavLink to="/talk">{t('Characters')}</NavLink>
        <NavLink to="/place">{t('Places')}</NavLink>
        <NavLink to="/roundtable">{t('Roundtable')}</NavLink>
        <NavLink to="/reflection">{t('Reflection')}</NavLink>
        <button
          className={`mute-toggle ${muted ? 'is-muted' : ''}`}
          onClick={toggleMute}
          title={muted ? 'Unmute — let them speak' : 'Mute — silence the hill'}
        >
          {muted ? t('SOUND OFF') : t('SOUND ON')}
        </button>
        <button
          className="mute-toggle"
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
        >
          {lang === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  )
}
