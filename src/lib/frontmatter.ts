/** Minimal frontmatter parser: extracts YAML between --- markers */
export function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
  const data: Record<string, string | string[]> = {}
  const trimmed = raw.trimStart()
  if (!trimmed.startsWith('---')) return { data, content: trimmed }
  const end = trimmed.indexOf('---', 3)
  if (end === -1) return { data, content: trimmed }
  const head = trimmed.slice(3, end).trim()
  for (const line of head.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const rawVal = line.slice(idx + 1).trim()
    let val: string | string[] = rawVal
    if (rawVal.startsWith('"') && rawVal.endsWith('"')) {
      val = rawVal.slice(1, -1)
    } else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
      try {
        val = JSON.parse(rawVal) as string[]
      } catch {
        val = rawVal.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^"(.*)"$/, '$1')).filter(Boolean)
      }
    }
    data[key] = val
  }
  return { data, content: trimmed.slice(end + 3).trim() }
}

/** Extract a string value from parsed frontmatter data, with fallback. */
export function getString(data: Record<string, string | string[]>, key: string, fallback = ''): string {
  const val = data[key]
  return typeof val === 'string' ? val : fallback
}

/** Extract a string array from parsed frontmatter data. */
export function getStrings(data: Record<string, string | string[]>, key: string): string[] {
  const val = data[key]
  return Array.isArray(val) ? val : []
}
