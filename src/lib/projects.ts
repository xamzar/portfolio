import { getString } from './frontmatter'
import { groupBySlug, resolveEntry, parseFrontmatter } from './content'

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

const projectsBySlug = groupBySlug(modules)

function parseMeta(raw: string): Omit<ProjectMeta, 'slug'> {
  const { data, content } = parseFrontmatter(raw)
  return {
    title: getString(data, 'title'),
    tech: getString(data, 'tech'),
    desc: content.trim(),
    url: getString(data, 'url') || undefined,
    repo: getString(data, 'repo') || undefined,
    status: getString(data, 'status') || undefined,
  }
}

/** All projects for a given language, sorted alphabetically by slug. Falls back to English. */
export function allProjects(lang: string = 'en'): ProjectMeta[] {
  return Object.keys(projectsBySlug)
    .sort()
    .map(slug => {
      const entry = resolveEntry(projectsBySlug[slug], lang)
      const meta = parseMeta(entry.raw)
      return { slug: entry.slug, ...meta }
    })
}

/** Get a single project in the given language (falls back to English). Returns full markdown content. */
export function getProject(
  slug: string,
  lang: string = 'en',
): { meta: ProjectMeta; content: string } | null {
  const entries = projectsBySlug[slug]
  if (!entries) return null
  const entry = resolveEntry(entries, lang)
  const { data, content } = parseFrontmatter(entry.raw)
  return {
    meta: {
      slug: entry.slug,
      title: getString(data, 'title'),
      tech: getString(data, 'tech'),
      desc: content.trim(),
      url: getString(data, 'url') || undefined,
      repo: getString(data, 'repo') || undefined,
      status: getString(data, 'status') || undefined,
    },
    content,
  }
}
