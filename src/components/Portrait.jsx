// Painted-archive style character portraits, fully original SVG.
// Half-lit, low-saturation. Each face is built from shared geometry but
// with its own skin tone, eye shape, brows, mouth and detailing, so the
// six of them read as six different people at a glance.
// Portraits breathe, blink, and move their mouths while their line types.

const INK = '#181b17'

// Per-character skin: base / shadow / eyelid tint
const SKINS = {
  james:  { base: '#a2947c', dk: '#75664f' },
  maria:  { base: '#c4aa8f', dk: '#94765c' },
  mary:   { base: '#b7afa2', dk: '#867d6e' },
  angela: { base: '#a99d85', dk: '#786b54' },
  eddie:  { base: '#c9a88b', dk: '#987257' },
  laura:  { base: '#cdb69a', dk: '#9c866b' }
}

function Head({ sid }) {
  return (
    <path
      d="M100,50 C123,50 135,69 135,94 C135,113 127,129 114,137 C109,141 105,143.5 100,143.5 C95,143.5 91,141 86,137 C73,129 65,113 65,94 C65,69 77,50 100,50 Z"
      fill={`url(#skin-${sid})`}
    />
  )
}

function Neck({ sid }) {
  const s = SKINS[sid]
  return (
    <g>
      <path d="M89,136 L89,162 L111,162 L111,136 Q100,146 89,136 Z" fill={s.base} />
      <path d="M89,138 Q100,148 111,138 L111,148 Q100,154 89,148 Z" fill={INK} opacity="0.22" />
    </g>
  )
}

// Mouth variants — corners vs center decide the temperament.
const MOUTHS = {
  soft:  'M88,126.5 Q100,130.5 112,126.5',
  smile: 'M88,125 Q100,132.5 112,125',
  flat:  'M89,127.5 Q100,128.5 111,127.5',
  frown: 'M88,128.5 Q100,123.5 112,128.5',
  pout:  'M92,127 Q100,131 108,127',
  full:  'M87,126 Q100,132 113,126'
}

function Face({
  sid, browL, browR, irisR = 3.1, lid = 0,
  mouth = 'soft', mouthTone = '#5f4a3f', lipFill = null,
  gaunt = false, blush = null, eyeShadow = false, beautyMark = false, stubble = false
}) {
  const s = SKINS[sid]
  return (
    <g>
      {/* optional make-up / pallor around the eyes */}
      {eyeShadow && (
        <g fill="#6a4456" opacity="0.32">
          <ellipse cx="83" cy="91" rx="9" ry="4.4" />
          <ellipse cx="117" cy="91" rx="9" ry="4.4" />
        </g>
      )}
      {/* eyes */}
      <g>
        <path d="M73,94 Q83,89 93,94 Q83,98.5 73,94 Z" fill="#c8bda9" opacity="0.9" />
        <path d="M107,94 Q117,89 127,94 Q117,98.5 107,94 Z" fill="#c8bda9" opacity="0.9" />
        <circle cx="83" cy="94" r={irisR} fill="#3c3e36" />
        <circle cx="117" cy="94" r={irisR} fill="#3c3e36" />
        <circle cx="83" cy="94" r={irisR * 0.42} fill={INK} />
        <circle cx="117" cy="94" r={irisR * 0.42} fill={INK} />
        <path d="M72,93 Q83,88 94,93" fill="none" stroke={s.dk} strokeWidth="1.6" />
        <path d="M106,93 Q117,88 128,93" fill="none" stroke={s.dk} strokeWidth="1.6" />
        {/* permanent heavy lids — tiredness */}
        {lid > 0 && (
          <g fill={s.base} opacity="0.95">
            <path d={`M72,90 Q83,${87 + lid * 5} 94,90 L94,87 Q83,84 72,87 Z`} />
            <path d={`M106,90 Q117,${87 + lid * 5} 128,90 L128,87 Q117,84 106,87 Z`} />
          </g>
        )}
        {/* blink */}
        <rect className="blink" x="71" y="88" width="24" height="9" rx="4" fill={s.base} />
        <rect className="blink" x="105" y="88" width="24" height="9" rx="4" fill={s.base} />
        {/* under-eye */}
        <path d="M75,99 Q83,102 91,99" fill="none" stroke={s.dk} strokeWidth="1" opacity="0.55" />
        <path d="M109,99 Q117,102 125,99" fill="none" stroke={s.dk} strokeWidth="1" opacity="0.55" />
      </g>
      {/* brows */}
      <path d={browL} fill="none" stroke="#4e4437" strokeWidth="2.4" strokeLinecap="round" />
      <path d={browR} fill="none" stroke="#4e4437" strokeWidth="2.4" strokeLinecap="round" />
      {/* nose */}
      <path d="M100,97 L97,112 Q99,115.5 104,113.5" fill="none" stroke={s.dk} strokeWidth="1.4" opacity="0.75" />
      {/* gaunt cheek hollows */}
      {gaunt && (
        <g stroke={s.dk} strokeWidth="1.6" opacity="0.5" fill="none">
          <path d="M76,112 Q81,120 79,127" />
          <path d="M124,112 Q119,120 121,127" />
        </g>
      )}
      {/* blush / flush */}
      {blush && (
        <g fill={blush.color} opacity={blush.opacity}>
          <ellipse cx="81" cy="111" rx="7" ry="4" />
          <ellipse cx="119" cy="111" rx="7" ry="4" />
        </g>
      )}
      {/* mouth — closed variant vs animated open mouth */}
      <g className="mouth">
        <g className="mouth-closed">
          {lipFill && (
            <path d="M87,126 Q94,122.5 100,125 Q106,122.5 113,126 Q100,133.5 87,126 Z" fill={lipFill} opacity="0.9" />
          )}
          <path d={MOUTHS[mouth]} fill="none" stroke={mouthTone} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M91,132.5 Q100,135 109,132.5" fill="none" stroke={s.dk} strokeWidth="1" opacity="0.45" />
        </g>
        <g className="mouth-open">
          <ellipse cx="100" cy="129" rx="8.5" ry="5.5" fill="#3c2b26" />
          <path d="M92,127 Q100,124.5 108,127" fill="none" stroke={lipFill || mouthTone} strokeWidth="1.8" />
        </g>
      </g>
      {beautyMark && <circle cx="110.5" cy="119.5" r="1.2" fill={INK} opacity="0.8" />}
      {stubble && (
        <path d="M82,124 Q100,140 118,124 Q116,136 100,141 Q84,136 82,124 Z" fill="#5d5340" opacity="0.32" />
      )}
      {/* jaw shadow */}
      <path d="M84,138 Q100,146 116,138 L112,142 Q100,149 88,142 Z" fill={INK} opacity="0.18" />
    </g>
  )
}

function HalfLight() {
  return <path d="M100,44 C126,46 138,70 136,96 C135,116 127,131 114,139 L110,160 L128,168 L146,240 L100,240 Z" fill="url(#shade-grad)" opacity="0.5" />
}

const FIGURES = {
  james: (
    <g>
      <Neck sid="james" />
      {/* army jacket, collar up */}
      <path d="M28,240 C32,196 55,172 84,163 L100,172 L116,163 C145,172 168,196 172,240 Z" fill="#46523e" />
      <path d="M84,163 L100,172 L92,192 L74,172 Z" fill="#39442f" />
      <path d="M116,163 L100,172 L108,192 L126,172 Z" fill="#39442f" />
      <path d="M78,160 L88,142 L92,166 Z M122,160 L112,142 L108,166 Z" fill="#3f4a36" />
      <path d="M96,174 L100,172 L104,174 L103,240 L97,240 Z" fill="#2c3526" />
      <path d="M88,168 Q100,176 112,168 L112,178 Q100,186 88,178 Z" fill="#68675c" />
      <Head sid="james" />
      <Face
        sid="james"
        browL="M71,86 Q82,82 94,85" browR="M106,85 Q118,82 129,86"
        irisR={3} lid={0.85} mouth="flat" mouthTone="#57422f" stubble
      />
      {/* short blond hair, flattened and tired */}
      <path d="M63,98 C58,58 78,40 100,40 C122,40 142,58 137,98 L131,96 C134,66 119,52 100,52 C81,52 66,66 69,96 Z" fill="#93805a" />
      <path d="M69,88 C74,64 86,55 100,56 C116,55 127,66 131,88 C123,70 112,63 100,65 C87,63 76,72 69,88 Z" fill="#a08a5f" />
      <path d="M76,66 L82,58 M92,60 L96,52 M110,58 L116,64 M124,68 L130,62" stroke="#7c6b48" strokeWidth="1.4" opacity="0.8" />
    </g>
  ),
  maria: (
    <g>
      <path d="M58,102 C55,50 79,34 100,34 C121,34 145,50 142,102 C144,132 138,154 127,166 L115,152 L85,152 L73,166 C62,154 56,132 58,102 Z" fill="#a8853f" />
      <path d="M60,102 C58,54 80,38 100,38 C120,38 142,54 140,102 C141,126 136,146 128,158 C124,146 122,136 122,128 L78,128 C78,136 76,146 72,158 C64,146 59,126 60,102 Z" fill="#c2a45c" />
      <Neck sid="maria" />
      <path d="M78,168 L100,178 L122,168 L128,240 L72,240 Z" fill="#8a7442" />
      <g fill="#4a3c22">
        <ellipse cx="88" cy="192" rx="3" ry="2.2" /><ellipse cx="103" cy="200" rx="2.6" ry="2" />
        <ellipse cx="114" cy="186" rx="2.8" ry="2.2" /><ellipse cx="95" cy="214" rx="3" ry="2.4" />
        <ellipse cx="112" cy="222" rx="2.6" ry="2" /><ellipse cx="84" cy="228" rx="2.4" ry="2" />
      </g>
      <path d="M26,240 C30,196 52,174 80,165 L88,172 L80,240 Z" fill="#87445a" />
      <path d="M174,240 C170,196 148,174 120,165 L112,172 L120,240 Z" fill="#87445a" />
      <path d="M80,165 L88,172 L84,196 L70,180 Z" fill="#6e3549" />
      <path d="M120,165 L112,172 L116,196 L130,180 Z" fill="#6e3549" />
      <rect x="89" y="150" width="22" height="6" rx="2" fill="#2a2320" />
      <circle cx="100" cy="158" r="2.4" fill="#c2a45c" />
      <Head sid="maria" />
      <Face
        sid="maria"
        browL="M73,83.5 Q83,78.5 93,83" browR="M107,83 Q117,78.5 127,83.5"
        irisR={3.3} mouth="full" mouthTone="#7c3a48" lipFill="#96434f"
        eyeShadow beautyMark
        blush={{ color: '#b06060', opacity: 0.18 }}
      />
      <path d="M64,86 C68,54 84,46 102,47 C120,48 132,60 136,86 C128,64 112,58 96,63 C80,66 70,72 64,86 Z" fill="#caa95e" />
      <path d="M120,58 C130,66 134,78 135,90 L128,88 C128,76 124,66 120,58 Z" fill="#b3924c" />
      <circle cx="64" cy="112" r="2.6" fill="#c9c2b2" />
    </g>
  ),
  mary: (
    <g>
      <path d="M60,104 C56,52 80,36 100,36 C120,36 144,52 140,104 C142,132 136,152 126,162 L114,150 L86,150 L74,162 C64,152 58,132 60,104 Z" fill="#4c3c30" />
      <path d="M62,104 C60,56 82,40 100,40 C118,40 140,56 138,104 C139,126 134,144 127,154 C123,144 121,134 121,126 L79,126 C79,134 77,144 73,154 C66,144 61,126 62,104 Z" fill="#5d4a3a" />
      <Neck sid="mary" />
      <path d="M28,240 C32,198 54,175 83,166 L100,176 L117,166 C146,175 168,198 172,240 Z" fill="#71858f" />
      <path d="M83,166 L100,176 L91,184 L76,173 Z" fill="#c4bfae" />
      <path d="M117,166 L100,176 L109,184 L124,173 Z" fill="#c4bfae" />
      <circle cx="100" cy="192" r="1.6" fill="#3f4a50" />
      <circle cx="100" cy="206" r="1.6" fill="#3f4a50" />
      <circle cx="100" cy="220" r="1.6" fill="#3f4a50" />
      <Head sid="mary" />
      <Face
        sid="mary"
        browL="M73,86 Q83,83.5 93,85.5" browR="M107,85.5 Q117,83.5 127,86"
        irisR={3} lid={0.5} mouth="soft" mouthTone="#7d675c" gaunt
      />
      <path d="M100,44 C84,45 70,58 66,88 C74,64 86,57 99,58 L100,50 Z" fill="#66513f" />
      <path d="M100,44 C116,45 130,58 134,88 C126,64 114,57 101,58 L100,50 Z" fill="#66513f" />
      <path d="M100,44 L100,58" stroke="#443528" strokeWidth="1.2" />
    </g>
  ),
  angela: (
    <g>
      <path d="M62,100 C58,50 80,36 100,36 C120,36 142,50 138,100 C140,124 136,142 128,150 L118,140 L82,140 L72,150 C64,142 60,124 62,100 Z" fill="#33281f" />
      <path d="M64,100 C61,54 82,40 100,40 C118,40 139,54 136,100 C137,120 133,136 127,144 C123,134 121,126 121,120 L79,120 C79,126 77,134 73,144 C67,136 63,120 64,100 Z" fill="#453329" />
      <Neck sid="angela" />
      <path d="M30,240 C34,198 56,176 84,168 L100,176 L116,168 C144,176 166,198 170,240 Z" fill="#5c5a44" />
      <path d="M84,144 L116,144 L118,166 Q100,176 82,166 Z" fill="#514f3c" />
      <path d="M84,150 L116,150" stroke="#403e2f" strokeWidth="2" />
      <path d="M84,157 L116,157" stroke="#403e2f" strokeWidth="1.6" opacity="0.8" />
      <path d="M92,182 L90,240 M108,182 L110,240" stroke="#4a4837" strokeWidth="2" opacity="0.6" />
      <Head sid="angela" />
      <Face
        sid="angela"
        browL="M72,88.5 Q83,86.5 93,84.5" browR="M107,84.5 Q117,86.5 128,88.5"
        irisR={3} lid={0.7} mouth="frown" mouthTone="#5d443c" gaunt
      />
      {/* heavy fringe + curtain strands falling over the cheeks */}
      <path d="M64,90 C66,54 82,44 100,45 C118,44 134,54 136,90 C130,64 116,58 100,60 C84,58 70,66 64,90 Z" fill="#4a3830" />
      <path d="M66,84 C64,102 66,116 70,126 L76,122 C72,112 70,98 72,86 Z" fill="#453329" />
      <path d="M134,84 C136,102 134,116 130,126 L124,122 C128,112 130,98 128,86 Z" fill="#453329" />
      <path d="M70,74 L76,84 M128,72 L122,84" stroke="#382a23" strokeWidth="1.6" opacity="0.8" />
    </g>
  ),
  eddie: (
    <g>
      <Neck sid="eddie" />
      <path d="M70,96 C68,124 78,142 100,148 C122,142 132,124 130,96 C132,120 126,140 113,146 C107,150 93,150 87,146 C74,140 68,120 70,96 Z" fill={SKINS.eddie.base} />
      <ellipse cx="79" cy="118" rx="9" ry="12" fill={SKINS.eddie.base} />
      <ellipse cx="121" cy="118" rx="9" ry="12" fill={SKINS.eddie.base} />
      <path d="M84,146 Q100,156 116,146 Q112,156 100,158 Q88,156 84,146 Z" fill={SKINS.eddie.dk} opacity="0.7" />
      <path d="M18,240 C24,192 52,170 82,162 L100,172 L118,162 C148,170 176,192 182,240 Z" fill="#3d4a5a" />
      <path d="M82,162 L100,172 L100,240 L62,240 C64,208 70,182 82,162 Z" fill="#46566a" opacity="0.5" />
      <path d="M90,168 L100,172 L110,168 L108,182 L92,182 Z" fill="#c4bfae" />
      <path d="M100,178 L100,240" stroke="#2c3642" strokeWidth="3" />
      <circle cx="100" cy="192" r="1.8" fill="#1e2833" /><circle cx="100" cy="210" r="1.8" fill="#1e2833" />
      <Head sid="eddie" />
      <ellipse cx="83" cy="122" rx="7" ry="8" fill={SKINS.eddie.base} />
      <ellipse cx="117" cy="122" rx="7" ry="8" fill={SKINS.eddie.base} />
      <Face
        sid="eddie"
        browL="M74,84.5 Q83,86.5 92,88" browR="M108,88 Q117,86.5 126,84.5"
        irisR={2.5} lid={0.25} mouth="pout" mouthTone="#6a4a3c"
        blush={{ color: '#b05a48', opacity: 0.32 }}
      />
      <path d="M64,88 C62,54 80,42 100,42 C120,42 138,54 136,88 L130,86 C132,62 118,52 100,52 C82,52 68,62 70,86 Z" fill="#a8905c" />
      <path d="M72,70 L76,62 M96,56 L98,48 M124,62 L120,70" stroke="#8a7448" strokeWidth="1.4" />
      {/* sweat */}
      <path d="M71,78 q-2,5 0,7 q3,-2 0,-7 Z" fill="#cfd4c2" opacity="0.7" />
      <path d="M130,90 q-2,4 0,6 q3,-2 0,-6 Z" fill="#cfd4c2" opacity="0.6" />
    </g>
  ),
  laura: (
    <g transform="translate(0,14)">
      <path d="M64,96 C60,50 82,36 100,36 C118,36 140,50 136,96 C138,116 134,130 127,138 L116,130 L84,130 L73,138 C66,130 62,116 64,96 Z" fill="#8a744e" />
      <path d="M66,96 C63,54 84,40 100,40 C116,40 137,54 134,96 C135,112 131,126 125,132 C122,124 120,118 120,112 L80,112 C80,118 78,124 75,132 C69,126 65,112 66,96 Z" fill="#a08a5f" />
      <Neck sid="laura" />
      <path d="M44,226 C48,192 64,172 88,164 L100,172 L112,164 C136,172 152,192 156,226 Z" fill="#41546a" />
      <path d="M88,164 L100,172 L93,180 L82,171 Z" fill="#cfc8b6" />
      <path d="M112,164 L100,172 L107,180 L118,171 Z" fill="#cfc8b6" />
      <rect x="72" y="200" width="56" height="6" rx="3" fill="#37475a" />
      <Head sid="laura" />
      <Face
        sid="laura"
        browL="M76,86 Q83,84 91,85.5" browR="M109,85.5 Q117,84 124,86"
        irisR={4.1} mouth="smile" mouthTone="#7a5348"
        blush={{ color: '#b06a5a', opacity: 0.2 }}
      />
      <circle cx="88" cy="106" r="0.9" fill="#8a7864" opacity="0.7" />
      <circle cx="94" cy="109" r="0.9" fill="#8a7864" opacity="0.7" />
      <circle cx="108" cy="107" r="0.9" fill="#8a7864" opacity="0.7" />
      <path d="M66,84 C68,52 84,44 100,44 C116,44 132,52 134,84 C130,66 118,60 100,60 C82,60 70,66 66,84 Z" fill="#ab9265" />
      <path d="M80,58 L80,66 M100,56 L100,64 M120,58 L120,66" stroke="#8a744e" strokeWidth="1.2" opacity="0.8" />
      <rect x="120" y="66" width="10" height="3.4" rx="1.6" fill="#c46a76" transform="rotate(18,125,68)" />
    </g>
  )
}

export default function Portrait({ id, size = 150, speaking = false, active = false, onClick, title }) {
  const figure = FIGURES[id]
  const skin = SKINS[id]
  if (!figure || !skin) return null
  return (
    <button
      type="button"
      className={`portrait portrait-${id} ${speaking ? 'speaking' : ''} ${active ? 'active' : ''}`}
      style={{ width: size, height: size * 1.2 }}
      onClick={onClick}
      title={title}
      aria-label={title || id}
    >
      <svg viewBox="0 0 200 240" width="100%" height="100%">
        <defs>
          <radialGradient id={`glow-${id}`} cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="var(--char-accent, #6d8577)" stopOpacity="0.30" />
            <stop offset="55%" stopColor="var(--char-accent, #6d8577)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0b0d0c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`skin-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={skin.base} />
            <stop offset="70%" stopColor={skin.base} />
            <stop offset="100%" stopColor={skin.dk} />
          </linearGradient>
          <linearGradient id="shade-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={INK} stopOpacity="0" />
            <stop offset="100%" stopColor={INK} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="200" height="240" style={{ fill: `url(#glow-${id})` }} />
        <g className="figure">
          {figure}
          <HalfLight />
        </g>
        <ellipse className="portrait-fog" cx="100" cy="228" rx="120" ry="34" fill="#9aa39a" opacity="0.10" />
      </svg>
    </button>
  )
}
