import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { allProjects } from '../lib/projects'
import ProjectCard from '../components/ProjectCard'
import { filterItems } from '../lib/filter'

export default function Projects() {
  const { t, language } = useLanguage()
  const [search, setSearch] = useState('')
  const projects = allProjects(language)
  const filtered = filterItems(projects, search, ['title', 'tech', 'desc'])

  return (
    <section className="blog-page">
      <h2 className="section-title">{t('section.projects')}</h2>

      <input
        className="search-input"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={t('projects.searchPlaceholder')}
      />

      {filtered.length === 0 ? (
        <p className="empty-state">
          {projects.length === 0 ? t('projects.empty') : t('projects.noMatches')}
        </p>
      ) : (
        filtered.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))
      )}
    </section>
  )
}
