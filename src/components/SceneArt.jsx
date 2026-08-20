// Full-bleed atmospheric scene art — original SVG, denser and brighter than v1.
// Each scene carries its own light sources (lantern, fluorescents, bedside lamp)
// so the places read as lived-in rooms rather than darkness with hotspots.

function Toluca() {
  return (
    <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="scene-art">
      <defs>
        <linearGradient id="tl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b332e" /><stop offset="100%" stopColor="#1c2420" />
        </linearGradient>
        <linearGradient id="tl-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#28312c" /><stop offset="100%" stopColor="#121714" />
        </linearGradient>
        <radialGradient id="tl-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cfd4c2" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#cfd4c2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#cfd4c2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tl-lantern" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8c98a" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#e8c98a" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8c98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tl-moonpath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfd4c2" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#cfd4c2" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      <rect width="1000" height="265" fill="url(#tl-sky)" />
      <rect y="260" width="1000" height="240" fill="url(#tl-water)" />

      {/* fogged moon */}
      <circle cx="380" cy="92" r="120" fill="url(#tl-moon)" />
      <circle cx="380" cy="92" r="26" fill="#d6dbc8" opacity="0.85" />
      <rect x="342" y="262" width="76" height="180" fill="url(#tl-moonpath)" />

      {/* far shore + Lakeview Hotel silhouette, windows lit */}
      <path d="M0,262 L120,256 L260,260 L420,255 L560,259 L1000,256 L1000,266 L0,266 Z" fill="#141a16" />
      <g>
        <rect x="700" y="176" width="180" height="82" fill="#161c17" />
        <path d="M690,176 L790,132 L890,176 Z" fill="#121713" />
        <rect x="838" y="118" width="26" height="60" fill="#141a15" />
        <path d="M832,118 L851,100 L870,118 Z" fill="#101511" />
        {[720, 752, 784, 816, 848].map((x, i) => (
          <rect key={i} x={x} y={i % 2 ? 198 : 214} width="9" height="12" fill="#d8c98a" opacity={0.5 + (i % 3) * 0.15} />
        ))}
        <rect x="742" y="236" width="10" height="14" fill="#e0d194" opacity="0.75" />
      </g>

      {/* water shimmer */}
      {[280, 300, 324, 352, 386, 424].map((y, i) => (
        <path key={i} d={`M${40 + i * 60},${y} q60,4 130,0 q70,-4 160,0 q80,4 170,0`} fill="none" stroke="#4a564e" strokeWidth="1.2" opacity={0.35 - i * 0.04} />
      ))}

      {/* rowboat adrift with shipped oar */}
      <g>
        <path d="M545,296 Q580,310 640,296 L628,284 L558,284 Z" fill="#181e1a" />
        <path d="M545,296 Q580,310 640,296" fill="none" stroke="#3c463f" strokeWidth="1.6" />
        <path d="M566,284 L620,278" stroke="#2e3630" strokeWidth="3" />
        <ellipse cx="592" cy="312" rx="46" ry="5" fill="#0c100d" opacity="0.6" />
      </g>

      {/* the dock, planked, with posts, sagging rope, a lit lantern */}
      <g>
        <path d="M0,392 L400,338 L432,350 L0,424 Z" fill="#20241d" />
        <path d="M0,424 L432,350 L436,364 L0,446 Z" fill="#171a14" />
        {[60, 130, 200, 268, 334, 396].map((x, i) => (
          <path key={i} d={`M${x},${418 - i * 12} L${x + 30},${412 - i * 12}`} stroke="#12150f" strokeWidth="2" opacity="0.8" />
        ))}
        {/* posts */}
        <rect x="70" y="330" width="12" height="76" fill="#191d16" transform="rotate(-2,76,368)" />
        <rect x="185" y="316" width="11" height="72" fill="#1b1f17" transform="rotate(1.5,190,352)" />
        <rect x="292" y="300" width="11" height="70" fill="#191d16" />
        <rect x="392" y="290" width="10" height="62" fill="#1b1f17" transform="rotate(-1,397,321)" />
        <path d="M82,336 Q135,352 187,322 M196,322 Q245,338 294,306" fill="none" stroke="#2c3128" strokeWidth="1.6" />
        {/* lantern on the second post */}
        <circle cx="190" cy="300" r="86" fill="url(#tl-lantern)" />
        <rect x="182" y="292" width="17" height="22" rx="3" fill="#20241a" stroke="#3c4032" strokeWidth="1.4" />
        <rect x="186" y="296" width="9" height="13" fill="#e8c98a" opacity="0.9" />
        <path d="M185,292 L190,284 L196,292" fill="none" stroke="#3c4032" strokeWidth="1.6" />
        {/* pocket radio resting on the far post */}
        <g>
          <rect x="286" y="286" width="24" height="14" rx="2" fill="#262b22" stroke="#4a5142" strokeWidth="1.2" />
          <circle cx="293" cy="293" r="3.4" fill="#15180f" />
          <line x1="306" y1="286" x2="313" y2="274" stroke="#4a5142" strokeWidth="1.4" />
        </g>
      </g>

      {/* bench with the letter on it */}
      <g>
        <rect x="640" y="380" width="196" height="10" rx="2" fill="#22261d" />
        <rect x="640" y="394" width="196" height="8" rx="2" fill="#1c2018" />
        <rect x="648" y="402" width="10" height="40" fill="#171a13" />
        <rect x="818" y="402" width="10" height="40" fill="#171a13" />
        <rect x="646" y="352" width="184" height="8" rx="2" fill="#1e221a" />
        <rect x="646" y="366" width="184" height="7" rx="2" fill="#1a1e16" />
        {/* the letter — a pale envelope, faintly luminous */}
        <g transform="rotate(-6,712,376)">
          <rect x="694" y="370" width="38" height="24" rx="2" fill="#cfc8b6" />
          <path d="M694,370 L713,384 L732,370" fill="none" stroke="#8a836f" strokeWidth="1.2" />
        </g>
        <ellipse cx="713" cy="384" rx="34" ry="14" fill="#cfc8b6" opacity="0.08" />
      </g>

      {/* reeds */}
      {[520, 545, 870, 900, 930, 960].map((x, i) => (
        <path key={i} d={`M${x},470 q${i % 2 ? 6 : -6},-34 ${i % 2 ? 10 : -4},-52`} fill="none" stroke="#1c211a" strokeWidth="3" strokeLinecap="round" />
      ))}

      {/* fog bands */}
      <rect y="228" width="1000" height="52" fill="#9aa39a" opacity="0.13" />
      <rect y="268" width="1000" height="34" fill="#9aa39a" opacity="0.08" />
      <rect y="330" width="1000" height="26" fill="#9aa39a" opacity="0.05" />
    </svg>
  )
}

function Hospital() {
  return (
    <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="scene-art scene-flicker">
      <defs>
        <linearGradient id="hp-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3126" /><stop offset="100%" stopColor="#22261c" />
        </linearGradient>
        <radialGradient id="hp-lamp" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#d3d5ba" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#d3d5ba" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#d3d5ba" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hp-mirror" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b756a" /><stop offset="45%" stopColor="#465046" />
          <stop offset="55%" stopColor="#59645b" /><stop offset="100%" stopColor="#39423a" />
        </linearGradient>
      </defs>

      {/* ceiling / floor / walls, one-point perspective */}
      <path d="M0,0 L1000,0 L640,148 L360,148 Z" fill="#20251c" />
      <path d="M0,500 L1000,500 L640,330 L360,330 Z" fill="#262a1f" />
      <path d="M0,0 L360,148 L360,330 L0,500 Z" fill="url(#hp-wall)" />
      <path d="M1000,0 L640,148 L640,330 L1000,500 Z" fill="url(#hp-wall)" opacity="0.92" />
      <rect x="360" y="148" width="280" height="182" fill="#181c14" />

      {/* checkered floor hint */}
      {[[0, 500, 360, 330], [80, 500, 388, 330], [170, 500, 420, 330], [270, 500, 452, 330]].map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M${x1},${y1} L${x2},${y2}`} stroke="#1b1f16" strokeWidth="2" opacity="0.7" />
      ))}
      {[[1000, 500, 640, 330], [920, 500, 612, 330], [830, 500, 580, 330], [730, 500, 548, 330]].map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M${x1},${y1} L${x2},${y2}`} stroke="#1b1f16" strokeWidth="2" opacity="0.7" />
      ))}
      <path d="M0,436 L1000,436 M120,398 L880,398 M220,370 L780,370 M292,350 L708,350" stroke="#1b1f16" strokeWidth="2" opacity="0.55" fill="none" />

      {/* wainscot */}
      <path d="M0,352 L360,268 M640,268 L1000,352" stroke="#3a4030" strokeWidth="4" fill="none" />

      {/* fluorescent fixtures */}
      {[[290, 66], [500, 52], [710, 66]].map(([x, y], i) => (
        <g key={i} className={i === 1 ? 'tube-flicker' : undefined}>
          <rect x={x - 2} y={0} width="4" height={y} fill="#2e332a" />
          <rect x={x - 34} y={y} width="68" height="10" rx="3" fill="#343a2c" />
          <rect x={x - 28} y={y + 3} width="56" height="5" rx="2" fill="#e6e8cd" opacity="0.9" />
          <polygon points={`${x - 26},${y + 10} ${x + 26},${y + 10} ${x + 84},430 ${x - 84},430`} fill="url(#hp-lamp)" />
        </g>
      ))}

      {/* left wall: doors, plates, notice board, IV stand */}
      <g>
        <path d="M70,110 L150,146 L150,392 L70,438 Z" fill="#1b1f16" stroke="#39402f" strokeWidth="2.5" />
        <circle cx="128" cy="248" r="10" fill="#454f3e" opacity="0.85" />
        <rect x="96" y="180" width="26" height="10" fill="#4a5142" />
        <path d="M210,166 L268,190 L268,362 L210,392 Z" fill="#1b1f16" stroke="#39402f" strokeWidth="2.2" />
        <rect x="228" y="212" width="22" height="9" fill="#4a5142" />
        {/* notice board with pinned papers */}
        <path d="M292,204 L338,220 L338,300 L292,314 Z" fill="#2e3226" stroke="#454b38" strokeWidth="2" />
        <rect x="299" y="226" width="13" height="17" fill="#b8b39e" transform="rotate(-3,305,234)" />
        <rect x="317" y="238" width="12" height="15" fill="#a9a48f" transform="rotate(4,323,245)" />
        <rect x="303" y="262" width="14" height="16" fill="#b0ab96" transform="rotate(-6,310,270)" />
        {/* IV stand */}
        <line x1="180" y1="260" x2="180" y2="404" stroke="#4a5044" strokeWidth="3" />
        <path d="M166,262 L194,262" stroke="#4a5044" strokeWidth="3" />
        <rect x="184" y="266" width="12" height="20" rx="3" fill="#7c8471" opacity="0.85" />
        <path d="M168,404 L192,404 M172,398 L172,410 M188,398 L188,410" stroke="#4a5044" strokeWidth="2.5" />
      </g>

      {/* right wall: mirror, door, sign */}
      <g>
        {/* wall mirror */}
        <path d="M745,178 L810,204 L810,330 L745,352 Z" fill="url(#hp-mirror)" stroke="#4e5644" strokeWidth="3" />
        <path d="M752,196 L788,318" stroke="#8b958a" strokeWidth="2" opacity="0.5" />
        <path d="M762,192 L796,308" stroke="#8b958a" strokeWidth="1" opacity="0.35" />
        <path d="M850,128 L930,96 L930,468 L850,436 Z" fill="#1b1f16" stroke="#39402f" strokeWidth="2.5" />
        <circle cx="872" cy="286" r="10" fill="#454f3e" opacity="0.85" />
        <rect x="700" y="150" width="34" height="12" fill="#4a5142" />
        <path d="M706,156 L726,156 M722,152 L728,156 L722,160" stroke="#20251c" strokeWidth="1.6" fill="none" />
      </g>

      {/* end of corridor: double doors + gurney */}
      <g>
        <rect x="428" y="176" width="70" height="150" fill="#20241a" stroke="#39402f" strokeWidth="2" />
        <rect x="502" y="176" width="70" height="150" fill="#20241a" stroke="#39402f" strokeWidth="2" />
        <rect x="444" y="196" width="34" height="42" fill="#9aa382" opacity="0.55" />
        <rect x="522" y="196" width="34" height="42" fill="#9aa382" opacity="0.55" />
        <rect x="428" y="298" width="144" height="12" fill="#3a4030" opacity="0.8" />
        {/* gurney with sheet */}
        <g>
          <rect x="462" y="282" width="88" height="9" rx="2" fill="#2c3126" />
          <path d="M462,282 L550,282 L546,272 L470,272 Z" fill="#8f8a76" opacity="0.8" />
          <rect x="470" y="291" width="5" height="26" fill="#20251c" /><rect x="536" y="291" width="5" height="26" fill="#20251c" />
          <circle cx="473" cy="320" r="5" fill="#171b13" stroke="#39402f" strokeWidth="1.4" />
          <circle cx="539" cy="320" r="5" fill="#171b13" stroke="#39402f" strokeWidth="1.4" />
        </g>
      </g>

      {/* wall clock */}
      <circle cx="500" cy="130" r="15" fill="#22271d" stroke="#4a5142" strokeWidth="2" />
      <path d="M500,130 L500,120 M500,130 L508,133" stroke="#8b9480" strokeWidth="1.6" />

      {/* wheelchair, foreground right */}
      <g opacity="0.95">
        <circle cx="806" cy="432" r="34" fill="none" stroke="#2e3327" strokeWidth="4" />
        {[0, 45, 90, 135].map(a => (
          <line key={a} x1={806 - 32 * Math.cos(a * Math.PI / 180)} y1={432 - 32 * Math.sin(a * Math.PI / 180)}
            x2={806 + 32 * Math.cos(a * Math.PI / 180)} y2={432 + 32 * Math.sin(a * Math.PI / 180)}
            stroke="#2e3327" strokeWidth="2.4" />
        ))}
        <circle cx="762" cy="452" r="12" fill="none" stroke="#2e3327" strokeWidth="3.4" />
        <path d="M776,360 L806,364 L810,398 M776,360 L770,404 L744,412" fill="none" stroke="#2e3327" strokeWidth="5" strokeLinecap="round" />
        <path d="M772,362 L804,366" stroke="#232720" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* dropped flashlight, beam across the floor */}
      <g>
        <polygon points="300,436 316,424 520,452 508,478" fill="#e2e4c4" opacity="0.12" />
        <rect x="268" y="424" width="40" height="15" rx="6" fill="#2c3126" stroke="#4a5142" strokeWidth="1.6" transform="rotate(8,288,431)" />
        <ellipse cx="311" cy="434" rx="5" ry="7" fill="#e6e8cd" opacity="0.9" transform="rotate(8,311,434)" />
      </g>
      {/* scattered papers */}
      <rect x="360" y="452" width="20" height="14" fill="#a9a48f" transform="rotate(-14,370,459)" opacity="0.85" />
      <rect x="404" y="466" width="18" height="13" fill="#b8b39e" transform="rotate(9,413,472)" opacity="0.8" />
    </svg>
  )
}

function Room312() {
  return (
    <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="scene-art">
      <defs>
        <linearGradient id="rm-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e2b20" /><stop offset="100%" stopColor="#241f16" />
        </linearGradient>
        <radialGradient id="rm-lampglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8ce92" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#e8ce92" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e8ce92" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rm-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78827c" stopOpacity="0.65" />
          <stop offset="55%" stopColor="#4e5c58" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2c3a37" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="rm-tvglow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#b8bfab" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#b8bfab" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="500" fill="url(#rm-wall)" />
      {/* striped wallpaper with faint motif */}
      {Array.from({ length: 15 }, (_, i) => (
        <rect key={i} x={i * 70} y="0" width="28" height="396" fill="#292518" opacity="0.55" />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} opacity="0.28">
          <path d={`M${60 + i * 126},84 l6,8 l-6,8 l-6,-8 Z`} fill="#4a4330" />
          <path d={`M${60 + i * 126},218 l6,8 l-6,8 l-6,-8 Z`} fill="#4a4330" />
        </g>
      ))}
      {/* crown molding + baseboard + floor */}
      <rect y="18" width="1000" height="8" fill="#38321f" />
      <rect y="390" width="1000" height="10" fill="#3a3421" />
      <rect y="400" width="1000" height="100" fill="#221c12" />
      <path d="M0,428 L1000,428 M0,462 L1000,462" stroke="#191408" strokeWidth="2" opacity="0.6" />
      {/* rug */}
      <ellipse cx="480" cy="462" rx="270" ry="30" fill="#33291c" />
      <ellipse cx="480" cy="462" rx="270" ry="30" fill="none" stroke="#443826" strokeWidth="3" opacity="0.8" />
      <ellipse cx="480" cy="462" rx="220" ry="22" fill="none" stroke="#443826" strokeWidth="1.6" opacity="0.6" />

      {/* door, left edge */}
      <g>
        <rect x="18" y="90" width="98" height="306" fill="#2a241a" stroke="#40382a" strokeWidth="3" />
        <rect x="32" y="112" width="70" height="118" fill="none" stroke="#40382a" strokeWidth="2" />
        <rect x="32" y="248" width="70" height="118" fill="none" stroke="#40382a" strokeWidth="2" />
        <circle cx="104" cy="248" r="5" fill="#6e5f3e" />
      </g>

      {/* bed with headboard, pillows, folded blanket */}
      <g>
        <rect x="138" y="176" width="18" height="216" fill="#2c2517" />
        <rect x="156" y="196" width="216" height="130" fill="#31281a" />
        {[176, 206, 236, 266, 296, 326, 352].map((x, i) => (
          <rect key={i} x={x} y="206" width="9" height="110" fill="#251e12" opacity="0.7" />
        ))}
        <rect x="150" y="316" width="240" height="52" rx="8" fill="#57543f" />
        <rect x="150" y="308" width="240" height="18" rx="7" fill="#6a6750" />
        <rect x="162" y="292" width="66" height="22" rx="7" fill="#7c7960" />
        <rect x="236" y="294" width="58" height="20" rx="7" fill="#726f58" />
        <rect x="150" y="352" width="240" height="16" fill="#494633" />
        <path d="M150,352 L390,352" stroke="#33301f" strokeWidth="2" />
        <rect x="146" y="368" width="12" height="44" fill="#241e12" /><rect x="382" y="368" width="12" height="44" fill="#241e12" />
      </g>
      {/* framed lake print above the bed */}
      <g>
        <rect x="204" y="96" width="132" height="88" fill="#221d12" stroke="#4c422c" strokeWidth="4" />
        <rect x="214" y="106" width="112" height="68" fill="#39423c" />
        <path d="M214,142 L326,142" stroke="#5b6a60" strokeWidth="2" opacity="0.8" />
        <circle cx="252" cy="124" r="9" fill="#8b9488" opacity="0.6" />
      </g>

      {/* nightstand with glowing lamp — the room's warm heart */}
      <g>
        <circle cx="432" cy="240" r="150" fill="url(#rm-lampglow)" />
        <rect x="398" y="330" width="72" height="66" fill="#2e2718" stroke="#443a26" strokeWidth="2" />
        <rect x="406" y="342" width="56" height="18" fill="#241e12" />
        <circle cx="434" cy="351" r="3" fill="#6e5f3e" />
        <rect x="426" y="286" width="14" height="46" fill="#3a3120" />
        <path d="M404,258 L462,258 L450,292 L416,292 Z" fill="#c9a96a" opacity="0.92" />
        <path d="M404,258 L462,258 L450,292 L416,292 Z" fill="none" stroke="#8a744a" strokeWidth="1.6" />
      </g>

      {/* dresser with TV, VCR and the tape */}
      <g>
        <rect x="486" y="340" width="210" height="76" fill="#2e2718" stroke="#443a26" strokeWidth="2.4" />
        <rect x="498" y="352" width="86" height="24" fill="#241e12" /><rect x="598" y="352" width="86" height="24" fill="#241e12" />
        <rect x="498" y="384" width="86" height="24" fill="#241e12" /><rect x="598" y="384" width="86" height="24" fill="#241e12" />
        <circle cx="541" cy="364" r="3" fill="#6e5f3e" /><circle cx="641" cy="364" r="3" fill="#6e5f3e" />
        {/* tv */}
        <ellipse cx="590" cy="300" rx="130" ry="66" fill="url(#rm-tvglow)" />
        <rect x="510" y="216" width="160" height="118" rx="10" fill="#2c2e24" stroke="#454738" strokeWidth="2" />
        <rect x="522" y="228" width="112" height="92" rx="5" className="tv-static" />
        <circle cx="652" cy="242" r="6" fill="#454738" /><circle cx="652" cy="262" r="6" fill="#454738" />
        <rect x="646" y="278" width="14" height="34" rx="3" fill="#20221a" />
        <path d="M556,216 L534,178 M580,216 L610,182" stroke="#454738" strokeWidth="3.4" />
        {/* vcr on the dresser, tape sitting on top */}
        <rect x="504" y="322" width="104" height="18" rx="2" fill="#1e2016" stroke="#3a3c2c" strokeWidth="1.6" />
        <rect x="514" y="327" width="30" height="8" fill="#0f110b" />
        <circle cx="596" cy="331" r="3" fill="#5a5c48" />
        {/* the videotape */}
        <g transform="rotate(-4,466,318)">
          <rect x="440" y="310" width="52" height="17" rx="2" fill="#11130d" stroke="#3c3e2e" strokeWidth="1.6" />
          <rect x="448" y="314" width="24" height="8" fill="#a9a48f" opacity="0.85" />
        </g>
      </g>

      {/* window with moonlit lake, curtains, radiator, light beam */}
      <g>
        <polygon points="740,120 962,120 992,470 700,470" fill="#cfd4c2" opacity="0.05" />
        <rect x="716" y="70" width="252" height="264" fill="#1c1810" />
        <rect x="728" y="82" width="228" height="240" fill="url(#rm-window)" />
        <path d="M728,202 L956,202 M842,82 L842,322" stroke="#1c1810" strokeWidth="7" />
        {/* the lake beyond: horizon, moon, pier posts */}
        <path d="M728,196 L956,196" stroke="#aab5a8" strokeWidth="1.8" opacity="0.6" />
        <circle cx="906" cy="120" r="17" fill="#d6dbc8" opacity="0.8" />
        <rect x="898" y="204" width="17" height="80" fill="#d6dbc8" opacity="0.10" />
        <path d="M740,238 q26,4 54,0 M800,262 q30,5 62,0 M748,292 q36,5 74,0" stroke="#38463f" strokeWidth="1.6" fill="none" opacity="0.8" />
        <rect x="756" y="222" width="6" height="28" fill="#141a15" /><rect x="782" y="228" width="5" height="24" fill="#141a15" />
        {/* frame + sill + curtains */}
        <rect x="702" y="52" width="280" height="20" fill="#38321f" />
        <rect x="702" y="330" width="280" height="14" fill="#38321f" />
        <path d="M712,72 Q728,200 706,330 L676,330 Q700,200 684,72 Z" fill="#262115" />
        <path d="M972,72 Q958,200 976,330 L1000,330 L1000,72 Z" fill="#262115" />
        <path d="M690,110 Q700,120 694,132 M698,180 Q708,190 700,204" stroke="#191508" strokeWidth="2" fill="none" opacity="0.7" />
        {/* radiator */}
        <rect x="742" y="352" width="200" height="44" rx="6" fill="#2a2517" stroke="#40382a" strokeWidth="2" />
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={752 + i * 21} y="358" width="9" height="32" rx="4" fill="#332c1b" />
        ))}
      </g>
    </svg>
  )
}

const ART = { toluca: Toluca, hospital: Hospital, room312: Room312 }

export default function SceneArt({ id }) {
  const Art = ART[id]
  return Art ? <Art /> : null
}
