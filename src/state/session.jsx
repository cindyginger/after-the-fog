import { createContext, useContext, useReducer, useEffect } from 'react'

// Tracks what the visitor touched across the whole visit,
// so the Reflection Card can be generated at the end.

const KEY = 'after-the-fog-session'

const initial = () => {
  try {
    const saved = sessionStorage.getItem(KEY)
    if (saved) return JSON.parse(saved)
  } catch { /* fresh visit */ }
  return {
    themeCounts: {},        // { guilt: 3, memory: 1, ... }
    evasions: {},           // { james: 2, ... }
    answers: {},            // { james: 5, ... }
    scenesVisited: [],      // ['room312']
    objectsExamined: [],    // ['room312/videotape']
    roundtables: [],        // topic ids
    inventory: [],          // pocketed item ids ('secret-ring', 'dog-key', ...)
    logLines: []            // recent {speaker, text} for reflection, capped
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TAGS': {
      const themeCounts = { ...state.themeCounts }
      for (const t of action.tags) themeCounts[t] = (themeCounts[t] || 0) + 1
      const evasions = { ...state.evasions }
      const answers = { ...state.answers }
      if (action.evaded) evasions[action.characterId] = (evasions[action.characterId] || 0) + 1
      else answers[action.characterId] = (answers[action.characterId] || 0) + 1
      return { ...state, themeCounts, evasions, answers }
    }
    case 'VISIT_SCENE':
      if (state.scenesVisited.includes(action.id)) return state
      return { ...state, scenesVisited: [...state.scenesVisited, action.id] }
    case 'EXAMINE':
      if (state.objectsExamined.includes(action.id)) return state
      return { ...state, objectsExamined: [...state.objectsExamined, action.id] }
    case 'ROUNDTABLE':
      if (state.roundtables.includes(action.id)) return state
      return { ...state, roundtables: [...state.roundtables, action.id] }
    case 'PICKUP':
      if ((state.inventory || []).includes(action.id)) return state
      return { ...state, inventory: [...(state.inventory || []), action.id] }
    case 'LOG':
      return {
        ...state,
        logLines: [...state.logLines, { speaker: action.speaker, text: action.text.slice(0, 240) }].slice(-40)
      }
    case 'RESET':
      sessionStorage.removeItem(KEY)
      return initial()
    default:
      return state
  }
}

const SessionCtx = createContext(null)

export function SessionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initial)
  useEffect(() => {
    try { sessionStorage.setItem(KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])
  return <SessionCtx.Provider value={{ session: state, dispatch }}>{children}</SessionCtx.Provider>
}

export const useSession = () => useContext(SessionCtx)
