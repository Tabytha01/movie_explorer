import { Link } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'

const Navbar = () => {
  const { favorites } = useFavorites()
  const count = Array.isArray(favorites) ? favorites.length : 0

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Movie Explorer</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/favorites" className="hover:text-gray-300 relative">
            Favorites
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-6 h-6 align-middle">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar