// Navbar: simple top bar with navigation links
// Shows a live badge with your favorites count
import { Link, NavLink } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites'

function Navbar() {
  const { favorites } = useFavorites()
  const count = favorites?.length || 0

  return (
    <nav className='bg-white shadow sticky top-0 z-10'>
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Brand / Home */}
        <Link to='/' className='text-xl font-semibold text-blue-600'>
          Movie Explorer
        </Link>

        {/* Links */}
        <div className='flex items-center gap-6'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`
            }
          >
            Home
          </NavLink>

          {/* Favorites link with count badge */}
          <NavLink
            to='/favorites'
            className={({ isActive }) =>
              `relative text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-700'}`
            }
          >
            Favorites
            {/* Badge: only show when there’s at least one favorite */}
            {count > 0 && (
              <span
                aria-label={`You have ${count} favorite${count === 1 ? '' : 's'}`}
                className='ml-2 inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs px-2 py-0.5'
              >
                {count}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar