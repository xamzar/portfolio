import { parseFrontmatter } from '../lib/frontmatter'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const modules = import.meta.glob('../content/blog/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

interface BlogPostProps {
  slug: string
  navigate: (path: string) => void
}

export default function BlogPost({ slug, navigate }: BlogPostProps) {
  const entry = Object.entries(modules).find(
    ([path]) => path.split('/').pop()?.replace('.md', '') === slug
  )

  if (!entry) {
    return (
      <section style={{ marginTop: '3rem' }}>
        <h2 className="section-title">// not found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
          Post not found.{' '}
          <a
            href="#/blog"
            onClick={(e) => { e.preventDefault(); navigate('/blog') }}
            style={{ color: 'var(--accent-primary)', cursor: 'pointer' }}
          >
            Back to blog
          </a>
        </p>
      </section>
    )
  }

  const [, raw] = entry
  const { data, content } = parseFrontmatter(raw as string)

  return (
    <article style={{ marginTop: '3rem' }}>
      <a
        href="#/blog"
        onClick={(e) => { e.preventDefault(); navigate('/blog') }}
        style={{ color: 'var(--text-secondary)', fontSize: 12, display: 'block', marginBottom: '1rem', cursor: 'pointer' }}
      >
        ← Back to blog
      </a>
      <h1>{data.title}</h1>
      <div style={{ color: 'var(--text-secondary)', fontSize: 12, marginBottom: '2rem' }}>
        {data.date} ·{' '}
        <span className="post-tags">
          {(data.tags || []).map((t: string) => (
            <span key={t} className="post-tag">{t}</span>
          ))}
        </span>
      </div>
      <div className="blog-content">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    </article>
  )
}
