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
      className='group cursor-pointer bg-white/90 backdrop-blur rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-4 flex flex-col relative overflow-hidden animate-fade-in'
    >
      {/* Overlay effect on hover */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>

      {/* Poster with enhanced styling */}
      <div className='relative aspect-[2/3] overflow-hidden rounded-lg'>
        <img
          src={movie.image?.medium || movie.image?.original || '/placeholder-poster.png'}
          alt={movie.name || 'Untitled'}
          className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300'
          loading='lazy'
        />
      </div>

      {/* Content container */}
      <div className='mt-4 flex-1 flex flex-col'>
        {/* Title + Favorite toggle */}
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-base font-semibold text-gray-900 leading-tight group-hover:text-[#2A2F4F] transition-colors'>
            {movie.name}
          </h3>
          <button
            onClick={handleFavoriteClick}
            aria-pressed={favorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            className={`text-xl transform hover:scale-110 transition-transform ${
              favorite ? 'text-[#E5BEEC]' : 'text-gray-400'
            }`}
          >
            {favorite ? '♥' : '♡'}
          </button>
        </div>

        {/* Rating with enhanced styling */}
        {movie.rating?.average && (
          <div className='mt-2 flex items-center gap-1'>
            <span className='text-yellow-500'>★</span>
            <span className='text-sm text-gray-700'>{movie.rating.average}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieCard