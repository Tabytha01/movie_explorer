import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  // Handle missing image
  const imageUrl = movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image';
  
  // Handle missing data
  const rating = movie.rating?.average ? `${movie.rating.average}/10` : 'Not rated';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 border border-gray-200">
      <Link to={`/movie/${movie.id}`} className="block relative">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={movie.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/210x295?text=No+Image';
            }}
          />
          <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white px-2 py-1 m-2 rounded">
            {rating}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 line-clamp-1">{movie.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 line-clamp-1">
            {movie.genres?.slice(0, 2).join(', ') || 'Unknown genre'}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(movie);
            }}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-red-500' : 'text-gray-400'
            } hover:bg-gray-100`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;