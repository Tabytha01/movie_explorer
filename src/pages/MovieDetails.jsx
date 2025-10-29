// MovieDetails: detailed view of a single show
// Fetches by id, shows metadata, summary, and lets you toggle favorites
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchShowById } from '../utils/api'
import useFavorites from '../hooks/useFavorites'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  // Fetch show details when the route param changes
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true)
        const data = await fetchShowById(id)
        setMovie(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.')
        console.error('Error fetching movie details:', err)
      } finally {
        setLoading(false)
      }
    }

    getMovieDetails()
  }, [id])

  const handleToggleFavorite = () => {
    if (!movie) return
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      const favoriteMovie = {
        id: movie.id,
        name: movie.name,
        image: movie.image,
        genres: movie.genres || [],
        rating: movie.rating,
        premiered: movie.premiered,
        status: movie.status,
        summary: movie.summary,
      }
      addFavorite(favoriteMovie)
    }
  }

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8 flex justify-center'>
        <div className='text-xl'>Loading movie details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
        <div className='mt-4'>
          <Link to='/' className='text-blue-500 hover:underline'>
            &larr; Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>Movie not found</div>
        <div className='mt-4 text-center'>
          <Link to='/' className='text-blue-500 hover:underline'>
            &larr; Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Friendly poster fallback
  const imageUrl =
    movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/500x750?text=No+Image'
  const isFav = isFavorite(movie.id)

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-4'>
        <Link to='/' className='text-blue-500 hover:underline'>
          &larr; Back to Home
        </Link>
      </div>

      {/* Main content card */}
      <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
        <div className='md:flex'>
          {/* Poster section */}
          <div className='md:w-1/3'>
            <img
              src={imageUrl}
              alt={movie.name}
              className='w-full h-auto object-cover'
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/500x750?text=No+Image'
              }}
            />
          </div>

          {/* Text and actions */}
          <div className='md:w-2/3 p-6'>
            <div className='flex justify-between items-start'>
              <h1 className='text-3xl font-bold mb-4'>{movie.name}</h1>
              {/* Favorite toggle */}
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full ${isFav ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8'
                  fill={isFav ? 'currentColor' : 'none'}
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </button>
            </div>

            {/* Rating pill */}
            {movie.rating?.average && (
              <div className='mb-4'>
                <span className='inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold mr-2'>
                  Rating: {movie.rating.average}/10
                </span>
              </div>
            )}

            {/* Genres */}
            <div className='mb-4'>
              <div className='flex flex-wrap gap-2'>
                {movie.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className='bg-gray-200 px-3 py-1 rounded-full text-sm font-semibold text-gray-700'
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick metadata grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
              {movie.premiered && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500'>Premiered</h3>
                  <p>{new Date(movie.premiered).toLocaleDateString()}</p>
                </div>
              )}
              {movie.status && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500'>Status</h3>
                  <p>{movie.status}</p>
                </div>
              )}
              {movie.network?.name && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500'>Network</h3>
                  <p>{movie.network.name}</p>
                </div>
              )}
              {movie.schedule?.days?.length > 0 && (
                <div>
                  <h3 className='text-sm font-semibold text-gray-500'>Schedule</h3>
                  <p>
                    {movie.schedule.days.join(', ')} at {movie.schedule.time || 'N/A'}
                  </p>
                </div>
              )}
            </div>

            {/* Summary (HTML from API may include paragraph tags) */}
            <div className='mb-6'>
              <h2 className='text-xl font-semibold mb-2'>Summary</h2>
              <div className='text-gray-700 leading-relaxed'>
                {movie.summary ? (
                  <div dangerouslySetInnerHTML={{ __html: movie.summary }} />
                ) : (
                  <p>No summary available.</p>
                )}
              </div>
            </div>

            {/* Official site link */}
            {movie.officialSite && (
              <div>
                <a
                  href={movie.officialSite}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  Visit Official Site
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails