import { parseFrontmatter } from '../lib/frontmatter'

type PostMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

const modules = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

const posts: PostMeta[] = Object.entries(modules)
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

interface BlogProps {
  navigate: (path: string) => void
}

export default function Blog({ navigate }: BlogProps) {
  return (
    <section style={{ marginTop: '3rem' }}>
      <h2 className="section-title">// blog</h2>
      {posts.length === 0 && (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          No posts yet — coming soon.
        </p>
      )}
      {posts.map(p => (
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
            {p.date} · {p.tags.join(', ')}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            {p.excerpt}
          </p>
        </article>
      ))}
    </section>
  )
}
