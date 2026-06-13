/** Minimal frontmatter parser: extracts YAML between --- markers */
export function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const data: Record<string, any> = {}
  const trimmed = raw.trimStart()
  if (!trimmed.startsWith('---')) return { data, content: trimmed }
  const end = trimmed.indexOf('---', 3)
  if (end === -1) return { data, content: trimmed }
  const head = trimmed.slice(3, end).trim()
  for (const line of head.split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let val: any = line.slice(idx + 1).trim()
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1)
    else if (val.startsWith('[') && val.endsWith(']')) {
      try { val = JSON.parse(val) } catch {
        val = val.slice(1, -1).split(',').map((s: string) => s.trim().replace(/^"(.*)"$/, '$1'))
      }
    }
    data[key] = val
  }
  return { data, content: trimmed.slice(end + 3).trim() }
}
