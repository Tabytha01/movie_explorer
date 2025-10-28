import { useParams } from 'react-router-dom'

function MovieDetails() {
  const { id } = useParams()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Movie Details</h1>
      <p className="text-gray-700">Showing details for movie ID: {id}</p>
    </div>
  )
}

export default MovieDetails