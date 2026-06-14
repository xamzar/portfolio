import { useLanguage } from '../i18n/context'
import LangSelector from './LangSelector'

interface NavProps {
  navigate: (path: string) => void
}

export default function Nav({ navigate }: NavProps) {
  const { t } = useLanguage()

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
        <ul className="nav-links">
          <li><a href="#/projects">{t('nav.projects')}</a></li>
          <li><a href="#/blog">{t('nav.blog')}</a></li>
        </ul>
        <LangSelector />
      </div>
    </nav>
  )
}
