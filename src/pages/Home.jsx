import { useState, useEffect } from 'react';
import useFetchMovies from '../hooks/useFetchMovies';
import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const { movies, loading, error } = useFetchMovies(searchQuery);
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Extract unique categories from movies
  useEffect(() => {
    if (movies.length > 0) {
      const allGenres = movies.flatMap(movie => movie.genres || []);
      const uniqueGenres = [...new Set(allGenres)];
      setCategories(uniqueGenres);
    }
  }, [movies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('');
  };

  const handleToggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      // Create a consistent movie object structure for favorites
      const favoriteMovie = {
        id: movie.id,
        name: movie.name,
        image: movie.image,
        genres: movie.genres || [],
        rating: movie.rating,
        premiered: movie.premiered,
        status: movie.status,
        summary: movie.summary
      };
      addFavorite(favoriteMovie);
    }
  };

  // Filter movies by category if selected
  const filteredMovies = selectedCategory && selectedCategory !== 'All'
    ? movies.filter(movie => movie.genres?.includes(selectedCategory))
    : movies;

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      
      {categories.length > 0 && (
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading movies...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No movies found</p>
          {searchQuery && (
            <p className="mt-2">Try a different search term or clear filters</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
          {filteredMovies.map(movie => (
            <div key={movie.id} className="movie-card-container">
              <MovieCard
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;