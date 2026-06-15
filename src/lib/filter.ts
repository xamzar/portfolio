/**
 * Generic search + tag filter. Returns items matching both the text query
 * (checked against any string-valued field in `searchKeys`) and the optional
 * active tag (checked against the array-valued field `tagKey`).
 */
export function filterItems<T>(
  items: T[],
  search: string,
  searchKeys: (keyof T)[],
  activeTag?: string | null,
  tagKey?: keyof T,
): T[] {
  const q = search.toLowerCase()

  return items.filter(item => {
    // Tag filter
    if (activeTag && tagKey) {
      const tags = item[tagKey]
      if (!Array.isArray(tags) || !tags.includes(activeTag)) return false
    }

    // Text search
    if (!q) return true
    return searchKeys.some(key => {
      const val = item[key]
      return typeof val === 'string' && val.toLowerCase().includes(q)
    })
  })
}
