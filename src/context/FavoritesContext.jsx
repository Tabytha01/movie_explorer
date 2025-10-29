// FavoritesContext: Central place to store favorites across the app
// - Persists to localStorage so your favorites survive page refreshes
// - Exposes helpers: addFavorite, removeFavorite, isFavorite
import { createContext, useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'movieFavorites'

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
})

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // On app load: read any saved favorites from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setFavorites(parsed)
      }
    } catch (e) {
      console.error('Failed to read favorites from localStorage', e)
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  // Whenever favorites change: write them back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e)
    }
  }, [favorites])

  // Add a show if it isn’t already saved
  const addFavorite = useCallback((movie) => {
    if (!movie || !movie.id) return
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }, [])

  // Remove a show by id
  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
  }, [])

  // Check if a show id exists in favorites
  const isFavorite = useCallback((movieId) => {
    return favorites.some((m) => m.id === movieId)
  }, [favorites])

  const value = { favorites, addFavorite, removeFavorite, isFavorite }

  // Provide favorites state and helpers to the whole app
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider