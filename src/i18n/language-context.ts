import { createContext } from 'react'
import type { LanguageInfo } from './index'

export type LanguageContextValue = {
  language: string
  setLanguage: (code: string) => void
  t: (key: string) => string
  languages: LanguageInfo[]
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
