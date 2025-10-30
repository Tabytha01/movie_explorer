import { useEffect, useState } from 'react'
import { searchShows } from '../utils/api'

function useFetchMovies(searchQuery = '') {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError('')
      try {
        const data = await searchShows(searchQuery)
        if (!cancelled) {
          setMovies(Array.isArray(data) ? data : [])
        }
      } catch (e) {
        if (!cancelled) {
          setError('Failed to load movies')
          setMovies([])
          console.error('useFetchMovies error:', e)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [searchQuery])

  return { movies, loading, error }
}

export default useFetchMovies