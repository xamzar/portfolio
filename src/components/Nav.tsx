import { useLanguage } from '../i18n/context'

interface NavProps {
  route: string
  navigate: (path: string) => void
}

export default function Nav({ route, navigate }: NavProps) {
  const { t, language, setLanguage, languages } = useLanguage()
  const isHome = route === '/'

  return (
    <nav>
      <div className="container">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }} className="logo">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none" style={{ verticalAlign: 'middle', marginRight: 6 }}>
            <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
            <path d="M8 8l16 16M24 8L8 24" stroke="#d4a017" strokeWidth="3.5" strokeLinecap="square"/>
          </svg>
          xmzr
        </a>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ul className="nav-links">
            {isHome ? (
              <>
                <li><a href="#about">{t('nav.about')}</a></li>
                <li><a href="#projects">{t('nav.projects')}</a></li>
                <li><a href="#blog" onClick={(e) => { e.preventDefault(); navigate('/blog') }}>{t('nav.blog')}</a></li>
                <li><a href="#contact">{t('nav.contact')}</a></li>
              </>
            ) : (
              <>
                <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/') }}>{t('nav.home')}</a></li>
                <li><a href="#blog" onClick={(e) => { e.preventDefault(); navigate('/blog') }}>{t('nav.blog')}</a></li>
              </>
            )}
          </ul>
          <span className="lang-select-wrap">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </nav>
  )
}
