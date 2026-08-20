export const TOPICS = [
  {
    id: 'what-is-silent-hill',
    title: 'What is Silent Hill?',
    subtitle: 'A town, a punishment, a mirror — the participants do not agree.',
    seed: 'The exhibition asks the table: What is Silent Hill, really? A place that exists, a sentence being served, or something each of you brought with you?'
  },
  {
    id: 'love-after-guilt',
    title: 'What does love become after guilt?',
    subtitle: 'Whether a love that ended the way theirs did can still be called love.',
    seed: 'The exhibition asks the table: after everything that happened between you, what is left that can still honestly be called love?'
  },
  {
    id: 'monsters-self',
    title: 'Are monsters part of the self?',
    subtitle: 'On nurses, mannequins, and the thing with the red helmet.',
    seed: 'The exhibition asks the table: the creatures in the fog — were they enemies, or were they authored? And if authored, by whom at this table?'
  }
]

export const topicById = (id) => TOPICS.find(t => t.id === id)
