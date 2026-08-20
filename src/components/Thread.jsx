import { useEffect, useRef } from 'react'
import { t } from '../lib/i18n.js'

// Shared message thread renderer — an archive box that scrolls internally,
// so new lines never yank the page away from the stage above.
// msg: { kind: 'character'|'visitor'|'system'|'error', speaker, text, curator, theme }
export default function Thread({ messages }) {
  const boxRef = useRef(null)
  useEffect(() => {
    const el = boxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  return (
    <div className="thread" ref={boxRef}>
      {messages.map((m, i) => (
        <div key={i} className={`msg ${m.kind} fadein`} style={m.theme ? { '--char-accent': m.theme } : undefined}>
          {m.speaker && <div className="speaker">{t(m.speaker)}</div>}
          <p className={m.streaming ? 'cursor-blink' : ''}>{t(m.text)}</p>
          {m.curator && (
            <div className="curator-note">
              <div className="label">{t('Curator note')}</div>
              <p>{t(m.curator)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
