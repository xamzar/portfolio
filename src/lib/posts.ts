import { getString, getStrings } from './frontmatter'
import { groupBySlug, resolveEntry, parseFrontmatter } from './content'

export type PostMeta = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
}

const modules = import.meta.glob('../content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const postsBySlug = groupBySlug(modules)

function parseMeta(raw: string) {
  const { data } = parseFrontmatter(raw)
  return {
    title: getString(data, 'title'),
    date: getString(data, 'date'),
    tags: getStrings(data, 'tags'),
    excerpt: getString(data, 'excerpt'),
  }
}

/** All posts for a given language, sorted newest first. Falls back to English. */
export function allPosts(lang: string = 'en'): PostMeta[] {
  return Object.values(postsBySlug)
    .map(entries => {
      const entry = resolveEntry(entries, lang)
      const meta = parseMeta(entry.raw)
      return { slug: entry.slug, ...meta }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** All unique tags across all languages. */
export function allTags(): string[] {
  const set = new Set<string>()
  for (const entries of Object.values(postsBySlug)) {
    for (const entry of entries) {
      const meta = parseMeta(entry.raw)
      meta.tags.forEach(t => set.add(t))
    }
  }
  return [...set].sort()
}

/** Get a single post in the given language (falls back to English). */
export function getPost(
  slug: string,
  lang: string = 'en',
): { meta: PostMeta; content: string } | null {
  const entries = postsBySlug[slug]
  if (!entries) return null
  const entry = resolveEntry(entries, lang)
  const { data, content } = parseFrontmatter(entry.raw)
  return {
    meta: {
      slug: entry.slug,
      title: getString(data, 'title'),
      date: getString(data, 'date'),
      tags: getStrings(data, 'tags'),
      excerpt: getString(data, 'excerpt'),
    },
    content,
  }
}
