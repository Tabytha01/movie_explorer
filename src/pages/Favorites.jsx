import useFavorites from '../hooks/useFavorites'
import MovieCard from '../components/MovieCard'

function Favorites() {
  const { favorites, isFavorite, removeFavorite, addFavorite } = useFavorites()

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {Array.isArray(favorites) && favorites.length === 0 ? (
        <p className="text-gray-700">You have 0 favorite movies.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites