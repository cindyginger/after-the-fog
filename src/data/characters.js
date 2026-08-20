// Each character carries a theme: accent drives UI color on their pages,
// matching their psychology — James cold moss-green (fog, army jacket, evasion),
// Maria warm rust-rose (desire, danger), Mary pale hospital blue (illness, calm).
export const CHARACTERS = [
  {
    id: 'james',
    name: 'James Sunderland',
    short: 'He received a letter from someone who should not be able to write.',
    theme: { accent: '#7d9180', soft: 'rgba(125,145,128,0.14)', dim: '#55645a' },
    opening: '…You came back too. I keep telling myself I’m done with this town, and then the fog rolls in again. Ask what you want. I’ll try not to… I’ll try.',
    openingReturn: '…You again. I’d ask how you got back in, but doors were never really this town’s policy.\nGo ahead. You know how this works now. Better than I do, probably.',
    suggested: [
      'Why did you come to Silent Hill?',
      'Did you really love Mary?',
      'What was on the videotape?',
      'Is this town punishing you, or are you punishing yourself?',
      'Who is Maria to you?',
      'Do you think you deserve forgiveness?',
      'What would you say to Mary now, if she could hear you?',
      'If someone else was controlling you the whole time — does your guilt still belong to you?'
    ]
  },
  {
    id: 'maria',
    name: 'Maria',
    short: 'She has his wife’s face and none of her patience.',
    theme: { accent: '#c2748a', soft: 'rgba(194,116,138,0.14)', dim: '#7e4f5e' },
    opening: 'So. You finished it, and you still came looking for me. Should I be flattered — or should I ask which one of us you were actually looking for?',
    openingReturn: 'Back so soon? Careful — twice is a habit. Three times is a haunting, and this town keeps a waiting list.',
    suggested: [
      'Are you Mary?',
      'Do you know what you are?',
      'Why do you look like her?',
      'Do you hate James?',
      'Do you feel pain — really feel it?',
      'What do you want, for yourself?',
      'What happens to you when the story ends?',
      'If you’re a projection, whose desire are you?'
    ]
  },
  {
    id: 'mary',
    name: 'Mary Shepherd-Sunderland',
    short: 'She wrote the letter. Or something of her did.',
    theme: { accent: '#8fa8bd', soft: 'rgba(143,168,189,0.13)', dim: '#5d7285' },
    opening: 'You read my letter. That’s more than most people managed while I could still hold a pen. Sit down — the light in here is kind, for once.',
    openingReturn: 'You came back. Most visitors don’t; the polite ones send flowers instead.\nSit. The chair remembers you. So do I.',
    suggested: [
      'Did you write the letter?',
      'Did you forgive James?',
      'What was the hospital like?',
      'Was your anger real, or was it the illness talking?',
      'Do you hate what you became at the end?',
      'What do you think of Maria?',
      'Can love survive something like this?',
      'What do you remember of the lake?'
    ]
  },
  {
    id: 'angela',
    name: 'Angela Orosco',
    short: 'She is looking for her mama. The stairs are always burning.',
    theme: { accent: '#b0713f', soft: 'rgba(176,113,63,0.13)', dim: '#7a5030' },
    opening: '…Oh. I thought you were someone else. People keep being someone else.\nYou can sit. Not too close. …You can ask things. I might not answer. That has to be allowed here, or I’m leaving.',
    openingReturn: '…Oh. It’s you. You were here before. You didn’t stare.\nThat’s the whole reason I’m still sitting here. Ask, then.',
    suggested: []
  },
  {
    id: 'eddie',
    name: 'Eddie Dombrowski',
    short: 'He just got lost. That’s all. Quit looking at him like that.',
    theme: { accent: '#a09a4f', soft: 'rgba(160,154,79,0.12)', dim: '#6e6a38' },
    opening: 'Heh. Somebody actually wants to talk to me? That’s new.\n…Wait. Were you laughing just now? Before you came in. It’s fine. It’s fine! Sit down. I got nowhere to be.',
    openingReturn: 'Hey, I know you! You’re the one who didn’t laugh. That puts you on a very short list, buddy. VERY short.',
    suggested: []
  },
  {
    id: 'laura',
    name: 'Laura',
    short: 'Eight years old. The town never once touched her.',
    theme: { accent: '#d3bd6e', soft: 'rgba(211,189,110,0.13)', dim: '#8f8050' },
    opening: 'You’re not one of the weird grown-ups, right? There are a LOT of weird grown-ups around here.\nI’m Laura. I’m eight. I’m looking for Mary, and I don’t have all day.',
    openingReturn: 'YOU’RE BACK! Did you bring anything? No? Grown-ups never bring anything.\n…I’m glad you came back anyway. Don’t tell the others I said that.',
    suggested: []
  }
]

export const byId = (id) => CHARACTERS.find(c => c.id === id)
