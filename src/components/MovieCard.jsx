// MovieCard: shows a poster, title, rating, and a heart to favorite
// Clicking the card goes to details; clicking the heart toggles favorite only
import { useNavigate } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(movie.id)

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleFavoriteClick = (e) => {
    // Prevent the card’s click from firing when heart is clicked
    e.stopPropagation()
    favorite ? removeFavorite(movie.id) : addFavorite(movie)
  }

  return (
    <div
      onClick={handleCardClick}
      className='cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition p-3 flex flex-col'
    >
      {/* Poster (fallback to a placeholder if missing) */}
      <img
        src={movie.image?.medium || movie.image?.original || '/placeholder-poster.png'}
        alt={movie.name || 'Untitled'}
        className='w-full h-64 object-cover rounded'
        loading='lazy'
      />

      {/* Title + Favorite toggle */}
      <div className='mt-3 flex items-center justify-between'>
        <h3 className='text-sm font-medium text-gray-800'>{movie.name}</h3>
        <button
          onClick={handleFavoriteClick}
          aria-pressed={favorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`text-lg ${favorite ? 'text-red-500' : 'text-gray-400'} hover:scale-105 transition`}
        >
          {favorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Optional rating */}
      {movie.rating?.average && (
        <p className='mt-1 text-xs text-gray-600'>Rating: {movie.rating.average}</p>
      )}
    </div>
  )
}

export default MovieCard