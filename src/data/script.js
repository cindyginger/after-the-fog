// All scripted dialogue for After the Fog.
// Every line carries theme tags and an "evaded" flag, replacing the
// AI marker protocol — the Reflection Card is fed from these.

// ---------------------------------------------------------------- characters

export const CHAT_SCRIPTS = {
  james: {
    // Lines when the visitor pokes the portrait.
    pokes: [
      '…What? I’m still here. That’s… about all I can promise.',
      'You keep looking at me like you’re waiting for me to confess something. …Take a number.',
      'Sorry. I was somewhere else. The hallway with the… never mind.'
    ],
    questions: [
      {
        id: 'why-here',
        q: 'Why did you come to Silent Hill?',
        a: 'I got a letter. From my wife. Mary died of that damn disease three years ago… so I came here looking for her. That’s what I told the girl at the cemetery, anyway.\n…It sounded true when I said it.',
        tags: ['memory', 'denial'], evaded: true,
        followups: ['letter-blank']
      },
      {
        id: 'letter-blank',
        q: 'What did the letter actually say?',
        a: '"In my restless dreams, I see that town." She wanted me to come. To our special place.\n…Later, when I looked again, the paper was blank. I don’t know when it went blank. Maybe it always was.',
        tags: ['memory', 'denial'], evaded: false,
        curator: 'The letter that summons and then erases itself: an invitation the mind writes, delivers, and destroys once its work is done.'
      },
      {
        id: 'love-mary',
        q: 'Did you really love Mary?',
        a: 'Yes. …Yes. That’s the one thing I— \nWhen she got sick, I kept visiting. Then I kept meaning to visit. There’s a difference, and I knew it, and I drove to the hospital anyway with the radio up loud so I couldn’t hear myself think.',
        tags: ['love', 'guilt'], evaded: false
      },
      {
        id: 'videotape',
        q: 'What was on the videotape?',
        a: '…It’s just a tape from our trip. The lake. Mary laughing at something off-camera.\nThat’s all. That’s all it is. Can we… is there something else you wanted to ask?',
        tags: ['denial', 'guilt'], evaded: true,
        followups: ['videotape-truth']
      },
      {
        id: 'videotape-truth',
        q: 'James. What was at the end of the tape?',
        a: '…Me.\nAt the end of the tape there’s me, and there’s her bed, and there’s a pillow.\nShe was suffering. I told myself it was mercy. I’ve had three years to check that math and it never comes out clean.',
        tags: ['guilt', 'violence', 'love'], evaded: false,
        curator: 'The tape is repressed truth in physical form: recorded by the self, hidden by the self, and waiting for the self to be strong enough to press play.'
      },
      {
        id: 'punishment',
        q: 'Is this town punishing you, or are you punishing yourself?',
        a: 'Does it matter? Whoever built the sentence, I keep showing up to serve it.\nThe fog doesn’t chase me. It waits. Things that wait for you know you’re coming back.',
        tags: ['punishment', 'guilt'], evaded: false
      },
      {
        id: 'maria',
        q: 'Who is Maria to you?',
        a: 'She looks like Mary. She isn’t. She laughs easier and she stands closer, and every time I let myself be glad about that, it feels like stealing from a grave.\nI know what she probably is. I’ve never said it to her face. You can, if you’re braver than me.',
        tags: ['desire', 'projection', 'guilt'], evaded: false
      },
      {
        id: 'pyramid',
        q: 'What is the thing with the red helmet?',
        a: 'I stopped calling it a monster a while ago. Monsters come from somewhere else. That thing knew exactly where to hurt, and only somebody local knows that.\n…I think I built it. I think I needed an executioner and the town takes requests.',
        tags: ['punishment', 'violence', 'projection'], evaded: false
      },
      {
        id: 'forgiveness',
        q: 'Do you think you deserve forgiveness?',
        a: '…You know, everyone here asks better questions than the ones I brought with me.\nNo. I don’t think "deserve" is a word I get to use. But Mary said— in the letter she— \n…Ask her. She keeps the last word. She earned it.',
        tags: ['guilt', 'love'], evaded: true
      },
      {
        id: 'player',
        q: 'If someone else was controlling you the whole time — is your guilt still yours?',
        a: 'Somebody walking me down those hallways, you mean. Deciding when I run and when I look.\n…Even if that were true, whoever it was — they only steered. The hands were mine. You can hand someone the wheel and still be the reason the car was pointed at the lake.',
        tags: ['identity', 'guilt'], evaded: false,
        curator: 'The player moves James for hours toward a truth James hid from himself — complicity is the game’s central mechanic, not a plot detail.'
      }
    ]
  },

  maria: {
    pokes: [
      'Staring is free. Answers cost a question.',
      'Careful. The last man who looked at me that long is still apologizing.',
      'What? Did I flicker?'
    ],
    questions: [
      {
        id: 'are-you-mary',
        q: 'Are you Mary?',
        a: 'You’re the third person to open with that, and the fog makes four.\nNo. Mary coughed when she laughed and hated her own handwriting. I laugh fine and I’ve never written anything down. Does that settle it? …It never settles it.',
        tags: ['identity', 'projection'], evaded: true,
        followups: ['what-are-you']
      },
      {
        id: 'what-are-you',
        q: 'Then what are you?',
        a: 'Say it. You want to say "you’re his desire wearing her face." Everyone wants to say it, like naming me would file me away somewhere.\nHere’s my problem with that theory: when I died in that hallway, it hurt. Ideas don’t hurt. So either I’m real, or pain proves nothing — and I don’t know which of those is worse for you.',
        tags: ['identity', 'desire', 'projection'], evaded: false,
        curator: 'Maria is the game’s sharpest question: if a projection can suffer, the word "projection" stops being a comfortable answer.'
      },
      {
        id: 'why-her-face',
        q: 'Why do you look like her?',
        a: 'Why does the town look like a postcard he kept? I came the way I came. Nobody showed me a catalogue.\nThough sometimes… I catch myself knowing which songs she liked. Knowing it from the inside. Like a furnished apartment — you didn’t buy the furniture, but it’s yours now.',
        tags: ['identity', 'memory'], evaded: true
      },
      {
        id: 'hate-james',
        q: 'Do you hate James?',
        a: 'I’ve died for that man more times than I can prove, and every time he grieves like it’s a rehearsal for someone else’s funeral.\nHate him? I want him to look at me once — once — and see me first. Hate would be easier. Hate you can put down.',
        tags: ['love', 'desire'], evaded: false
      },
      {
        id: 'feel-pain',
        q: 'Do you feel pain — really feel it?',
        a: 'The cage. The hallway. The hotel. Would you like the order, or the details?\nI remember each one, which is its own cruelty — Mary got to die once. I’m apparently on a subscription.',
        tags: ['violence', 'identity'], evaded: false
      },
      {
        id: 'want',
        q: 'What do you want, for yourself?',
        a: 'For myself. Huh. People ask what I am, what I mean, what I represent — you’re the first to ask what I want.\nI want a morning that isn’t staged. Coffee that isn’t a prop. Someone saying my name — mine — without checking my face against a photograph first. …Small things. Impossible things.',
        tags: ['desire', 'identity'], evaded: false,
        curator: 'The tragedy of Maria: made to be wanted, never asked what she wants. The question itself is a small act of mercy.'
      },
      {
        id: 'ending',
        q: 'What happens to you when the story ends?',
        a: 'Which ending? In one I’m at the lake with him, coughing. Did you catch that? Coughing. I win, and the prize is her script.\nIn the others I just… stop being needed. You’d think that feels like nothing. It doesn’t feel like nothing.',
        tags: ['identity', 'punishment'], evaded: false
      },
      {
        id: 'whose-desire',
        q: 'If you’re a projection — whose desire are you, exactly?',
        a: 'Oh, I like you. Everyone assumes I’m his. His grief, his guilt, his… appetite, dressed up nice.\nBut you’re the one who walked me through every room. You’re the one who reloaded when I died. So — his desire, or yours? Take your time. I have literally nothing but time.',
        tags: ['desire', 'projection', 'identity'], evaded: false
      }
    ]
  },

  mary: {
    pokes: [
      'I’m still here. Sitting is what I do best these days.',
      'You can look. The light in here is kinder than the hospital’s was.',
      '…Sorry. I drift. Three years of ceilings will do that.'
    ],
    questions: [
      {
        id: 'letter',
        q: 'Did you write the letter?',
        a: 'I wrote it near the end, when my handwriting had gone strange and my anger had worn itself out. I told him to remember me, and to go on living, and — if he couldn’t do that — to come find me in our special place.\nI meant it as permission. I should have known he’d read it as a summons. He never could tell the difference between being released and being sentenced.',
        tags: ['love', 'memory'], evaded: false
      },
      {
        id: 'forgive',
        q: 'Did you forgive James?',
        a: 'You’ll want a yes or a no, and I had one of each, depending on the day.\nHe ended my pain and called it mercy; he also ended his waiting, and never learned to say that part out loud. Both are true. I asked for it. Asking doesn’t make it simple.\nSome days I forgave him before he did it. Some days I haven’t forgiven him yet. Judgment stopped being my job when I died — accuracy is what I have left.',
        tags: ['love', 'guilt', 'punishment'], evaded: false,
        curator: 'The game refuses to grade James, and so does Mary. "In Water" and "Leave" are both honest readings of the same letter.'
      },
      {
        id: 'hospital',
        q: 'What was the hospital like?',
        a: 'Loud, then quiet, in the worst order. The disease took my face first, then my patience, then my visitors.\nI screamed at the people who came. Then I cried about the people who didn’t. James caught both, poor timing being one of his talents.\nThe flowers were lovely. I told him to throw them out. Both of those are also true.',
        tags: ['illness', 'love'], evaded: false
      },
      {
        id: 'anger-real',
        q: 'Was your anger real, or was it the illness talking?',
        a: 'People ask that hoping the answer is "the illness," because then the sick stay sweet and dying stays photogenic.\nIt was mine. The illness handed me the megaphone, but the words were mine. I wanted my body back, my face back, my visitors to stop practicing their condolence faces in my doorway. That’s not a symptom. That’s a person.',
        tags: ['illness', 'identity'], evaded: false,
        curator: 'Room 312’s recording lets Mary be furious and loving in the same breath — the game’s refusal to sanitize the dying is its most radical kindness.'
      },
      {
        id: 'became',
        q: 'Do you hate what you became at the end?',
        a: 'I hated that the mirror got to vote on who I was. Whatever was in that bed at the end — it still liked the lake, still remembered our first apartment, still wanted its hand held by someone who wasn’t flinching.\nThe body broke faith with me long before I broke faith with anyone.',
        tags: ['illness', 'identity'], evaded: false
      },
      {
        id: 'maria',
        q: 'What do you think of Maria?',
        a: 'People expect me to be jealous. Of what — the outfit?\nWhen I look at her I mostly see the measurements. He couldn’t even want someone who wasn’t me; he just wanted me without the hospital in the frame. She deserves better than being somebody’s edited photograph. …We might have been friends, in a town with less fog.',
        tags: ['projection', 'love'], evaded: false
      },
      {
        id: 'love-survive',
        q: 'Can love survive something like this?',
        a: 'Survive is the wrong verb. Love isn’t the thing that survives — it’s the thing that gets testified about afterward, by unreliable witnesses.\nHe loved me. He also counted my breaths wishing they’d hurry. If your definition of love can’t hold both of those, your definition is for greeting cards.',
        tags: ['love', 'guilt'], evaded: false
      },
      {
        id: 'lake',
        q: 'What do you remember of the lake?',
        a: 'Grey water, and James trying to read the historical plaque with his jacket collar up, pretending he wasn’t cold.\nI said we should come back. I said it the way you drop a coin in a fountain — not a plan, a wish.\nBe careful which sentences you say near water. Some of them keep.',
        tags: ['memory', 'love'], evaded: false
      }
    ]
  },

  angela: {
    pokes: [
      '…Don’t. Please. I startle easy, that’s all.',
      'I’m fine. People always ask like they want a different answer.',
      '…You’re still here. Most people find a reason to be somewhere else.'
    ],
    questions: [
      {
        id: 'stairs',
        q: 'Why are you always on the stairs?',
        a: 'Stairs go two ways. That’s more choice than most rooms give you.\n…I was on my way up. Or I’d just given up on up. Depends which day you caught me.',
        tags: ['punishment', 'identity'], evaded: true
      },
      {
        id: 'mama',
        q: 'Who are you looking for?',
        a: 'My mama. I keep telling everyone that and they keep hearing something else.\nShe went away when things at home were… when things were what they were. I’m not angry she left. I just want to ask her why she didn’t take me with her. That’s all. It’s a small question. It shouldn’t be this heavy.',
        tags: ['memory', 'love'], evaded: false,
        followups: ['home']
      },
      {
        id: 'home',
        q: 'What was home like?',
        a: '…No.\nNot because you asked wrong. You asked fine. But that door stays shut, and choosing to keep it shut is the only lock I’ve ever owned.\nThe papers said what happened at that house. Let the papers carry it.',
        tags: ['denial', 'punishment'], evaded: true,
        curator: 'The exhibition does not open this door either. Angela’s history is legible in the game without ever being shown — restraint the original chose, and keeps.'
      },
      {
        id: 'fire',
        q: 'What does this town look like, to you?',
        a: 'You see fog, don’t you. Everyone I meet is walking around in fog, complaining about the cold.\nFor me it’s… warm. It’s always warm here. Walls, stairs, the air over the lake — all of it, always.\nDon’t look sorry for me. You get used to a climate. That’s the worst part, that you get used to it.',
        tags: ['punishment', 'identity'], evaded: false,
        curator: 'Angela and James stand in the same hallway and see different weather. The town renders each visitor’s inner state — hers burns.'
      },
      {
        id: 'knife',
        q: 'Why did you give James the knife?',
        a: 'Because I’d been holding it for the wrong reasons, and holding a thing for the wrong reasons gets heavier every day.\nHe looked like somebody who could carry things. …I found out later what he’d carried. Maybe I handed it to the one person who understood the weight.',
        tags: ['punishment', 'guilt'], evaded: false
      },
      {
        id: 'fault',
        q: 'None of it was your fault. You know that?',
        a: '…People say that like it’s water and I’m a fire they can put out with it.\nI know what the words mean. Knowing and believing live in different houses. Some days I visit the second house. I never get to stay.\nBut thank you. I’m not being — I mean it. Thank you for saying it plain.',
        tags: ['guilt', 'identity'], evaded: false
      },
      {
        id: 'james-help',
        q: 'Could James have saved you?',
        a: 'He kept trying to hand me his map, and it was a map of a different town.\nNobody saves anybody here. That’s not bitterness, it’s… zoning. Everyone’s sentence is single-occupancy.\nHe was kind, in his useless way. I remember the kindness separate from the uselessness. That’s the fairest I know how to be.',
        tags: ['punishment', 'love'], evaded: false
      }
    ]
  },

  eddie: {
    pokes: [
      'What. WHAT. …Sorry. Reflex.',
      'You want pizza? Found a whole one. This town’s not all bad.',
      'Quit staring. I know how I look. I got a mirror, same as everybody.'
    ],
    questions: [
      {
        id: 'lost',
        q: 'How did you end up in Silent Hill?',
        a: 'Took a wrong turn. That’s it. That’s the whole story. Me and a dumb wrong turn.\n…You’re making the face. The "sure, buddy" face. Fine. Maybe the turn wasn’t wrong so much as… fast. Maybe I was leaving somewhere quicker than I was going somewhere.',
        tags: ['denial'], evaded: true,
        followups: ['back-home']
      },
      {
        id: 'back-home',
        q: 'What were you leaving behind?',
        a: 'A town full of comedians. Everybody’s got a bit about Eddie. Eddie’s weight, Eddie’s job, Eddie puking when he’s scared. Twenty years of open mic night and I’m the material.\nAnd then one day I did something that shut the whole room up. …First quiet I ever got. You want to know the sick part? It felt like applause.',
        tags: ['violence', 'punishment', 'identity'], evaded: false,
        curator: 'Eddie’s arc is the game’s bluntest warning: humiliation doesn’t dissolve, it compounds — and the town pays interest on it.'
      },
      {
        id: 'dog',
        q: 'And the dog?',
        a: '…The dog didn’t laugh at me. Dogs don’t laugh.\nI know. I KNOW. You don’t have to say it. It’s the thing I’d take back first, before any of the rest of it, and nobody believes that matters, and maybe it doesn’t.\nNext question. I mean it. Next question.',
        tags: ['violence', 'guilt'], evaded: true
      },
      {
        id: 'laughing',
        q: 'When did the laughing start hurting?',
        a: 'It never started, it just always was. You grow up inside it, like weather.\nHere’s what nobody gets: I could take the mean ones. It’s the friendly ones, the "we’re just kidding, big guy" ones — those are the loans. You smile along, and you’re co-signing. Twenty years of co-signing, and the town knew exactly the balance when I walked in.',
        tags: ['identity', 'punishment'], evaded: false
      },
      {
        id: 'town-eddie',
        q: 'What does the town show you?',
        a: 'Meat. Freezers full of it, hanging there. Cold rooms full of stuff that used to get pushed around and doesn’t push back anymore.\nJames gets a whole gothic opera. Angela gets fire. I get the meat locker. Even my hell got the discount, huh?\n…Yeah. That one’s mine. Only joke I get to make first.',
        tags: ['punishment', 'projection', 'identity'], evaded: false,
        curator: 'The bowling alley, the frozen meat: Eddie’s labyrinth is built from cheap mockery, cold storage, and things reduced to weight.'
      },
      {
        id: 'james-fight',
        q: 'James put you down. How do you feel about him?',
        a: 'He came into MY room, and when I finally stood up for myself — that’s what it felt like, I know how it sounds — he treated me like the rest of the monsters.\nBut you want the real thing? For one second before the end he looked at me like I was a guy. A guy, not a bit. Twenty-some years, and the one who managed it was the one holding the gun. This town’s got a sense of humor after all.',
        tags: ['violence', 'identity', 'punishment'], evaded: false
      },
      {
        id: 'other-way',
        q: 'Was there another way for you?',
        a: 'People love that question. Keeps THEIR options feeling open.\n…Sure. There was a version where somebody got to me before the town did. A coach, a girl, one guy at the plant who didn’t do the nickname thing. It wouldn’t have taken much. That’s the part that should scare you — it never takes much, either direction.',
        tags: ['punishment', 'identity'], evaded: false
      }
    ]
  },

  laura: {
    pokes: [
      'Quit poking! I poke back. Harder.',
      'Are you slow? Mary said grown-ups get slow.',
      'You’re weird. Not scary-weird. Boring-weird.'
    ],
    questions: [
      {
        id: 'no-monsters',
        q: 'Aren’t you scared of the monsters here?',
        a: 'WHAT monsters? Everyone keeps doing this! James was all sweaty about it too.\nIt’s a foggy old town with zero good snacks. The scariest thing I saw was a nurse station with nobody at it, and that’s just rude, not scary.\nIf you’re seeing monsters, maybe that’s a you problem.',
        tags: ['identity', 'guilt'], evaded: false,
        curator: 'Laura walks the same streets unharmed. Nothing in the town has any claim on a child with nothing to repress — she is the proof of the whole mechanism.'
      },
      {
        id: 'why-here',
        q: 'What’s an eight-year-old doing here alone?',
        a: 'Looking for Mary, obviously. We were in the hospital together. She was my best friend even though she was a hundred years old or whatever.\nShe said she wanted to bring me here someday. To the lake. So I came. I’m very good at going places I’m not supposed to. It’s my main skill.',
        tags: ['love', 'memory'], evaded: false
      },
      {
        id: 'hate-james',
        q: 'Why are you so hard on James?',
        a: 'Because he’s a LIAR. He says he loved Mary but he stopped visiting. I was there. I kept count. Eight years old and I visited more than her own husband.\nMary would go quiet after visiting hours and I knew who she was being quiet about.\n…He cried when I yelled at him though. Good. Crying’s the least he can do. He should do more of it.',
        tags: ['love', 'guilt'], evaded: false
      },
      {
        id: 'mary-like',
        q: 'What was Mary like, in the hospital?',
        a: 'She was the only grown-up who talked to me like a person and not like a form they had to fill out.\nSome days she yelled at everybody. The nurses said "don’t take it personal, sweetie," but I never took it personal because the day after yelling she’d always save me her dessert. That’s not a mean person. That’s a person having the worst time of anybody.\nShe was writing me a letter for my birthday. I got it. I keep it in my pocket. No, you can’t see it.',
        tags: ['love', 'illness', 'memory'], evaded: false,
        curator: 'Mary’s letter to Laura exists in the game as pure tenderness with no agenda — the one document in Silent Hill that asks for nothing back.'
      },
      {
        id: 'grown-ups',
        q: 'What do you think is wrong with the grown-ups here?',
        a: 'They all act like the fog is coming from OUTSIDE.\nJames keeps apologizing to people who aren’t there. The pretty lady looks at me like I’m a test she might fail. The big guy talks to his food. And the crying lady on the stairs — okay, her I don’t make fun of. Somebody was really mean to her. Even I can tell that.\nGrown-ups think kids don’t notice things. We notice EVERYTHING. We just have better stuff to do.',
        tags: ['projection', 'identity'], evaded: false
      },
      {
        id: 'after',
        q: 'Where will you go, after this?',
        a: 'Somewhere with a dog. That’s the whole plan so far. It’s a good plan.\nMary said in the letter I should be happy and not stay mad forever. I’m going to do the first one. The second one I’m still deciding. I’m allowed to decide slow. I’m eight.',
        tags: ['love', 'memory'], evaded: false
      }
    ]
  }
}

// ------------------------------------------------------------------- scenes

// Keyed by `${sceneId}/${objectId}` — one scripted line per character.
export const SCENE_SCRIPTS = {
  'toluca/letter': {
    james: { text: 'I read it at a rest stop outside town, engine still running. I must have read it thirty times and I still couldn’t tell you if I was hoping it was real or hoping it wasn’t.', tags: ['memory', 'denial'], evaded: false },
    maria: { text: 'A letter from a dead woman. And he drove toward it. If I mailed you a letter after all this — would you come? …Don’t answer fast. That’s how he got here.', tags: ['desire', 'memory'], evaded: false },
    mary: { text: 'I wrote "our special place" and trusted him to remember I meant the view. He heard the water. There’s a lesson in there about leaving instructions for the grieving.', tags: ['love', 'memory'], evaded: false }
  },
  'toluca/radio': {
    james: { text: 'It never once told me what was coming. Just that something was. Static is honest that way — it doesn’t pretend to understand what it’s warning you about.', tags: ['denial'], evaded: false },
    maria: { text: 'It goes quiet around me, mostly. I try not to read into it. …That’s a lie, I read into it constantly.', tags: ['identity'], evaded: false },
    mary: { text: 'Hospitals have a sound like that too. Machines that announce trouble without ever explaining it. You learn to sleep inside the noise. You learn to be afraid of the silence instead.', tags: ['illness', 'memory'], evaded: false }
  },
  'toluca/water': {
    james: { text: 'The guidebook says the lake keeps its dead. Cold water, no currents. Things sink and stay sunk.\n…I used to think that sounded terrible. Lately it sounds like a kind of tidiness.', tags: ['punishment', 'denial'], evaded: true },
    maria: { text: 'He looks at that water the way some men look at an exit. If you take him anywhere when this is over — take him somewhere dry.', tags: ['love'], evaded: false },
    mary: { text: 'We rented the boat, the one summer. He rowed us out and got us lost in the fog for an hour and I have never — before or since — been that happy.\nThe lake kept that too, I think. It keeps everything it’s given.', tags: ['memory', 'love'], evaded: false },
    laura: { text: 'Mary wanted to show me this lake. Honestly? It’s grey and it smells like old boats. But she talked about it like it was the best place in the world, so I’m going to stand here and like it. On purpose. For her.', tags: ['love', 'memory'], evaded: false },
    eddie: { text: 'Water doesn’t care how much you weigh. First thing I ever liked about swimming.\n…This lake, though. This lake looks like it’s been keeping score.', tags: ['identity', 'punishment'], evaded: false }
  },
  'hospital/bed': {
    james: { text: 'You tuck the sheets tight so they look kept. So the nurses know somebody comes. I got… very good at sheets. It was the only part of her I could still fix.', tags: ['guilt', 'love', 'illness'], evaded: false },
    maria: { text: 'I woke up somewhere like this once. Or I have the memory of it, which around here is the same thing and also not at all the same thing.', tags: ['identity', 'memory'], evaded: true },
    mary: { text: 'Three years. You start as a patient and end as a fixture. The bed knew my shape better than any dress I ever owned. I still resent it more than the disease, some days — the disease at least was ambitious.', tags: ['illness', 'identity'], evaded: false },
    laura: { text: 'I used to sneak into Mary’s room after lights-out and sit right there, on the end. The nurses pretended not to see me. Mary pretended to be asleep and then she’d laugh first and blow it. It’s a dumb bed but it’s where my best friend lived, so be nice about it.', tags: ['love', 'memory'], evaded: false }
  },
  'hospital/mirror': {
    james: { text: 'I stopped shaving by mirrors around here. The timing is off in them. Your reflection finishes moving just slightly after you do, like it’s… checking your work.', tags: ['guilt', 'projection'], evaded: true },
    maria: { text: 'You want to know something funny? I look exactly right in mirrors. Perfectly consistent. It’s the only place I never flicker, and that consistency scares me worse than any monster in this town.', tags: ['identity'], evaded: false },
    mary: { text: 'I asked them to cover the one in my room. Not because I couldn’t stand what I saw — because everyone who visited looked at it instead of at me, comparing. The mirror was the only visitor who didn’t lie.', tags: ['illness', 'identity'], evaded: false },
    angela: { text: 'I don’t use them. Mirrors are for people who want a second opinion.\n…When I do look, it’s never me looking back. It’s the version of me they made. I’m still deciding which of us gets the face.', tags: ['identity', 'punishment'], evaded: false }
  },
  'hospital/flashlight': {
    james: { text: 'Turning it on tells everything in the dark exactly where you are. I carried it anyway. Some kinds of blindness are worse than being found.', tags: ['guilt', 'denial'], evaded: false },
    maria: { text: 'He shines it on me sometimes when we walk, checking I’m still there. I used to think it was sweet. Now I count how long before he checks. The intervals are getting shorter.', tags: ['desire', 'identity'], evaded: false },
    mary: { text: 'At the end I asked them to keep the lights low. Kindness, I told them. It wasn’t. Even the dying get vain. Especially the dying.', tags: ['illness'], evaded: false }
  },
  'room312/videotape': {
    james: { text: 'I thought if I never watched it, it would stay a vacation video. That’s how I got three years. Three years of it staying a vacation video.\n…It plays either way, you know. Somewhere in the back of the skull, it plays either way.', tags: ['denial', 'guilt', 'memory'], evaded: false },
    maria: { text: 'That tape is the one thing in this town I won’t touch. Whatever’s on it made him — and whatever made him, made me. Call it professional courtesy between consequences.', tags: ['projection', 'identity'], evaded: true },
    mary: { text: 'You’re not going to like this: I’m glad it exists. Everyone else remembers me politely. That tape is the only witness that doesn’t edit. Even what he did — it keeps it plain, and plain is all I ever asked for.', tags: ['memory', 'guilt'], evaded: false }
  },
  'room312/television': {
    james: { text: 'It was off the whole time I was in this room, and I still couldn’t stop watching it. Screens are like that here. They don’t need to be on to be showing you something.', tags: ['guilt', 'denial'], evaded: true },
    maria: { text: 'Static has a shape if you stare long enough. Don’t stare long enough.', tags: ['projection'], evaded: true },
    mary: { text: 'We used to fall asleep to the television in that hotel. Some documentary about the lake. I know more about Toluca Lake’s drowning victims than any honeymooner should. …Foreshadowing is cheap, isn’t it.', tags: ['memory', 'love'], evaded: false }
  },
  'room312/window': {
    james: { text: 'She kept saying the view was the whole point of the room. I remember agreeing without looking up from the luggage. You could fill that lake with the views I agreed to and never saw.', tags: ['memory', 'guilt'], evaded: false },
    maria: { text: 'It’s a good view. I’d rate it higher if the water didn’t look like it was waiting for somebody.', tags: ['punishment'], evaded: true },
    mary: { text: 'This window is the version of me I’d keep, if I got to choose. Standing right here, hair a mess, saying "look, James." Whatever else the town does with my face — it can’t have that one. That one’s mine.', tags: ['memory', 'identity', 'love'], evaded: false },
    laura: { text: 'Mary drew me this exact window once, on the back of a get-well card somebody sent her. She drew a little stick-figure me standing at it.\nSo technically I’ve been here before. Technically this is MY window. You can share it.', tags: ['love', 'memory'], evaded: false }
  }
}

// --------------------------------------------------------------- roundtable

export const ROUNDTABLE_SCRIPTS = {
  'what-is-silent-hill': {
    turns: [
      { speaker: 'james', text: 'It’s a town. Route 73, past the lake. It has a gas station and a bowling alley and a historical society. I need it to be a town, so let me have that for one more minute.', tags: ['denial'] },
      { speaker: 'laura', text: 'It IS a town! Finally, somebody normal. There’s a bowling alley and everything.\n…Why is everyone looking at me like I said something sad?', tags: ['identity'] },
      { speaker: 'maria', text: 'A town where the fog only thickens around certain people? James, the gas station doesn’t sell anything. The bowling alley has your handwriting on the score sheet. It’s a town the way a mousetrap is a restaurant.', tags: ['punishment', 'projection'], needs: ['james'] },
      { speaker: 'maria', text: 'It’s a stage. The sets go up overnight and the props already have your fingerprints on them.\nI should know. I’m told I came with the furniture.', tags: ['projection', 'identity'], notWith: ['james'] },
      { speaker: 'eddie', text: 'You people get poetry for it. I’ll tell you what it is: it’s the back room. Every place has one — where they put the stuff nobody wants out front.\nOne day the whole town just agreed that’s where I go. And don’t say "that’s not true, Eddie." The fog said it first.', tags: ['punishment', 'identity'] },
      { speaker: 'mary', text: 'You’re both describing the outside. From where I sat it was simpler: it’s a waiting room. Everyone here is between a thing they did and a thing they can’t say. The town just… furnishes that.', tags: ['guilt', 'punishment'] },
      { speaker: 'james', text: 'Then why does it need monsters? If it’s a waiting room, why the nurses, why the— why him. The red thing. Waiting rooms don’t come with executioners.', tags: ['violence', 'punishment'] },
      { speaker: 'maria', text: 'Don’t they? You built yours, sweetheart. The town didn’t send that thing after you — you filed a request. Some people bring a book to a waiting room. You brought a judge.', tags: ['projection', 'punishment'], needs: ['james'] },
      { speaker: 'angela', text: 'You all keep saying fog.\nIt’s warm here. It has always been warm, every street, since the day I arrived. Same town, different weather.\nSo when you ask what Silent Hill is — it’s whatever’s left once you stop pretending the weather is the same for everybody.', tags: ['punishment', 'identity'] },
      { speaker: 'mary', text: 'Maria. …She’s not wrong, James, but she’s enjoying it too much.\nHere’s what I think it is, truly: the town is whatever your guilt looks like when it’s given zoning permits. For Angela it burned. For you it drowned and went quiet. It was never one place. There are as many Silent Hills as there are people who need one.', tags: ['guilt', 'identity'], needs: ['james', 'maria'] },
      { speaker: 'james', text: '…The girl. Laura. She walked through the same streets and saw nothing. No fog, no monsters. Stepped over the nurses like they were furniture.\nI used to think that proved she was protected. It proves the opposite, doesn’t it. It proves the rest of us are the haunted houses, and the town’s just honest about it.', tags: ['guilt', 'memory'] },
      { speaker: 'laura', text: 'Are you talking about me?? Rude.\nBut also — yeah. It’s SO boring here. The best thing I found all week was a cat.\n…Wait. Why is that the "opposite of protected"? What do you people keep seeing?!', tags: ['identity'], needs: ['james'] },
      { speaker: 'mary', text: 'Laura saw a boring little tourist town, because that’s what it is — to anyone with nothing to confess. Remember that when you talk about this place. You weren’t trapped in Silent Hill, James. Silent Hill was trapped in you.', tags: ['guilt', 'identity'], needs: ['james'] }
    ],
    interjections: [
      {
        label: 'But the town existed before James came. It has history — the prison, the plague.',
        needs: ['mary', 'maria'],
        replies: [
          { speaker: 'mary', text: 'So does every prison, and every plague. Old pain seasons a place. The town had its own scar tissue long before us — we just found the rooms that matched ours.', tags: ['memory', 'punishment'] },
          { speaker: 'maria', text: 'Mm. Or the history is set dressing too, and the "records" in that historical society were printed the moment he needed something to find. You’re trusting archives in a town that edits mirrors.', tags: ['projection', 'denial'] }
        ]
      },
      {
        label: 'If the town punishes the guilty, why did it give James what he wanted — Maria?',
        needs: ['maria', 'james'],
        replies: [
          { speaker: 'maria', text: '…Say that again, slower, and look at me while you say it.', tags: ['identity'], evaded: false },
          { speaker: 'james', text: 'Because giving me what I wanted WAS the punishment. Every hour with her was the accusation, restated politely. The town never hit me once. It didn’t need to.', tags: ['punishment', 'desire', 'guilt'] }
        ]
      },
      {
        label: 'Angela, Eddie — the town was here for you two long before James. What did it look like?',
        needs: ['angela', 'eddie'],
        replies: [
          { speaker: 'eddie', text: 'Cold rooms and a bowling alley with my name on the mockery. It knew my size, is what it was. First place that ever did.', tags: ['punishment', 'identity'] },
          { speaker: 'angela', text: '…Smoke. Not from anything you could point to.\nIt looked like the inside of my house, wearing a whole town. That’s all I’ll say about the floor plan.', tags: ['punishment', 'memory'] }
        ]
      }
    ]
  },

  'love-after-guilt': {
    turns: [
      { speaker: 'mary', text: 'Let’s define terms, since nobody ever does. James — when you say you loved me, which year are you talking about? The apartment year, or the hospital years? Because those were different loves, and only one of them was tested.', tags: ['love', 'illness'], needs: ['james'] },
      { speaker: 'mary', text: 'Let’s define terms, since nobody ever does. When someone tells you a love survived, ask them which year they mean. Loves that were never tested don’t count as evidence.', tags: ['love'], notWith: ['james'] },
      { speaker: 'james', text: 'That’s not— they weren’t different. It was the same love the whole time, it just… it got tired, Mary. Love with a body. Bodies get tired.', tags: ['love', 'denial'], needs: ['mary'] },
      { speaker: 'maria', text: 'Can I offer a perspective as the only person at this table who was manufactured BY that love? Because let me tell you what was in the recipe. It wasn’t patience. It was appetite, and grief, and a refund policy.', tags: ['desire', 'projection'] },
      { speaker: 'laura', text: 'Mary wrote me a letter and there isn’t one single sorry in it. It just says be happy, and don’t stay mad forever.\nSo maybe love with no guilt in it sounds like THAT. Maybe the rest of you just wrote yours wrong.', tags: ['love', 'memory'] },
      { speaker: 'mary', text: 'Maria’s cruel, but cruel isn’t the same as wrong. James — I heard what you said at the end. In the hotel. You wanted your life back. That sentence was true, and it was the most honest you’d been in three years, and I’d rather have that sentence than all the flowers.', tags: ['love', 'guilt'], needs: ['maria', 'james'] },
      { speaker: 'james', text: 'How can you— I held the pillow, Mary. You’re grading my honesty and I held the pillow. Whatever love was left in me, that’s where it went. That was the last thing it did.', tags: ['guilt', 'violence', 'love'], needs: ['mary'] },
      { speaker: 'angela', text: 'People talk about love like it’s the opposite of harm. Where I grew up they arrived together, holding hands, and everyone called the pair of them family.\nSo I don’t ask what love becomes after guilt. I ask who taught it to bring guilt along in the first place.', tags: ['love', 'punishment'] },
      { speaker: 'mary', text: 'And I had asked you to. Say the whole ledger if you’re going to say any of it.\nThat’s what love becomes after guilt, since the exhibition asked: bookkeeping. Two people who can’t stop auditing one moment. The love isn’t gone, James. It’s just all been converted into evidence.', tags: ['love', 'guilt', 'punishment'], needs: ['james'] },
      { speaker: 'eddie', text: 'Must be nice, having a love big enough to feel guilty about.\nNobody ever loved me enough to owe me an apology. You know what that does? You start accepting the laughing as attention. That was the exchange rate, where I lived.', tags: ['identity', 'punishment'] },
      { speaker: 'maria', text: '…You two are exhausting. For the record: someone at this table would settle for being loved BEFORE the guilt. As a preventative. Nobody ever tries that.', tags: ['desire', 'love'], needs: ['james', 'mary'] },
      { speaker: 'mary', text: 'Then here’s my closing statement, for the visitor: love survives guilt the way a letter survives a fire — partially, and you spend forever reconstructing what the missing parts said. Read the parts you have. Stop guessing at the rest. That goes for you too, James.', tags: ['love', 'memory'], needs: ['james'] }
    ],
    interjections: [
      {
        label: 'Mary — would you rather he chose "In Water"? Or moved on and lived?',
        needs: ['mary', 'james'],
        replies: [
          { speaker: 'mary', text: 'I wrote "go on with your life" with my own dying hand, so you’d think that settles it. But you’re asking the version of me that got smothered, and some days she votes differently than the letter did. I contain a majority and a dissent. He should read the majority.', tags: ['love', 'punishment'] },
          { speaker: 'james', text: '…I’ve read both. Every night, both.', tags: ['guilt'], evaded: true }
        ]
      },
      {
        label: 'Maria — could James ever have loved you as yourself?',
        needs: ['maria', 'mary'],
        replies: [
          { speaker: 'maria', text: 'As myself. Find me first. Peel off the parts commissioned by his grief and tell me what’s left over — and if there IS something left over, then yes, that remainder would very much have liked to find out. Next question, before I say something sincere.', tags: ['identity', 'desire'], evaded: true },
          { speaker: 'mary', text: 'For what it’s worth: the parts of her that aren’t me are the best parts. He never noticed. Men grieving a photograph rarely notice the living thing holding it.', tags: ['projection', 'love'] }
        ]
      },
      {
        label: 'Laura — did Mary ever talk about James, in the hospital?',
        needs: ['laura'],
        replies: [
          { speaker: 'laura', text: 'Once she made me promise that if he ever came looking for her, I’d tell him the letter was real.\nThat’s ALL I’m saying. The rest is private. …He cried when I told him. Good.', tags: ['love', 'memory'] }
        ]
      }
    ]
  },

  'monsters-self': {
    turns: [
      { speaker: 'james', text: 'The nurses. Somebody has to say it, so: the nurses. Three years of hospital corridors and what does this town send me? Things in uniform with… with bodies like that. I can’t even claim I don’t know what it means. I know exactly what it means. That’s the humiliating part.', tags: ['desire', 'guilt', 'illness'] },
      { speaker: 'maria', text: 'The mannequins are worse, if we’re ranking humiliations. Two bottom halves stitched together. No face, no voice, no inconvenient interiority — just parts. Somebody’s idea of a woman, assembled from the bits he was looking at.\n…I’m adjacent to that shelf, James. I try not to think about it and then I sit at tables like this one.', tags: ['desire', 'projection', 'identity'], needs: ['james'] },
      { speaker: 'eddie', text: 'Mine don’t even bother being creatures. Hanging meat. Cold storage. A bowling alley where the pins reset themselves, like somebody’s expecting league night in hell.\nEverybody else gets monsters with faces. Even my nightmares figured I wasn’t worth the modeling budget.', tags: ['punishment', 'identity'] },
      { speaker: 'mary', text: 'And the figures strapped inside their own flesh, the ones that spit acid when you get close — visit a terminal ward sometime. That’s not a monster design. That’s a patient, seen by a visitor who’s afraid of catching what she has. They’re not attacking you, James. They’re flinching.', tags: ['illness', 'violence'], needs: ['james'] },
      { speaker: 'james', text: 'So every one of them is mine. That’s the theory? The whole bestiary is just… me, printed out. Then why do they die when I hit them? If they’re part of the self, killing them should — it should feel like something. It feels like nothing. It feels like mowing a lawn.', tags: ['violence', 'denial'] },
      { speaker: 'laura', text: 'For the HUNDREDTH time: I looked everywhere and there’s nothing here. No monsters. I checked the hospital basement — which, by the way, great parenting, everybody, letting me do that.\nSo if all of you see different monsters and I see zero… maybe count what that says on your fingers. I’ll wait. It’s not hard math.', tags: ['identity', 'guilt'] },
      { speaker: 'maria', text: 'Because you’re not killing them, you’re suppressing them, and suppression always feels like chores. They come back one street later wearing the same face. You never once fought your way OUT of anything in this town, James. You fought your way further in.', tags: ['violence', 'punishment'], needs: ['james'] },
      { speaker: 'angela', text: 'Mine isn’t a monster the way you mean it. It’s a shape. It stands where the hallway light should be, and the room gets smaller and warmer, and I am nine years old for as long as it stays.\nYou put yours down with a knife or a word. Mine doesn’t die. I just got taller.', tags: ['punishment', 'memory'] },
      { speaker: 'mary', text: 'Which is why the red pyramid won’t die like the others. You can put the rest down because they’re memos — reminders of appetite, of flinching, of hospital linen. But the executioner is a verdict, and a verdict stands until the defendant stops requesting it.\nIt put its spear down when you finally said the true sentence out loud. Remember the order of events. Confession disarmed it. The knife never did.', tags: ['punishment', 'guilt', 'violence'], needs: ['james'] },
      { speaker: 'james', text: '…When I met Angela on that burning staircase, she asked if I saw the flames too. She saw fire. I saw fog. Standing in the same air.\nThat’s the answer to the exhibition’s question, isn’t it. The monsters can’t be enemies, because enemies would show up the same for everybody.', tags: ['guilt', 'identity'] },
      { speaker: 'angela', text: '…I remember that staircase differently. You looked at the fire like it wasn’t there, and for one second I hated you for it. Then I understood: we can’t even share a haunting.\nThat’s the loneliest architecture in this town. Every room is occupied by exactly one person.', tags: ['punishment', 'identity'], needs: ['james'] },
      { speaker: 'maria', text: 'So be careful what you make, out there. You heard how it works: the town takes requests. Everyone’s walking around with a bestiary in draft. Some people just never visit the printer.', tags: ['projection', 'identity'] }
    ],
    interjections: [
      {
        label: 'If the monsters are part of the self, was killing them self-harm?',
        needs: ['mary', 'james'],
        replies: [
          { speaker: 'mary', text: 'Or triage. Not every part of the self deserves preserving — ask any surgeon, or any widow. The harm wasn’t in cutting. It was in never once asking what he was cutting.', tags: ['violence', 'identity'] },
          { speaker: 'james', text: 'There’s a version of this game — of this ORDEAL — where I walk past every one of them. I never tried it. Make of that what you want. I already have.', tags: ['violence', 'guilt'] }
        ]
      },
      {
        label: 'What would YOUR monster look like — Mary? Maria?',
        needs: ['mary', 'maria'],
        replies: [
          { speaker: 'mary', text: 'A visitor. Standing in the doorway, deciding whether to come in, forever. You’d run out of ammunition before it ran out of almosts.', tags: ['illness', 'love'] },
          { speaker: 'maria', text: 'A mirror that only shows her. …I walked into mine at the hotel. It’s not in the bestiary, but I promise you it’s the strongest thing in this town.', tags: ['identity', 'projection'] }
        ]
      },
      {
        label: 'Laura — be honest. Not one single monster?',
        needs: ['laura'],
        replies: [
          { speaker: 'laura', text: 'One time a dog barked at me. That’s it. That’s the whole horror.\n…Okay, real answer? Sometimes the grown-ups here get a face like a door shutting — all of them, the same face. THAT’S scary. Monsters would be easier. You can run away from monsters.', tags: ['identity', 'projection'] }
        ]
      }
    ]
  }
}

// Items sitting on the roundtable — SH2 memorabilia, clickable.
export const TABLE_ITEMS = [
  {
    id: 'radio',
    name: 'Pocket Radio',
    blurb: 'Broken. Still transmitting, on the frequency of bad news.',
    exchange: [
      { speaker: 'james', text: 'Leave that— fine. Touch it. If it starts hissing, one of us at this table is not what they claim, and I don’t want to know the seating chart.', tags: ['denial'] },
      { speaker: 'maria', text: 'It’s pointed at me. It’s always pointed at me. …It’s a round table, Maria, nothing points anywhere. I KNOW that. Shut up.', tags: ['identity'] },
      { speaker: 'mary', text: 'Static was the last radio sound I heard too — the machines in that room had opinions all night. Somebody turn it face down. Some frequencies have earned a rest.', tags: ['illness', 'memory'] }
    ]
  },
  {
    id: 'health-drink',
    name: 'Health Drink',
    blurb: 'A nutritious drink. Restores a little strength. Tastes like regret and vitamin B.',
    exchange: [
      { speaker: 'james', text: 'I must have drunk a hundred of those. Never once checked the label. There’s a whole philosophy of this town in that sentence, if you want it.', tags: ['denial'] },
      { speaker: 'maria', text: 'He offers me one every time I get hurt. A juice box. I die, I come back, and this man hands me a beverage. …It’s also weirdly touching? Grief makes terrible nurses of us all.', tags: ['love', 'violence'] },
      { speaker: 'mary', text: 'Three years of things in cups that were "good for me." If there is a hell, it has a straw in it. Give his to Laura — growing girls can survive optimism.', tags: ['illness'] },
      { speaker: 'laura', text: 'Mary’s hospital table always had one of these. She called it "lunch, allegedly."\nIt tastes like television static. I’m allowed to say that. I’ve licked a battery.', tags: ['memory', 'illness'] }
    ]
  },
  {
    id: 'canned-juice',
    name: 'Canned Juice',
    blurb: 'An ordinary can of juice. Famously more useful thrown down a garbage chute than drunk.',
    exchange: [
      { speaker: 'james', text: 'I threw one of those down a garbage chute once. On purpose. For reasons that made complete sense at the time. That was the day I stopped asking the town to explain itself.', tags: ['denial'] },
      { speaker: 'mary', text: 'You did what?', tags: ['memory'], needs: ['james'] },
      { speaker: 'james', text: 'It dislodged a corpse. Which had a key. Look — the town has a sense of humor, it’s just filed under horror because of the lighting.', tags: ['punishment'] },
      { speaker: 'maria', text: 'And people ask why I have doubts about being a real person in a coherent universe.', tags: ['identity'] },
      { speaker: 'eddie', text: 'Hold on. There was juice, and you threw it down a chute?\n…A corpse, though. Huh. This town really does grade on a curve.', tags: ['identity'], needs: ['james'] }
    ]
  },
  {
    id: 'dog-key',
    name: 'Dog Key',
    blurb: 'A key with a dog-shaped ornament. Opens the observation room. You are not supposed to have this yet.',
    exchange: [
      { speaker: 'maria', text: 'Where did you get that. WHERE did you get that. Put it back before the shiba sees you.', tags: ['identity'] },
      { speaker: 'james', text: '…I have seen what’s behind the door that key opens. There is a dog. At a control panel. Wearing, if memory serves, headphones.\nI would trade every other answer this town gave me to unknow that one.', tags: ['identity', 'denial'] },
      { speaker: 'mary', text: 'A dog. All of this — the fog, the letter, my letter — a dog.\n…You know, of every explanation on the table tonight, it’s not even the least dignified. At least the dog seemed happy with its work.', tags: ['identity', 'memory'] },
      { speaker: 'laura', text: 'THERE’S A DOG?! Where. WHERE.\nThis is the only lead that has ever mattered. Everyone stop talking about guilt, we are going to see the dog.', tags: ['identity'] }
    ],
    curator: 'The "Dog" ending: the game mocking its own mystery. Even a story about guilt keeps one door where meaning refuses to live.'
  },
  {
    id: 'music-box',
    name: 'Little Mermaid Music Box',
    blurb: 'From the hotel lobby. It played for a love that traded its voice away.',
    exchange: [
      { speaker: 'mary', text: 'The Little Mermaid. A girl who gave up her voice for love and got dissolved into sea foam for the trouble. They put that in the honeymoon hotel lobby. Somebody on that decorating committee had range.', tags: ['love', 'memory'] },
      { speaker: 'maria', text: 'I know the tune without ever having stood in that lobby. Furnished apartment, remember. …It’s a lovely tune. I hate it very much.', tags: ['identity', 'memory'] },
      { speaker: 'james', text: 'Mary used to hum it in the car. I’d forgotten until just now. That’s the town for you — it never takes your memories. It waits, and hands them back at the worst possible moment.', tags: ['memory', 'love'] },
      { speaker: 'angela', text: 'A girl trades her voice away, and the story files it under love. Then they put it in the lobby where the honeymooners check in.\n…I keep waiting for the version where she trades the silence back.', tags: ['identity', 'love'] }
    ]
  }
]

// --------------------------------------------------------------- reflection

// Template closing lines for the Reflection Card, keyed by dominant theme.
export const REFLECTION_LINES = {
  guilt: 'You kept circling the pillow — not to watch, but to know if you would have held it too.',
  memory: 'You came back for the memories, and like everyone here, you edited as you went.',
  desire: 'You asked what wanting makes, and the town answered: it makes company, and then it makes witnesses.',
  denial: 'You noticed how many answers began with "it’s just" — and how few of them survived a second question.',
  love: 'You went looking for the love in this story and found it everywhere, mostly converted into evidence.',
  punishment: 'You kept asking who built the sentence — as if the architect and the prisoner were different people.',
  identity: 'You asked everyone here what they were, and each of them, politely, asked you back.',
  illness: 'You didn’t look away from the hospital rooms. Mary would have counted that as a visit.',
  projection: 'You studied the things this town makes from people, and began recognizing the manufacturer.',
  violence: 'You asked what the violence was for, and the honest answer never once said "survival."',
  default: 'You asked, and some of it was answered, and the rest is still out on the water.'
}

// --------------------------------------------------------------- judgment

// Pyramid Head does not converse. You speak into the room; the room answers
// once, in short sentences, and goes quiet again. Buckets are keyword-matched;
// every line is original.
export const JUDGMENTS = {
  buckets: [
    {
      match: /sorry|forgive|guilt|fault|confess|regret|apolog/i,
      lines: [
        'Apology is a sound. Sentences are served in silence.',
        'You came to be forgiven. That is not the service provided here.',
        'Say it again — without the audience, this time.'
      ]
    },
    {
      match: /why|reason|meaning|purpose/i,
      lines: [
        'You are asking the blade about the hand.',
        'Reasons are what the fog is made of. Walk further in.',
        'It was requested. The rest is paperwork.'
      ]
    },
    {
      match: /mary|love|wife|maria/i,
      lines: [
        'Her name is not a key. Stop turning it in the lock.',
        'What was loved and what was ended are kept in the same drawer. Ask who built the drawer.'
      ]
    },
    {
      match: /afraid|fear|scared|scary|kill|hurt|die|death/i,
      lines: [
        'Fear is the only honest thing you brought in with you.',
        'Nothing here will harm you beyond your instructions.',
        'The spear stays down. Today.'
      ]
    },
    {
      match: /who are you|what are you|你是|helmet|pyramid/i,
      lines: [
        'A uniform. The town issues them, on request.',
        'Yours. Entirely, patiently yours.'
      ]
    },
    {
      match: /james/i,
      lines: [
        'He requested an executioner and complains about the service.',
        'When he stopped needing me, I was permitted to stop. Remember that part.'
      ]
    }
  ],
  fallback: [
    'The town heard you. It is deciding whether you meant it.',
    'That is not a confession yet. Return when it weighs something.',
    'Noted. The fog keeps better records than this archive.',
    '…',
    'Louder. Or quieter. Either way — truer.'
  ]
}

export function judge(input) {
  for (const bucket of JUDGMENTS.buckets) {
    if (bucket.match.test(input)) {
      return bucket.lines[Math.floor(Math.random() * bucket.lines.length)]
    }
  }
  return JUDGMENTS.fallback[Math.floor(Math.random() * JUDGMENTS.fallback.length)]
}

// ---------------------------------------------------------------- secrets

// One hidden object per place — visible only under the flashlight.
// Finding one triggers a dedicated line from the person it belongs to.
export const SCENE_SECRETS = {
  toluca: {
    id: 'secret-bottle',
    name: 'A Corked Bottle',
    blurb: 'Bobbing against the dock post, glass fogged from the inside. There is paper in it. The paper is blank.',
    speaker: 'mary',
    pos: { left: '46%', top: '68%' },
    line: {
      text: 'People throw wishes into this lake and the water keeps the wish, returns the container.\nBlank, you said? …Then someone got their answer. The lake doesn’t deliver letters. It edits them.',
      tags: ['memory', 'denial'], evaded: false
    },
    curator: 'A blank page in a bottle — everything given to the lake comes back shorter. Compare the letter that summoned James.'
  },
  hospital: {
    id: 'secret-drawing',
    name: 'A Crayon Drawing',
    blurb: 'Taped low on the wall, child-height. Two stick figures holding hands by a lake. One has hospital-gown scribbles.',
    speaker: 'laura',
    pos: { left: '14%', top: '62%' },
    line: {
      text: 'HEY. I drew that! I gave it to the nurse to put in Mary’s room and she— this is NOT Mary’s room!\n…The tall one is Mary. The other one is me. I put the lake in because she wouldn’t stop talking about it.\nDon’t touch it. I’m taking it to her myself now.',
      tags: ['love', 'memory'], evaded: false
    },
    curator: 'Taped at child-height, below every adult sightline: the hospital as an eight-year-old archives it.'
  },
  room312: {
    id: 'secret-ring',
    name: 'A Wedding Ring',
    blurb: 'Under the bed, against the skirting board, exactly where rolled things go to be forgotten on purpose.',
    speaker: 'james',
    pos: { left: '24%', top: '82%' },
    line: {
      text: '…I told everyone I lost it on the boat. Slipped off in the cold water. That was the story.\nIt was under the bed. The whole time. Of course it was under the bed.\nThings roll toward the truth in this room. I would appreciate it if you put that back.',
      tags: ['guilt', 'denial', 'love'], evaded: false
    },
    curator: 'He removed it before the end and misfiled the memory as an accident — the room keeps the receipt.'
  }
}

// ---------------------------------------------------------------- doubting

// "I don't believe you." — challenge the last thing said.
// If the line really was evasive, the character cracks; if it was true,
// you get rebuffed. Two of each per character, rotated.
export const DOUBT_LINES = {
  james: {
    caught: [
      { text: '…You heard the static, didn’t you. That damn radio has never once been on my side.\nFine. It wasn’t the whole of it. Ask again — I’ll do worse at lying this time.', tags: ['denial', 'guilt'] },
      { text: 'Alright. Alright.\nWhat I said wasn’t false, it was just… wearing a coat. Take the coat off it and ask me again.', tags: ['denial'] }
    ],
    rebuff: [
      { text: 'That one was true. I know the difference — the true ones hurt on the way out.', tags: [] },
      { text: 'Believe what you want. The lake doesn’t care, and neither does the tape.', tags: [] }
    ]
  },
  maria: {
    caught: [
      { text: 'Caught me. God, you’re no fun — or you’re exactly fun, I can’t decide.\nYes. That was a dodge. A girl keeps SOME doors shut.', tags: ['identity'] },
      { text: 'Mm. The static gave me away? Traitor machine.\nFine — press me again. And this time look me in the eye while you do it.', tags: ['desire'] }
    ],
    rebuff: [
      { text: 'Wrong. That one was the truth, sweetheart. I know it’s hard to tell with me — that’s the whole tragedy, isn’t it.', tags: [] },
      { text: 'Doubt suits you. But no — that one I meant. Every word.', tags: [] }
    ]
  },
  mary: {
    caught: [
      { text: 'You caught that? …Good.\nEven dead women keep a few polite fictions running. Ask me again, plainly, and I’ll answer plainly.', tags: ['memory'] },
      { text: 'Yes, I stepped around it. Illness teaches you to ration the truth like medicine.\nAsk again. I have some left.', tags: ['illness'] }
    ],
    rebuff: [
      { text: 'No. That was true. I don’t have enough time left — in any sense — to waste on lying.', tags: [] },
      { text: 'You doubt the wrong ones. It’s the pleasant-sounding answers you should be checking.', tags: [] }
    ]
  },
  angela: {
    caught: [
      { text: '…You noticed. Most people are relieved when I change the subject. It lets everyone off.\nI won’t say more about it. But you were right, and I won’t pretend you weren’t.', tags: ['punishment'] },
      { text: '…Yes. There’s a door in that answer I keep shut.\nNoticing it is allowed. Opening it is not.', tags: ['identity'] }
    ],
    rebuff: [
      { text: 'That was true. I don’t lie. I just… stop.\nThere’s a difference, and you accused me of the wrong one.', tags: [] },
      { text: 'No. I said it plain because it cost me to say it plain. Don’t make me pay twice.', tags: [] }
    ]
  },
  eddie: {
    caught: [
      { text: 'Okay — OKAY. So maybe the wrong-turn story has a couple of missing streets. You want a medal, detective?', tags: ['denial'] },
      { text: 'Heh. Yeah. You got me.\nEverybody back home swallowed that one whole, you know. You’re the first to spit it out.', tags: ['identity'] }
    ],
    rebuff: [
      { text: 'That was TRUE, man! I tell one straight thing and get called a liar — you see?? This is EXACTLY what I’m talking about!', tags: [] },
      { text: 'Nope. True story. I only lie about the stuff that matters.', tags: [] }
    ]
  },
  laura: {
    caught: [
      { text: 'UGH. Fine. I wasn’t telling the WHOLE thing.\nKids are allowed to have secrets. It’s basically the one thing we get.', tags: ['memory'] },
      { text: 'How did you—?! Okay okay okay.\nBut I’m still not telling the rest. It’s Mary’s and mine.', tags: ['love'] }
    ],
    rebuff: [
      { text: 'That was TRUE! You can’t just go around not believing eight-year-olds. It’s RUDE. Apologize to my face.', tags: [] },
      { text: 'Wrong! I never lie. I just yell true stuff loudly.', tags: [] }
    ]
  }
}

// ---------------------------------------------------------------- pockets

// Things you can carry and show to people. Every character reacts to
// every item differently — and some reactions are themselves evasions.
export const POCKET_ITEMS = {
  'secret-ring':    { name: 'The Wedding Ring' },
  'secret-bottle':  { name: 'The Corked Bottle' },
  'secret-drawing': { name: 'The Crayon Drawing' },
  'dog-key':        { name: 'The Dog Key' }
}

export const ITEM_REACTIONS = {
  'secret-ring': {
    james: { text: '…Where did— give me that. No. Don’t give me that.\nI already told the lake one story about this ring. I don’t have a second one prepared. Put it away. Please.', tags: ['guilt', 'denial'], evaded: true },
    maria: { text: 'A ring. His?\n…It’s lighter than I imagined. You’d think a thing like this would weigh what it means.\nTake it back before I try it on. I mean it. Take it back.', tags: ['desire', 'identity'], evaded: false },
    mary: { text: 'Oh.\nHe said it went into the lake. I attended the little performance where he said it.\nUnder the bed, then. That’s almost worse than the lie — the lake at least would have been a decision.', tags: ['love', 'guilt', 'memory'], evaded: false },
    angela: { text: 'People take them off for reasons. Sometimes bad ones. Sometimes survival ones.\nI’m not going to ask which his was. Neither answer would surprise me, and I’m tired of not being surprised.', tags: ['punishment', 'identity'], evaded: false },
    eddie: { text: 'Married people, man. You spend your whole life wishing somebody would put a ring on you, and these people have them rolling under FURNITURE.', tags: ['identity'], evaded: false },
    laura: { text: 'That’s Mary’s! No, wait — that’s the OTHER one. His.\nMary still wore hers in the hospital. It got too big for her finger so she taped it on. TAPED it.\nThink about that, and then look at where this one was.', tags: ['love', 'memory'], evaded: false }
  },
  'secret-bottle': {
    james: { text: 'The paper’s blank.\n…Of course it’s blank. Everything this lake returns comes back blank.\nAsk me how I know. Don’t— don’t actually ask me how I know.', tags: ['denial', 'memory'], evaded: true },
    maria: { text: 'A message with no message. The lake has my sense of humor.\nOr it said something once, and the water disagreed. Editing is this town’s entire personality.', tags: ['projection', 'identity'], evaded: false },
    mary: { text: 'I used to want to do this — the bottle, the wish, the whole postcard gesture. I never did.\nHospitals don’t stock bottles. And by the end, I didn’t trust the lake with anything I actually meant.', tags: ['memory', 'illness'], evaded: false },
    angela: { text: 'Someone asked the water for something, and this is what came back.\nKeep it corked. Empty answers are still answers. That’s the part nobody warns you about.', tags: ['punishment'], evaded: false },
    eddie: { text: 'You found a bottle with NOTHING in it, and you kept it?\n…Yeah, alright. It’s the thought that counts. Story of my life, in a jar.', tags: ['identity'], evaded: false },
    laura: { text: 'BORING. Unless— hold on. Invisible ink! Lemon juice! Mary showed me that trick.\nGet me a candle. If this says something and you almost threw it away, you owe me a soda.', tags: ['love', 'memory'], evaded: false }
  },
  'secret-drawing': {
    james: { text: '…Two of them, by the lake. She kept this on the nightstand for a week. The nurses moved it when—\nI didn’t know it survived. Crayon outlasts everything in that building. Somebody should study that.', tags: ['memory', 'love'], evaded: false },
    maria: { text: 'That’s the kid. And that’s… her.\nEven in crayon, it’s her. Even in CRAYON.\nWonderful. I have been out-portraited by an eight-year-old.', tags: ['identity', 'projection'], evaded: false },
    mary: { text: 'She put the lake in it. I talked about the lake too much, and she was listening — she was always listening, that child, especially while pretending not to.\nI meant to say a proper goodbye to her. This will have to hold the place of it.', tags: ['love', 'memory'], evaded: false },
    angela: { text: 'A child drew two people holding hands, and the building filed it against a wall where nobody looks.\nThat’s this whole town on one sheet of paper, if you ask me.', tags: ['punishment', 'memory'], evaded: false },
    eddie: { text: 'Kid’s got better lines than me, and I don’t even mean the drawing.\n…Nobody ever drew me, that I know of. You’d remember a thing like that. Somebody drawing you.', tags: ['identity'], evaded: false },
    laura: { text: 'GIVE IT. That is evidence, property of Laura, and the nurse who lost it is getting yelled at.\n…It’s good, right? The tall one’s Mary. I gave her a smile because she had a good one, when she tried.', tags: ['love', 'memory'], evaded: false }
  },
  'dog-key': {
    james: { text: 'Why do you have that. Why do you STILL have that.\nSome doors are jokes, and the joke is on whoever opens them twice.', tags: ['denial'], evaded: false },
    maria: { text: 'Put it away before the dog notices.\nI refuse — REFUSE — to have my existential crisis administrated by a shiba.', tags: ['identity'], evaded: false },
    mary: { text: 'The dog key. James told me about the dog once, like a confession.\nIt was the only story from this town that ever made me laugh. Keep it. Some evidence is medicinal.', tags: ['memory', 'love'], evaded: false },
    angela: { text: '…A dog. Behind everything, a dog.\nI’ve been asked to accept worse explanations, with less proof. At least the dog seems employed.', tags: ['identity'], evaded: false },
    eddie: { text: 'A DOG runs this place? A dog with a JOB?\nThat dog has a career, and I got banned from a bowling league. This town really does keep score.', tags: ['punishment', 'identity'], evaded: false },
    laura: { text: 'The dog key!! You KEPT it!\nOkay. New plan. We find the door, we open it, I get the dog, and everyone else can keep having their sad feelings.', tags: ['identity'], evaded: false }
  }
}
