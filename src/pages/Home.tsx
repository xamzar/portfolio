import { useLanguage } from '../i18n/context'
import skillsData from '../content/skills.json'
import BlogPreview from '../sections/BlogPreview'
import { allProjects } from '../lib/projects'

const skills = skillsData.skills

export default function Home() {
  const { t, language } = useLanguage()
  const projects = allProjects(language)

  return (
    <>
      <section className="hero">
        <h1>{t('hero.name')}</h1>
        <div className="tagline">{t('hero.tagline')}</div>
        <p>{t('hero.bio')}</p>
      </section>

      <hr className="separator" />

      <section id="about">
        <h2 className="section-title">{t('section.about')}</h2>
        <p className="empty-state" style={{ marginBottom: '1.5rem' }}>
          {t('about.body')}
        </p>
        <div className="skills-grid">
          {skills.map(s => (
            <span key={s.name} className="skill-tag">{s.name}</span>
          ))}
        </div>
      </section>

      <hr className="separator" />

      <section id="education">
        <h2 className="section-title">{t('section.education')}</h2>

        <div className="edu-entry">
          <div className="edu-header">
            <div>
              <div className="edu-school">{t('edu.cityu.school')} · 🐯</div>
              <div className="edu-degree">{t('edu.cityu.degree')}</div>
            </div>
            <div className="edu-meta">
              <span>{t('edu.cityu.location')}</span>
              <span>{t('edu.cityu.dates')}</span>
            </div>
          </div>
        </div>

        <div className="edu-entry">
          <div className="edu-header">
            <div>
              <div className="edu-school">{t('edu.nu.school')}</div>
              <div className="edu-degree">{t('edu.nu.degree')}</div>
            </div>
            <div className="edu-meta">
              <span>{t('edu.nu.location')}</span>
              <span>{t('edu.nu.dates')}</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="separator" />

      <section id="projects">
        <h2 className="section-title">{t('section.projects')}</h2>
        {projects.slice(0, 3).map(p => (
          <div key={p.slug} className="project">
            <h3>
              <a href={`#/projects/${p.slug}`}>{p.title}</a>
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="repo-link" title="GitHub repo">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
              )}
            </h3>
            <div className="tech">{p.tech}</div>
            <p>{p.desc}</p>
          </div>
        ))}
        {projects.length > 3 && (
          <a href="#/projects" className="view-all">
            {t('projects.viewAll')}
          </a>
        )}
      </section>

      <hr className="separator" />

      <BlogPreview />

      <hr className="separator" />

      <section id="contact">
        <h2 className="section-title">{t('section.contact')}</h2>
        <div className="contact-links">
          <a href="https://github.com/xamzar" target="_blank" rel="noopener noreferrer" title="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/xmzr" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
              <path d="M8 11v6"/>
              <path d="M8 8.01v-.01"/>
              <path d="M12 17v-6"/>
              <path d="M16 17v-3a2 2 0 00-4 0"/>
            </svg>
          </a>
          <a href="https://instagram.com/xmzr.dev" target="_blank" rel="noopener noreferrer" title="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://t.me/xmzrdev" target="_blank" rel="noopener noreferrer" title="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13"/>
              <path d="M22 2L15 22l-5.5-8.5L1 8l21-6z"/>
            </svg>
          </a>
          <a href="mailto:rauan.khamza@gmail.com" title="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 7l-10 7L2 7"/>
            </svg>
          </a>
        </div>
        <p className="empty-state" style={{ marginTop: '0.75rem' }}>
          {t('contact.availability')}
        </p>
      </section>
    </>
  )
}
