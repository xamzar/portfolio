import { useLanguage } from '../i18n/useLanguage'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getProject } from '../lib/projects'
import { allPosts } from '../lib/posts'
import PostCard from '../components/PostCard'
import { GitHubIcon, ExternalLinkIcon } from '../components/Icons'

interface ProjectProps {
  slug: string
}

export default function Project({ slug }: ProjectProps) {
  const { t, language } = useLanguage()
  const project = getProject(slug, language)

  if (!project) {
    return (
      <section className="project-page">
        <h2 className="section-title">{t('projects.notFound')}</h2>
        <p className="empty-state">
          {t('projects.notFoundBody')}{' '}
          <a href="#/">← {t('projects.backHome')}</a>
        </p>
      </section>
    )
  }

  const { meta, content } = project

  const posts = allPosts(language).filter(p =>
    p.tags.some(t => t.toLowerCase() === slug.toLowerCase())
  )

  return (
    <article className="project-page">
      <a href="#/" className="back-link">
        ← {t('projects.backHome')}
      </a>

      <h1>{meta.title}</h1>

      <div className="project-meta">
        <span className="project-tech">{meta.tech}</span>
        {meta.status && (
          <span className="project-status">{meta.status}</span>
        )}
      </div>

      <div className="project-links">
        {meta.url && (
          <a href={meta.url} target="_blank" rel="noopener noreferrer" className="project-link">
            <ExternalLinkIcon size={14} />
            {meta.url.replace('https://', '')}
          </a>
        )}
        {meta.repo && (
          <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="project-link">
            <GitHubIcon size={14} />
            {meta.repo.replace('https://github.com/', '')}
          </a>
        )}
      </div>

      <div className="project-content">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>

      {posts.length > 0 && (
        <>
          <hr className="separator" />
          <h2 className="section-title">{t('projects.relatedPosts')}</h2>
          {posts.map(p => (
            <PostCard key={p.slug} post={p} />
          ))}
        </>
      )}
    </article>
  )
}
