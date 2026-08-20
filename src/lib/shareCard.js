// Render the Reflection Card to a downloadable PNG — hand-drawn on canvas
// so the demo stays fully static (no html-to-image dependency).

const W = 720
const H = 960
const PAPER = '#cfc8b6'
const INK = '#23241f'
const RED = '#6e2a20'

function wrap(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const w of words) {
    const test = line ? line + ' ' + w : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

function spaced(s, gap = ' ') {
  return s.split('').join(gap)
}

export async function exportCard({ ending, topThemes, evasiveName, evasiveCount, placeNames, objectCount, line }) {
  // make sure the display fonts are ready before drawing
  try {
    await Promise.all([
      document.fonts.load('28px "Special Elite"'),
      document.fonts.load('20px "EB Garamond"'),
      document.fonts.load('12px "IBM Plex Mono"')
    ])
  } catch { /* draw with fallbacks */ }

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // paper + subtle aging
  ctx.fillStyle = PAPER
  ctx.fillRect(0, 0, W, H)
  const age = ctx.createRadialGradient(W * 0.2, H * 0.1, 60, W * 0.5, H * 0.5, H * 0.8)
  age.addColorStop(0, 'rgba(0,0,0,0.02)')
  age.addColorStop(1, 'rgba(0,0,0,0.08)')
  ctx.fillStyle = age
  ctx.fillRect(0, 0, W, H)
  // speckle grain
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = `rgba(35,36,31,${Math.random() * 0.05})`
    ctx.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4)
  }
  // double border
  ctx.strokeStyle = 'rgba(35,36,31,0.4)'
  ctx.lineWidth = 2
  ctx.strokeRect(26, 26, W - 52, H - 52)
  ctx.lineWidth = 1
  ctx.strokeRect(36, 36, W - 72, H - 72)

  ctx.textAlign = 'center'
  let y = 110

  // header
  ctx.fillStyle = INK
  ctx.font = '30px "Special Elite", monospace'
  ctx.fillText(spaced('REFLECTION CARD'), W / 2, y)
  y += 28
  ctx.font = '12px "IBM Plex Mono", monospace'
  ctx.fillStyle = 'rgba(35,36,31,0.6)'
  ctx.fillText('A F T E R   T H E   F O G   ·   V I S I T O R   R E C O R D', W / 2, y)
  y += 52

  // verdict box
  ctx.strokeStyle = 'rgba(35,36,31,0.4)'
  ctx.strokeRect(76, y - 26, W - 152, 168)
  ctx.font = '11px "IBM Plex Mono", monospace'
  ctx.fillStyle = 'rgba(35,36,31,0.55)'
  ctx.fillText('THE FOG HAS REACHED A VERDICT', W / 2, y)
  y += 52
  ctx.font = '46px "Special Elite", monospace'
  ctx.fillStyle = ending.id === 'dog' ? '#7a5c28' : RED
  ctx.fillText(spaced(ending.title), W / 2, y)
  y += 36
  ctx.font = 'italic 19px "EB Garamond", serif'
  ctx.fillStyle = INK
  for (const l of wrap(ctx, ending.line, W - 200)) {
    ctx.fillText(l, W / 2, y)
    y += 26
  }
  y += 44

  // stats
  const stat = (label, value) => {
    ctx.font = '11px "IBM Plex Mono", monospace'
    ctx.fillStyle = 'rgba(35,36,31,0.55)'
    ctx.fillText(label.toUpperCase(), W / 2, y)
    y += 26
    ctx.font = '21px "EB Garamond", serif'
    ctx.fillStyle = INK
    for (const l of wrap(ctx, value, W - 180)) {
      ctx.fillText(l, W / 2, y)
      y += 26
    }
    y += 20
  }
  stat('Themes circled', topThemes.length ? topThemes.join(' · ') : '—')
  stat('Most evasive', evasiveName ? `${evasiveName} (${evasiveCount} deflected)` : 'No one evaded you. Or no one was pressed.')
  stat('Places entered', placeNames.length ? placeNames.join(' · ') : '—')
  stat('Objects touched', String(objectCount || '—'))

  // closing line
  y += 8
  ctx.strokeStyle = 'rgba(35,36,31,0.35)'
  ctx.beginPath(); ctx.moveTo(110, y); ctx.lineTo(W - 110, y); ctx.stroke()
  y += 40
  ctx.font = 'italic 20px "EB Garamond", serif'
  ctx.fillStyle = INK
  for (const l of wrap(ctx, line, W - 180)) {
    ctx.fillText(l, W / 2, y)
    y += 27
  }

  // stamp + footer
  ctx.font = '15px "Special Elite", monospace'
  ctx.fillStyle = RED
  ctx.fillText(spaced('— IN MY RESTLESS DREAMS —'), W / 2, H - 116)
  ctx.font = '10px "IBM Plex Mono", monospace'
  ctx.fillStyle = 'rgba(35,36,31,0.5)'
  ctx.fillText('AFTER THE FOG — A NON-COMMERCIAL FAN STUDY. NOT AFFILIATED WITH KONAMI.', W / 2, H - 62)

  // download
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `after-the-fog-${ending.id}-card.png`
  a.click()
}
