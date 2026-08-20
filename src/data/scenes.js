export const SCENES = [
  {
    id: 'toluca',
    name: 'Toluca Lake',
    tagline: 'The water keeps everything it is given.',
    systemNote: 'A grey lake under thick fog. A rotting observation deck, an empty rowboat, water the color of old film. This is where the journey began — and, in some versions of the story, where it ends.',
    intro: 'Fog sits on the water like it pays rent. Somewhere out there is a boat, an island, a history the town would rather keep folded. The lake does not reflect you today.',
    objects: [
      {
        id: 'letter',
        name: 'The Letter',
        systemNote: 'The letter from Mary that summoned James — words from a dead woman, on paper that was blank all along, or became blank, depending on when you look.',
        blurb: 'Paper, unfolded and refolded so many times the creases have gone soft. "In my restless dreams, I see that town…" — you remember the shape of it, if not the exact words.',
        curator: 'The letter is an invitation the mind sends itself: a summons to the place where an unbearable memory is stored.'
      },
      {
        id: 'radio',
        name: 'The Radio',
        systemNote: 'The broken pocket radio that hisses static when something inhuman comes close.',
        blurb: 'A small dead radio. It only ever spoke one language — static — and it never once lied.',
        curator: 'The radio externalizes dread: an alarm not for monsters, but for the approach of what the mind refuses to see directly.'
      },
      {
        id: 'water',
        name: 'The Water',
        systemNote: 'The dark surface of Toluca Lake itself, which local history says has swallowed boats, plague dead, and secrets.',
        blurb: 'It doesn’t move like water should. It moves like something asleep, and heavy, and patient.',
        curator: 'Deep water is the oldest image of the unconscious this story has — what sinks is not gone, only unlit.'
      }
    ]
  },
  {
    id: 'hospital',
    name: 'Brookhaven Hospital',
    tagline: 'Some rooms remember being screamed in.',
    systemNote: 'A sick institutional building: peeling paint the color of gauze, flickering fluorescent light, a reception desk with no receptionist. Here illness, care, and dread share a corridor.',
    intro: 'The lights buzz at a pitch just below hearing. Every door in this corridor is the same door, and behind one of them somebody was patient with you, once, until they weren’t.',
    objects: [
      {
        id: 'bed',
        name: 'The Hospital Bed',
        systemNote: 'A metal-framed hospital bed, sheets tucked with institutional tightness, restraint points visible at the rails.',
        blurb: 'The sheets are drawn tight enough to bounce a coin. Nobody sleeps in a bed like this. They wait in it.',
        curator: 'The bed is where love is tested against duration — the scene of care, resentment, and watching, all at once.'
      },
      {
        id: 'mirror',
        name: 'The Mirror',
        systemNote: 'A clouded washroom mirror. Things seen in it do not always match what stands before it.',
        blurb: 'Someone wiped a hand across the fog on the glass, once, and the streak never faded. You are not sure you want it clearer.',
        curator: 'Mirrors in this town do not show faces; they show verdicts. The question is who is doing the judging.'
      },
      {
        id: 'flashlight',
        name: 'The Flashlight',
        systemNote: 'A small pocket flashlight — the kind that draws every monster in the dark toward its bearer, and is carried anyway.',
        blurb: 'Carrying light in this place is a confession: it tells everything in the dark exactly where you are. People carry it anyway.',
        curator: 'To see, here, is to be seen. Insight and exposure are the same gesture — which is why so many prefer the dark.'
      }
    ]
  },
  {
    id: 'room312',
    name: 'Room 312, Lakeview Hotel',
    tagline: 'The room where the story was waiting for you.',
    systemNote: 'A lakeside hotel room preserved like a museum exhibit: a TV, a videotape, a made bed, a window with the lake beyond. This is where James watched the tape and remembered what he did.',
    intro: 'The room is exactly as it was left, which is impossible, because the hotel burned. The television faces the bed like a witness that never blinks.',
    objects: [
      {
        id: 'videotape',
        name: 'The Videotape',
        systemNote: 'The tape James recorded on their last trip — the tape that holds the truth of Mary’s final moments, and of what James did.',
        blurb: 'An unlabeled tape, rewound. Whoever rewound it wanted it ready to play again. Or wanted to pretend it had never been played.',
        curator: 'The tape is repressed truth in physical form: recorded by the self, hidden by the self, and waiting for the self to be strong enough to press play.'
      },
      {
        id: 'television',
        name: 'The Television',
        systemNote: 'The hotel room television, screen dark, faint static behind the glass.',
        blurb: 'Even switched off, the screen holds a grey light, like an eye that has learned to sleep open.',
        curator: 'A screen is a machine for watching at a distance — until it plays your own memory, and the distance is revoked.'
      },
      {
        id: 'window',
        name: 'The Window',
        systemNote: 'The window overlooking Toluca Lake — the view Mary called their "special place".',
        blurb: 'The lake through glass looks almost gentle. Mary asked to come back here. Not for the room. For this exact grey water.',
        curator: '"Our special place" — the last landscape where the couple was happy, kept behind glass like everything else that cannot be touched again.'
      }
    ]
  }
]

export const sceneById = (id) => SCENES.find(s => s.id === id)
