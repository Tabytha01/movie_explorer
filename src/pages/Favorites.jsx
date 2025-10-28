import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'

function Favorites() {
  const { favorites, removeFavorite, isFavorite } = useFavorites()

  const handleRemove = (id) => {
    removeFavorite(id)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {Array.isArray(favorites) && favorites.length === 0 ? (
        <p className="text-gray-700">No favorites saved yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <li key={fav.id} className="bg-white rounded-lg shadow p-3">
              <Link to={`/movie/${fav.id}`} className="font-medium hover:text-blue-600">
                {fav.name || 'Untitled'}
              </Link>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {fav.genres?.slice(0, 2).join(', ') || 'Unknown genre'}
                </span>
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favorites