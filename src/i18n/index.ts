/**
 * Auto-discovers all language JSON files in this directory.
 * Adding a new .json file here automatically adds the language —
 * no code changes needed.
 */

const modules = import.meta.glob('./*.json', {
  eager: true,
  import: 'default',
}) as Record<string, Record<string, unknown>>

export type LanguageInfo = {
  code: string
  name: string
  nativeName: string
}

export const languages: LanguageInfo[] = []
export const translations: Record<string, Record<string, unknown>> = {}

for (const [path, data] of Object.entries(modules)) {
  // Skip index.ts itself (not possible since we only glob *.json, but be safe)
  const code = path.replace('./', '').replace('.json', '')
  translations[code] = data
  const meta = (data as Record<string, unknown>).$meta as
    | { name: string; nativeName: string }
    | undefined
  if (meta) {
    languages.push({
      code,
      name: meta.name,
      nativeName: meta.nativeName,
    })
  }
}

/** Resolve a dot-path like "nav.about" into a nested value */
export function resolvePath(
  obj: Record<string, unknown>,
  path: string,
): unknown {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return null
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

/** Resolve a dot-path and return a string, falling back to the key itself */
export function resolveString(
  obj: Record<string, unknown>,
  path: string,
): string | null {
  const val = resolvePath(obj, path)
  return typeof val === 'string' ? val : null
}
