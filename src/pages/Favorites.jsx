// Favorites: shows saved list, kept in sync via context
// You can jump to a show’s details or remove it from favorites
import useFavorites from '../hooks/useFavorites'
import MovieCard from '../components/MovieCard'

function Favorites() {
  const { favorites } = useFavorites()

  if (!favorites || favorites.length === 0) {
    return (
      <div className='max-w-6xl mx-auto px-4 py-6'>
        <h2 className='text-lg font-semibold text-gray-800'>Favorites</h2>
        <p className='mt-2 text-gray-600'>No favorites yet. Add some from Home!</p>
      </div>
    )
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <h2 className='text-lg font-semibold text-gray-800'>Favorites</h2>
      {/* Grid of saved shows */}
      <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {favorites.map((show) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>
    </div>
  )
}

export default Favorites