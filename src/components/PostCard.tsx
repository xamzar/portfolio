import type { PostMeta } from '../lib/posts'

interface PostCardProps {
  post: PostMeta
  onTagClick?: (tag: string) => void
}

export default function PostCard({ post, onTagClick }: PostCardProps) {
  return (
    <article className="post-card">
      <h3>
        <a href={`#/blog/${post.slug}`}>
          {post.title}
        </a>
      </h3>
      <div className="post-meta">
        {post.date}
        {post.tags.length > 0 && (
          <>
            {' · '}
            <span className="post-tags">
              {post.tags.map(t => (
                onTagClick ? (
                  <button
                    key={t}
                    className="post-tag post-tag--clickable"
                    onClick={(e) => { e.stopPropagation(); onTagClick(t) }}
                  >
                    {t}
                  </button>
                ) : (
                  <span key={t} className="post-tag">{t}</span>
                )
              ))}
            </span>
          </>
        )}
      </div>
      {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
    </article>
  )
}
