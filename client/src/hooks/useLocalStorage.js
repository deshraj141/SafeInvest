import { useState, useEffect } from 'react';

/**
 * Custom hook to manage state synchronized with localStorage
 * @param {string} key 
 * @param {any} initialValue 
 * @returns {[any, Function]}
 */
export default function useLocalStorage(key, initialValue) {
  // Initialize state with value from localStorage or fallback
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
