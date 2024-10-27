// get value from localStorage
export function getLocalStorage<T>(key: string): T | null {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) return null;
  return JSON.parse(storedValue) as T;
}

// set value to localStorage
export function setLocalStorage<T>(key: string, value: T) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// remove item from localStorage
export const removeLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};
