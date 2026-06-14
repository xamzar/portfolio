import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../i18n/context'

export default function LangSelector() {
  const { language, setLanguage, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  const current = languages.find(l => l.code === language)

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        [{current?.nativeName || 'EN'} ▾]
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`lang-option${lang.code === language ? ' active' : ''}`}
              onClick={() => { setLanguage(lang.code); setOpen(false) }}
            >
              [{lang.nativeName}]
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
