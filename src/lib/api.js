// Streaming chat client. Calls the local proxy, yields text chunks,
// and parses the trailing [[tags: ... | evaded: ...]] marker.

export function parseMarker(fullText) {
  const m = fullText.match(/\[\[\s*tags:\s*([^|\]]*)\|\s*evaded:\s*(yes|no)\s*\]\]/i)
  const tags = m ? m[1].split(',').map(t => t.trim().toLowerCase()).filter(Boolean) : []
  const evaded = m ? m[2].toLowerCase() === 'yes' : false
  const clean = fullText.replace(/\[\[\s*tags:[\s\S]*?\]\]\s*$/i, '').trim()
  // Pull out curator notes (lines starting with CURATOR NOTE:)
  let curator = null
  const lines = clean.split('\n').filter(line => {
    const isNote = /^\s*CURATOR NOTE:/i.test(line)
    if (isNote) curator = line.replace(/^\s*CURATOR NOTE:\s*/i, '').trim()
    return !isNote
  })
  return { text: lines.join('\n').trim(), tags, evaded, curator }
}

// Strip any partially-streamed marker/note so it never flashes on screen.
export function displayText(raw) {
  return raw.replace(/\[\[[\s\S]*$/, '').replace(/CURATOR NOTE:[\s\S]*$/i, '')
}

export async function streamChat(payload, onDelta) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok || !res.headers.get('content-type')?.includes('text/event-stream')) {
    throw new Error(`The archive is unreachable right now (${res.status}).`)
  }
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop()
    for (const ev of events) {
      const line = ev.trim()
      if (!line.startsWith('data:')) continue
      const data = JSON.parse(line.slice(5))
      if (data.error) {
        throw new Error(data.error === 'no_api_key'
          ? 'The fog does not answer. (No API key configured — see README.)'
          : data.error)
      }
      if (data.t) {
        full += data.t
        onDelta(displayText(full))
      }
    }
  }
  if (!full.trim()) throw new Error('The fog swallowed the answer. Try again.')
  return parseMarker(full)
}

export async function fetchReflection(stats) {
  try {
    const res = await fetch('/api/reflect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stats })
    })
    const data = await res.json()
    return data.line
  } catch {
    return null
  }
}
