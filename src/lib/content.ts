/**
 * Shared content-loading utilities for markdown-driven content (blog posts, projects).
 * Handles import.meta.glob, filename parsing, and language fallback resolution.
 */

import { parseFrontmatter } from './frontmatter'

export interface ContentEntry {
  slug: string
  lang: string
  raw: string
}

/**
 * Parse a markdown filename into slug + language.
 *   hello-world.md      → { slug: "hello-world", lang: "en" }
 *   hello-world.kk.md   → { slug: "hello-world", lang: "kk" }
 */
const FILENAME_RE = /^(.+?)(?:\.([a-z]{2}))?\.md$/

export function parseFilename(filename: string): { slug: string; lang: string } | null {
  const match = filename.match(FILENAME_RE)
  if (!match) return null
  return { slug: match[1], lang: match[2] || 'en' }
}

/**
 * Group raw markdown imports by slug → entries per language.
 * Accepts Record<string, string> from import.meta.glob.
 */
export function groupBySlug(modules: Record<string, string>): Record<string, ContentEntry[]> {
  const bySlug: Record<string, ContentEntry[]> = {}
  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop()!
    const parsed = parseFilename(filename)
    if (!parsed) continue
    if (!bySlug[parsed.slug]) bySlug[parsed.slug] = []
    bySlug[parsed.slug].push({ slug: parsed.slug, lang: parsed.lang, raw })
  }
  return bySlug
}

/**
 * Resolve the best entry for a given language.
 * Falls back: exact lang → English → first available.
 */
export function resolveEntry(entries: ContentEntry[], lang: string): ContentEntry {
  return (
    entries.find(e => e.lang === lang) ||
    entries.find(e => e.lang === 'en') ||
    entries[0]
  )
}

/** Re-export for convenience */
export { parseFrontmatter }
