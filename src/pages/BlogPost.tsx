import { useLanguage } from '../i18n/useLanguage'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPost } from '../lib/posts'

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { t, language } = useLanguage()
  const post = getPost(slug, language)

  if (!post) {
    return (
      <section className="blog-page">
        <h2 className="section-title">{t('blog.notFound')}</h2>
        <p className="empty-state">
          {t('blog.notFoundBody')}{' '}
          <a href="#/blog">
            {t('blog.back')}
          </a>
        </p>
      </section>
    )
  }

  return (
    <article className="blog-page">
      <a href="#/blog" className="back-link">
        {t('blog.back')}
      </a>

      <h1>{post.meta.title}</h1>

      <div className="blog-post-meta">
        {post.meta.date} ·{' '}
        <span className="post-tags">
          {post.meta.tags.map((t: string) => (
            <span key={t} className="post-tag">{t}</span>
          ))}
        </span>
      </div>

      <div className="blog-content">
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
      </div>
    </article>
  )
}
