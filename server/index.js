import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystem, PERSONAS } from './personas.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json({ limit: '1mb' }))

const MODEL = process.env.ATF_MODEL || 'claude-sonnet-5'
const PORT = process.env.API_PORT || 8787

function client() {
  if (!process.env.ANTHROPIC_API_KEY) return null
  return new Anthropic()
}

// Solo chat: messages alternate user/assistant.
// Scene & roundtable: transcript is flattened into a single user turn so
// multiple speakers don't fight the alternating-roles requirement.
function buildMessages(body) {
  const { mode, messages, transcript, characterId } = body
  if (mode === 'roundtable' || mode === 'scene') {
    const name = PERSONAS[characterId].name.split(' ')[0].toUpperCase()
    const lines = (transcript || [])
      .map(t => `${t.speaker.toUpperCase()}: ${t.text}`)
      .join('\n')
    return [{
      role: 'user',
      content: `Transcript so far:\n${lines || '(no one has spoken yet)'}\n\nRespond now as ${name}. Output only your reply (no name prefix).`
    }]
  }
  // solo
  return (messages || []).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.text
  }))
}

app.post('/api/chat', async (req, res) => {
  const anthropic = client()
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  if (!anthropic) {
    res.write(`data: ${JSON.stringify({ error: 'no_api_key' })}\n\n`)
    return res.end()
  }

  try {
    const system = buildSystem(req.body)
    const messages = buildMessages(req.body)
    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 700,
      system,
      messages
    })
    stream.on('text', (t) => {
      res.write(`data: ${JSON.stringify({ t })}\n\n`)
    })
    stream.on('end', () => {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
      res.end()
    })
    stream.on('error', (e) => {
      console.error(e)
      res.write(`data: ${JSON.stringify({ error: String(e.message || e) })}\n\n`)
      res.end()
    })
    req.on('close', () => stream.abort())
  } catch (e) {
    console.error(e)
    res.write(`data: ${JSON.stringify({ error: String(e.message || e) })}\n\n`)
    res.end()
  }
})

app.post('/api/reflect', async (req, res) => {
  const anthropic = client()
  if (!anthropic) return res.status(200).json({ line: null })
  try {
    const { stats } = req.body
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 200,
      system: `You write the closing line of a "Reflection Card" for After the Fog,
an exhibition about Silent Hill 2. Given statistics about a visitor's
conversations, write ONE sentence (max ~30 words) in a quiet, literary,
second-person voice that names what the visitor seemed to be circling.
Restrained, no horror clichés, no exclamation marks. Output only the sentence.`,
      messages: [{ role: 'user', content: JSON.stringify(stats) }]
    })
    res.json({ line: msg.content[0].text.trim() })
  } catch (e) {
    console.error(e)
    res.json({ line: null })
  }
})

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '..', 'dist')
  app.use(express.static(dist))
  app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => {
  console.log(`[after-the-fog] api listening on :${PORT} (model: ${MODEL}, key: ${process.env.ANTHROPIC_API_KEY ? 'set' : 'MISSING'})`)
})
