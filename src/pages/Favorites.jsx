import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import CategoryFilter from '../components/CategoryFilter';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load favorites directly from localStorage
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('movieFavorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
        console.log('Favorites loaded in Favorites page:', JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Extract unique categories from favorite movies
  const categories = [...new Set(favorites.flatMap(movie => movie.genres || []))];

  const handleToggleFavorite = (movie) => {
    try {
      // Remove from favorites
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      setFavorites(updatedFavorites);
      
      // Update localStorage
      localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites));
      console.log('Removed from favorites:', movie.id);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  // Filter favorites by category if selected
  const filteredFavorites = selectedCategory
    ? favorites.filter(movie => movie.genres?.includes(selectedCategory))
    : favorites;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">You have no favorite movies yet</p>
          <p className="mt-2">Go to the <Link to="/" className="text-blue-600 hover:underline">home page</Link> and add some movies to your favorites</p>
        </div>
      ) : (
        <>
          {categories.length > 0 && (
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )}

          {filteredFavorites.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No favorites in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFavorites.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;