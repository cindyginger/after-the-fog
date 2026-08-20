# After the Fog

*A post-game conversation space for Silent Hill 2.*

**[Live Demo](https://cindyginger.github.io/after-the-fog/)** · [中文说明见下方 ↓](#中文说明)

> A non-commercial fan study. Not affiliated with Konami.
> No original game assets or verbatim dialogue are used.

---

## English

After the Fog is an AI-powered narrative exhibition inspired by Silent Hill 2.
Instead of explaining the game through a traditional essay or walkthrough, the
project lets players speak with character personas, revisit symbolic locations,
and listen to characters debate the meaning of their own story. The prototype
explores how generative AI can become a new interface for game criticism,
emotional interpretation, and post-play reflection.

The interface is fully bilingual (English / 中文), switchable at any time from
the nav bar — including synthesized text-to-speech voices in both languages.

### What's inside

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
- **Bilingual UI** — a reference-keyed translation layer (`src/lib/i18n.js`,
  `src/data/zh.js`) with language-aware text-to-speech voice selection and
  CJK-aware sentence pacing.

### Setup

```bash
npm install
npm run dev            # vite on :5173 — no API key, no backend needed
```

Production: `npm run build` → `dist/` is a fully static site, deployable to
GitHub Pages / Netlify / Vercel as-is.

### Two dialogue modes

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

### How the AI layer works (archived design)

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

### Design notes

Visual direction: psychological archive + museum guide, not horror UI.
Fog layers, film grain, a cold grey-green palette, one dried-rust accent,
typewriter headers over old-paper serif. No gore, no jump scares —
the register is restraint, ambiguity, silence.

---

## 中文说明

《雾散之后》（After the Fog）是一个受《寂静岭2》启发、由 AI 驱动的叙事展厅原型。
它不用传统的文章或攻略去解读这款游戏，而是让访客直接与角色人格对话、重访有象征意义
的场景、旁听角色们围坐一桌，为自己故事的含义争论不休。这个原型探索的是：生成式 AI
能否成为游戏批评、情感解读与游玩后反思的一种新界面。

整个界面支持中英双语实时切换（导航栏右上角），包括两种语言各自的语音合成播报。

### 里面有什么

- **角色对话** — 与詹姆斯、玛丽亚、玛丽单独交谈。每个人格背后都有一套完整的心理设定、
  记忆边界和回避策略，而不只是语气上的差异：詹姆斯先躲闪后坦白；玛丽亚会把问题反抛
  回来；玛丽会纠正你对往事的浪漫化想象。
- **场景重访** — 氛围感十足的记忆空间（托卢卡湖、布鲁克黑文医院、312号房），带可触碰
  的物件。碰一下那盘录像带，看看谁会走出来作答。
- **圆桌辩论** — 选一个问题（比如"寂静岭是什么？"），让在场的角色们自己争论起来，
  你可以随时插话打断。
- **回响卡片** — 档案馆会记录你的提问都绕着哪些主题打转（罪疚、记忆、否认……）、
  谁最常回避你，并在离开时为你生成一句专属的结语。
- **双语界面** — 基于原文本内容做键值映射的翻译层（`src/lib/i18n.js`、
  `src/data/zh.js`），语音合成会根据当前语言自动切换音色，中文断句也做了专门适配。

### 本地运行

```bash
npm install
npm run dev            # vite 默认跑在 :5173 —— 不需要 API key，也不需要后端
```

生产环境：`npm run build` 之后，`dist/` 就是一个完全静态的站点，可以直接部署到
GitHub Pages / Netlify / Vercel。

### 两种对话模式

当前 Demo 跑在**脚本模式**下：每一句角色台词都是手写的分支对话树
（`src/data/script.js`）——问题会解锁后续追问，场景物件和圆桌道具会触发多角色
对话，每句台词都带着主题标签和"是否回避"标记，用来驱动回响卡片。这种模式零成本、
完全静态、可以直接发链接分享。

角色是原创 SVG 插画，会呼吸、眨眼，并随打字机文字同步张合嘴部。每个角色都有匹配
其心理状态的主题色：詹姆斯是冷调苔藓绿，玛丽亚是铁锈玫瑰色，玛丽是苍白的医院蓝。
圆桌是一张真实的桌子——烛光摇曳，桌上摆着可点击的《寂静岭2》相关物件（包括一把
非常重要的狗钥匙）。

最初的 **AI 模式**（实时调用 Claude API 生成对话）被保留在 `server/` 目录中——
人格设计、流式代理和自标注协议见下文，如需启用，恢复页面中的 API 调用即可。

### AI 层是怎么设计的（存档设计方案）

- 每个角色都有一份**人格文件**（`server/personas.js`）：身份、语气、核心心理、
  对话策略、人物关系，以及硬性边界（不涉及血腥细节、不提供现实中的医疗/心理咨询
  建议、对创伤内容保持克制）。共享规则层负责处理展厅框架、元提问，以及"策展人注"
  的触发逻辑。
- 每条回复末尾都带一个隐藏的机器可读标记
  `[[tags: guilt, memory | evaded: yes]]`——模型会自我汇报这句话涉及了哪些主题、
  角色是否回避了问题。前端会剥离这个标记，用它点亮右侧的主题标签、驱动回响卡片。
  角色可以撒谎，但这个标记不会。
- 场景和圆桌模式会把多角色的对话记录压平成单个上下文块传给模型，这样任何角色都能
  对当下发生的事作出回应。

### 设计说明

视觉方向：心理档案馆 + 博物馆导览，而不是恐怖游戏 UI。多层雾气、胶片颗粒感、
冷灰绿色调，点缀一处干涸的铁锈红，打字机风格的标题叠在做旧纸张的衬线字体上。
没有血腥、没有 jump scare——整体基调是克制、暧昧与沉默。
