const TYPE_PREFIXES = [
  "Городская сумка",
  "Поясная сумка",
  "Сумка",
  "Мессенджер",
  "Рюкзак",
]

/**
 * Extract the model family key from a product name.
 * "Городская сумка TOKEN Color" → "TOKEN"
 * "Городская сумка TOKEN Grid"  → "TOKEN"
 * "Сумка VORTEX"               → "VORTEX"
 */
export function extractModelKey(name: string): string {
  let remainder = name
  for (const prefix of TYPE_PREFIXES) {
    if (name.startsWith(prefix)) {
      remainder = name.slice(prefix.length).trim()
      break
    }
  }
  return remainder.split(/\s+/)[0]
}
