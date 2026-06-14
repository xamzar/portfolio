import { useState } from 'react'
import { useLanguage } from '../i18n/context'
import PostCard from '../components/PostCard'
import { allPosts, allTags } from '../lib/posts'

export default function Blog() {
  const { t, language } = useLanguage()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const posts = allPosts(language)
  const tags = allTags()

  const filtered = posts.filter(p => {
    if (activeTag && !p.tags.includes(activeTag)) return false
    if (search) {
      const q = search.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <section className="blog-page">
      <h2 className="section-title">{t('section.blog')}</h2>

      <input
        className="search-input"
        type="text"
        placeholder={t('blog.searchPlaceholder')}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="tag-pills">
        {tags.map(tag => (
          <span
            key={tag}
            className={`tag-pill${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            #{tag}
          </span>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">{t('blog.noMatches')}</p>
      )}

      {filtered.map(p => (
        <PostCard
          key={p.slug}
          post={p}
          onTagClick={(tag) => { setActiveTag(tag); setSearch('') }}
        />
      ))}
    </section>
  )
}
