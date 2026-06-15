import { useState, type ReactNode } from 'react'
import { languages, translations, resolveString } from './index'
import { LanguageContext } from './language-context'

const STORAGE_KEY = 'xmzr-lang'

function getInitialLanguage(): string {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && translations[saved]) return saved

  // Try browser language (e.g. "kk-KZ" → "kk")
  const browser = navigator.language?.split('-')[0]
  if (browser && translations[browser]) return browser

  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(getInitialLanguage)

  const setLanguage = (code: string) => {
    setLanguageState(code)
    localStorage.setItem(STORAGE_KEY, code)
  }

  const t = (key: string): string => {
    // Try current language first
    const current = translations[language]
    if (current) {
      const val = resolveString(current, key)
      if (val) return val
    }
    // Fall back to English
    const fallback = translations['en']
    if (fallback) {
      const val = resolveString(fallback, key)
      if (val) return val
    }
    // Last resort: show the key name
    return key
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, languages }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
