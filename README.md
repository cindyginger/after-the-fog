# After the Fog

*A post-game conversation space for Silent Hill 2.*

After the Fog is an AI-powered narrative exhibition inspired by Silent Hill 2.
Instead of explaining the game through a traditional essay or walkthrough, the
project lets players speak with character personas, revisit symbolic locations,
and listen to characters debate the meaning of their own story. The prototype
explores how generative AI can become a new interface for game criticism,
emotional interpretation, and post-play reflection.

> A non-commercial fan study. Not affiliated with Konami.
> No original game assets or verbatim dialogue are used.

## What's inside

- **Characters** — solo conversations with James, Maria, and Mary. Each persona
  is designed around a psychology, memory boundaries, and an evasion strategy —
  not just a tone of voice. James deflects before he confesses; Maria turns
  questions back on you; Mary corrects your romanticization.
- **Places** — atmospheric memory-spaces (Toluca Lake, Brookhaven Hospital,
  Room 312) with touchable objects. Touch the videotape and ask who answers.
- **Roundtable** — pick a question ("What is Silent Hill?") and the three of
  them argue it among themselves. You can interrupt at any time.
- **Reflection Card** — the archive tracks which themes your questions circled
  (guilt, memory, denial…), who evaded you most, and closes your visit with a
  generated one-line reading.

## Setup

```bash
npm install
npm run dev            # vite on :5173 — no API key, no backend needed
```

Production: `npm run build` → `dist/` is a fully static site, deployable to
GitHub Pages / Netlify / Vercel as-is.

## Two dialogue modes

The demo currently runs in **scripted mode**: every character response is
hand-written (`src/data/script.js`) as a branching dialogue tree — questions
unlock follow-ups, scene objects and roundtable items trigger multi-voice
exchanges, and each line carries theme tags and an "evaded" flag that feed the
Reflection Card. Zero cost, fully static, shareable by link.

Characters are rendered as original SVG portraits that breathe, blink, and
move their mouths in sync with the typewriter text. Each has a theme color
matched to their psychology: James a cold moss-green, Maria a rust-rose,
Mary a pale hospital blue. The roundtable is a physical table — candlelit,
with clickable SH2 memorabilia on it (including one very important dog key).

The original **AI mode** (live Claude API generation) is preserved in
`server/` — persona design, streaming proxy, and the self-tagging marker
protocol are documented below and can be re-enabled by restoring the API
calls in the pages.

## How the AI layer works (archived design)

- Each character has a **persona file** (`server/personas.js`): identity, voice,
  core psychology, conversational strategy, relationships, and hard boundaries
  (no graphic detail, no real-world medical/therapeutic advice, restraint on
  trauma). A shared rule layer handles the exhibition frame, meta-questions,
  and "Curator Note" behavior.
- Every reply ends with a hidden machine-read marker
  `[[tags: guilt, memory | evaded: yes]]` — the model self-reports which themes
  it touched and whether the character dodged the question. The UI strips the
  marker, lights up theme tags in the right rail, and feeds the Reflection Card.
  The character may lie; the marker doesn't.
- Scenes and roundtables flatten the multi-speaker transcript into a single
  context block per turn, so any character can respond to any moment.

## Design notes

Visual direction: psychological archive + museum guide, not horror UI.
Fog layers, film grain, a cold grey-green palette, one dried-rust accent,
typewriter headers over old-paper serif. No gore, no jump scares —
the register is restraint, ambiguity, silence.
