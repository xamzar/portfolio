import { useLanguage } from '../i18n/useLanguage'
import skillsData from '../content/skills.json'
import BlogPreview from '../sections/BlogPreview'
import { allProjects } from '../lib/projects'
import ProjectCard from '../components/ProjectCard'
import { LinkedInIcon, InstagramIcon, TelegramIcon, EmailIcon, GitHubIcon } from '../components/Icons'

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
        <p className="about-text">
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
          <ProjectCard key={p.slug} project={p} />
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
            <GitHubIcon size={18} />
          </a>
          <a href="https://linkedin.com/in/xmzr" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <LinkedInIcon size={18} />
          </a>
          <a href="https://instagram.com/xmzr.dev" target="_blank" rel="noopener noreferrer" title="Instagram">
            <InstagramIcon size={18} />
          </a>
          <a href="https://t.me/xmzrdev" target="_blank" rel="noopener noreferrer" title="Telegram">
            <TelegramIcon size={18} />
          </a>
          <a href="mailto:rauan.khamza@gmail.com" title="Email">
            <EmailIcon size={18} />
          </a>
        </div>
        <p className="contact-note">
          {t('contact.availability')}
        </p>
      </section>
    </>
  )
}
