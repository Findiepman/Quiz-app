// src/storage/storage.ts

/**
 * Slaat data op in localStorage
 */
export function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Haalt data op uit localStorage
 */
export function loadFromStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key)
  if (!data) return null

  try {
    return JSON.parse(data) as T
  } catch (error) {
    console.error(`Error parsing storage key "${key}"`, error)
    return null
  }
}

/**
 * Verwijdert een key uit localStorage
 */
export function removeFromStorage(key: string): void {
  localStorage.removeItem(key)
}

/**
 * Handig voor debuggen / resetten
 */
export function clearStorage(): void {
  localStorage.clear()
}
