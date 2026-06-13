import { useState } from 'react'
import { parseFrontmatter } from '../lib/frontmatter'

type PostMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

const modules = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

const allPosts: PostMeta[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace('.md', '')
    const { data } = parseFrontmatter(raw as string)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: data.tags || [],
      excerpt: data.excerpt || '',
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const allTags = [...new Set(allPosts.flatMap(p => p.tags))].sort()

interface BlogProps {
  navigate: (path: string) => void
}

export default function Blog({ navigate }: BlogProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = allPosts.filter(p => {
    if (activeTag && !p.tags.includes(activeTag)) return false
    if (search) {
      const q = search.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.excerpt.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2 className="section-title">// blog</h2>

      {/* Search */}
      <input
        className="search-input"
        type="text"
        placeholder="search posts..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Tag pills */}
      <div className="tag-pills">
        {allTags.map(tag => (
          <span
            key={tag}
            className={`tag-pill${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Posts */}
      {filtered.length === 0 && (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          No posts match your filter.
        </p>
      )}
      {filtered.map(p => (
        <article key={p.slug} style={{ marginBottom: '2rem' }}>
          <h3>
            <a
              href={`#/blog/${p.slug}`}
              onClick={(e) => { e.preventDefault(); navigate(`/blog/${p.slug}`) }}
              style={{ color: 'var(--accent-primary)', textDecoration: 'none', cursor: 'pointer' }}
            >
              {p.title}
            </a>
          </h3>
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: '0.5rem' }}>
            {p.date} ·{' '}
            <span className="post-tags">
              {p.tags.map(t => (
                <span
                  key={t}
                  className="post-tag"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); setActiveTag(t); setSearch('') }}
                >
                  {t}
                </span>
              ))}
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            {p.excerpt}
          </p>
        </article>
      ))}
    </section>
  )
}
