// Cross-visit persistence: how many times you've come back, and which
// endings the fog has already handed you. All localStorage, no accounts.

const VISITS_KEY = 'atf-visits'
const ENDINGS_KEY = 'atf-endings'
const SESSION_MARK = 'atf-visit-counted'

export function recordVisit() {
  try {
    if (sessionStorage.getItem(SESSION_MARK)) return
    sessionStorage.setItem(SESSION_MARK, '1')
    const n = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10) + 1
    localStorage.setItem(VISITS_KEY, String(n))
  } catch { /* private mode etc. */ }
}

export function visitCount() {
  try { return parseInt(localStorage.getItem(VISITS_KEY) || '0', 10) } catch { return 0 }
}

// True from the second visit onward.
export function isReturnVisit() {
  return visitCount() > 1
}

export function collectedEndings() {
  try { return JSON.parse(localStorage.getItem(ENDINGS_KEY) || '[]') } catch { return [] }
}

export function recordEnding(id) {
  if (id === 'fog') return collectedEndings()
  try {
    const got = collectedEndings()
    if (!got.includes(id)) {
      got.push(id)
      localStorage.setItem(ENDINGS_KEY, JSON.stringify(got))
    }
    return got
  } catch { return [] }
}
