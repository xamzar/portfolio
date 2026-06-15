import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import PostCard from '../components/PostCard'
import { allPosts, allTags } from '../lib/posts'
import { filterItems } from '../lib/filter'

export default function Blog() {
  const { t, language } = useLanguage()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const posts = allPosts(language)
  const tags = allTags()
  const filtered = filterItems(posts, search, ['title', 'excerpt'], activeTag, 'tags')

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
          <button
            key={tag}
            className={`tag-pill${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
          >
            #{tag}
          </button>
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
