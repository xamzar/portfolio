import { useLanguage } from '../i18n/useLanguage'
import PostCard from '../components/PostCard'
import { allPosts } from '../lib/posts'

export default function BlogPreview() {
  const { t, language } = useLanguage()
  const posts = allPosts(language)
  const recent = posts.slice(0, 3)

  if (recent.length === 0) {
    return (
      <section id="blog">
        <h2 className="section-title">{t('section.blog')}</h2>
        <p className="empty-state">{t('blog.empty')}</p>
      </section>
    )
  }

  return (
    <section id="blog">
      <h2 className="section-title">{t('section.blog')}</h2>
      {recent.map(p => (
        <PostCard key={p.slug} post={p} />
      ))}
      <a
        href="#/blog"
        className="view-all"
      >
        {t('blog.viewAll')}
      </a>
    </section>
  )
}
