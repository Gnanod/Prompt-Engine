export function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

export function pickTwoDistinct<T>(items: T[]): [T, T] {
  const first = Math.floor(Math.random() * items.length)
  let second = Math.floor(Math.random() * items.length)
  while (second === first) second = Math.floor(Math.random() * items.length)
  return [items[first], items[second]]
}

export function pickExtras<T>(items: T[]): T[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5)
  const count = Math.random() < 0.5 ? 1 : 2
  return shuffled.slice(0, count)
}

export async function sha256(input: string) {
  const msgUint8 = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
