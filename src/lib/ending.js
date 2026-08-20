// Ending verdict — the exhibition's answer to "what were you doing here?"
// Computed from the visit's statistics, mirroring how the original game
// silently grades the player's behavior. All verdict text is original.

const ENDINGS = {
  leave: {
    id: 'leave',
    title: 'LEAVE',
    line: 'You kept asking until the truth stopped being deniable — and then you stayed kind to it. The fog has no further business with you.',
    how: 'Reached by circling guilt and love, and letting James answer instead of hide.'
  },
  water: {
    id: 'water',
    title: 'IN WATER',
    line: 'You collected every stone the town offered — punishment, denial, the cold arithmetic of the lake. Put some of them down before you walk to the shore.',
    how: 'Reached by dwelling on punishment and denial, and letting the evasions stand.'
  },
  maria: {
    id: 'maria',
    title: 'MARIA',
    line: 'You kept asking what she is instead of who she is. The town has taken note of your preference. Something with a familiar face is waiting by the door.',
    how: 'Reached by following desire and projection, and giving Maria most of your attention.'
  },
  dog: {
    id: 'dog',
    title: 'DOG',
    line: 'You found the key. Behind the door: a control room, a very good dog, a tiny pair of headphones. Some mysteries end in barking.',
    how: 'Reached by picking up the Dog Key. You knew exactly what you were doing.'
  },
  fog: {
    id: 'fog',
    title: 'STILL IN THE FOG',
    line: 'The town has not decided what you came here for. Neither have you. Keep asking — the verdict is being drafted.',
    how: 'Talk to more of them, touch more of what was left behind, and return.'
  }
}

export function computeEnding(session) {
  const t = session.themeCounts || {}
  const g = k => t[k] || 0
  const answers = session.answers || {}
  const evasions = session.evasions || {}
  const total = Object.values(t).reduce((a, b) => a + b, 0)
  const totalEvasions = Object.values(evasions).reduce((a, b) => a + b, 0)
  const mariaLines = (answers.maria || 0) + (evasions.maria || 0)

  // The joke override, faithful to the spirit of the original.
  if ((session.objectsExamined || []).includes('roundtable/dog-key')) return ENDINGS.dog

  if (total < 6) return ENDINGS.fog

  const scores = {
    leave: g('guilt') * 1.5 + g('love') * 2 + g('memory') + (answers.james || 0),
    water: g('punishment') * 2 + g('denial') * 1.5 + g('illness') + totalEvasions * 1.5,
    maria: g('desire') * 2 + g('projection') * 1.5 + mariaLines * 1.5
  }
  // Maria's ending needs her actually in your story.
  if (mariaLines === 0) scores.maria = -1

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  return ENDINGS[best]
}
