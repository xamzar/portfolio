import { parseFrontmatter } from './frontmatter'

export type ProjectMeta = {
  slug: string
  title: string
  tech: string
  desc: string
  url?: string
  repo?: string
  status?: string
}

const modules = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

/** Grouped by slug — each slug has entries per language */
type ProjectEntry = {
  slug: string
  lang: string
  raw: string
}

const projectsBySlug: Record<string, ProjectEntry[]> = {}

for (const [path, raw] of Object.entries(modules)) {
  const filename = path.split('/').pop()!
  // portfolio.md → slug: portfolio, lang: en
  // portfolio.kk.md → slug: portfolio, lang: kk
  const match = filename.match(/^(.+?)(?:\.([a-z]{2}))?\.md$/)
  if (!match) continue
  const slug = match[1]
  const lang = match[2] || 'en'
  if (!projectsBySlug[slug]) projectsBySlug[slug] = []
  projectsBySlug[slug].push({ slug, lang, raw: raw as string })
}

function parseMeta(raw: string): Omit<ProjectMeta, 'slug'> {
  const { data, content } = parseFrontmatter(raw)
  return {
    title: data.title || '',
    tech: data.tech || '',
    desc: content.trim(),
    url: data.url,
    repo: data.repo,
    status: data.status,
  }
}

function resolveEntry(slug: string, lang: string): ProjectEntry | undefined {
  const entries = projectsBySlug[slug]
  if (!entries) return undefined
  return (
    entries.find(e => e.lang === lang) ||
    entries.find(e => e.lang === 'en') ||
    entries[0]
  )
}

/** All projects for a given language, sorted alphabetically by slug. Falls back to English. */
export function allProjects(lang: string = 'en'): ProjectMeta[] {
  return Object.keys(projectsBySlug)
    .sort()
    .map(slug => {
      const entry = resolveEntry(slug, lang)!
      const meta = parseMeta(entry.raw)
      return { slug: entry.slug, ...meta }
    })
}

/** Get a single project in the given language (falls back to English). Returns full markdown content. */
export function getProject(
  slug: string,
  lang: string = 'en',
): { meta: ProjectMeta; content: string } | null {
  const entry = resolveEntry(slug, lang)
  if (!entry) return null
  const { data, content } = parseFrontmatter(entry.raw)
  return {
    meta: {
      slug: entry.slug,
      title: data.title || '',
      tech: data.tech || '',
      desc: content.trim(),
      url: data.url,
      repo: data.repo,
      status: data.status,
    },
    content,
  }
}
