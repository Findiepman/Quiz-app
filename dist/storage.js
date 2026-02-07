// src/storage/storage.ts
/**
 * Slaat data op in localStorage
 */
export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Haalt data op uit localStorage
 */
export function loadFromStorage(key) {
    const data = localStorage.getItem(key);
    if (!data)
        return null;
    try {
        return JSON.parse(data);
    }
    catch (error) {
        console.error(`Error parsing storage key "${key}"`, error);
        return null;
    }
}
/**
 * Verwijdert een key uit localStorage
 */
export function removeFromStorage(key) {
    localStorage.removeItem(key);
}
/**
 * Handig voor debuggen / resetten
 */
export function clearStorage() {
    localStorage.clear();
}
//# sourceMappingURL=storage.js.map