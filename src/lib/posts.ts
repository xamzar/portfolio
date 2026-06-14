import { parseFrontmatter } from './frontmatter'

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

/** Grouped by slug — each slug has entries per language */
type PostEntry = {
  slug: string
  lang: string
  raw: string
}

const postsBySlug: Record<string, PostEntry[]> = {}

for (const [path, raw] of Object.entries(modules)) {
  const filename = path.split('/').pop()!
  // hello-world.md → slug: hello-world, lang: en
  // hello-world.kk.md → slug: hello-world, lang: kk
  const match = filename.match(/^(.+?)(?:\.([a-z]{2}))?\.md$/)
  if (!match) continue
  const slug = match[1]
  const lang = match[2] || 'en'
  if (!postsBySlug[slug]) postsBySlug[slug] = []
  postsBySlug[slug].push({ slug, lang, raw: raw as string })
}

function parseMeta(raw: string) {
  const { data } = parseFrontmatter(raw)
  return {
    title: data.title || '',
    date: data.date || '',
    tags: (data.tags || []) as string[],
    excerpt: data.excerpt || '',
  }
}

/** All posts for a given language, sorted newest first. Falls back to English. */
export function allPosts(lang: string = 'en'): PostMeta[] {
  return Object.values(postsBySlug)
    .map(entries => {
      const entry =
        entries.find(e => e.lang === lang) ||
        entries.find(e => e.lang === 'en') ||
        entries[0]
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
  const entry =
    entries.find(e => e.lang === lang) ||
    entries.find(e => e.lang === 'en') ||
    entries[0]
  const { data, content } = parseFrontmatter(entry.raw)
  return {
    meta: {
      slug: entry.slug,
      title: data.title || '',
      date: data.date || '',
      tags: (data.tags || []) as string[],
      excerpt: data.excerpt || '',
    },
    content,
  }
}
