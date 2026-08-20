import { THEMES } from '../data/themes.js'
import { useSession } from '../state/session.jsx'

// Right rail: theme tags that light up as the conversation touches them,
// plus curator-note "memory fragments" collected this visit.
export default function ThemeRail({ fragments = [] }) {
  const { session } = useSession()
  return (
    <aside className="rail">
      <h3>Themes touched</h3>
      <div className="themes">
        {THEMES.map(t => (
          <span key={t} className={`theme-chip ${session.themeCounts[t] ? 'lit' : ''}`}>
            {t}{session.themeCounts[t] > 1 ? ` ×${session.themeCounts[t]}` : ''}
          </span>
        ))}
      </div>
      {fragments.length > 0 && (
        <>
          <h3>Memory fragments</h3>
          <div className="fragments">
            {fragments.map((f, i) => <div key={i} className="fragment">{f}</div>)}
          </div>
        </>
      )}
    </aside>
  )
}
