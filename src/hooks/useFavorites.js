// useFavorites: Simple hook to read favorites from the global context
// Keeps components clean by exposing favorites and helper functions
import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'

// Return the shared favorites state (and helpers) for any component
function useFavorites() {
  return useContext(FavoritesContext)
}

export default useFavorites