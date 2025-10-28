import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'movieFavorites'

function useFavorites() {
  const [favorites, setFavorites] = useState([])

  // Load favorites on mount
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

  // Persist favorites on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e)
    }
  }, [favorites])

  const addFavorite = useCallback((movie) => {
    if (!movie || !movie.id) return
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev
      return [...prev, movie]
    })
  }, [])

  const removeFavorite = useCallback((movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId))
  }, [])

  const isFavorite = useCallback((movieId) => {
    return favorites.some((m) => m.id === movieId)
  }, [favorites])

  return { favorites, addFavorite, removeFavorite, isFavorite }
}

export default useFavorites