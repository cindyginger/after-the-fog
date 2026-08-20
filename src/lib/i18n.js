// Minimal i18n: exact-string lookup with graceful fallback to English.
// The Chinese dictionary keys BY REFERENCE into the data files, so keys can
// never drift out of sync with the source lines. Switching language reloads
// the page — every system remounts cleanly in the new language.

import { ZH } from '../data/zh.js'

let lang = 'en'
try { lang = localStorage.getItem('atf-lang') || 'en' } catch { /* ignore */ }

export function getLang() { return lang }

export function setLang(l) {
  try { localStorage.setItem('atf-lang', l) } catch { /* ignore */ }
  window.location.reload()
}

// Translate a string. Unknown strings pass through untouched, so untranslated
// content simply stays English instead of breaking.
export function t(s) {
  if (lang === 'en' || !s) return s
  return ZH.get(s) || s
}
