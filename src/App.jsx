// App layout: navbar + routed pages
// Routes are defined inside <Routes> and rendered in <main>
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'

function App() {
  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Top navigation with favorites badge */}
      <Navbar />
      <main>
        {/* Page routes */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
