import { useLanguage } from '../i18n/useLanguage'
import LangSelector from './LangSelector'

export default function Nav() {
  const { t } = useLanguage()

  return (
    <nav>
      <div className="container">
        <a href="#/" className="logo">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none" style={{ verticalAlign: 'middle', marginRight: 6 }}>
            <rect width="32" height="32" rx="4" fill="#1a1a1a"/>
            <path d="M8 8l16 16M24 8L8 24" stroke="#d4a017" strokeWidth="3.5" strokeLinecap="square"/>
          </svg>
          xmzr
        </a>
        <ul className="nav-links">
          <li className="nav-section-link"><a href="#about">{t('nav.about')}</a></li>
          <li className="nav-section-link"><a href="#education">{t('nav.education')}</a></li>
          <li><a href="#/projects">{t('nav.projects')}</a></li>
          <li><a href="#/blog">{t('nav.blog')}</a></li>
          <li className="nav-section-link"><a href="#contact">{t('nav.contact')}</a></li>
        </ul>
        <LangSelector />
      </div>
    </nav>
  )
}
