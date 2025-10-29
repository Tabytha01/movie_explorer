// API helpers: tiny wrappers around the TVMaze API
// Keeps fetch logic tidy and consistent across the app
const BASE = 'https://api.tvmaze.com'

// Search shows by a query string (fallback to popular-like search)
export async function searchShows(query) {
  const q = encodeURIComponent(query || '')
  const url = q ? `${BASE}/search/shows?q=${q}` : `${BASE}/shows?page=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch shows')
  const data = await res.json()
  // Normalize search API shape (search returns { score, show }) to plain show objects
  return Array.isArray(data) ? data.map((item) => item.show || item) : []
}

// Fetch one show by id
export async function fetchShowById(id) {
  const res = await fetch(`${BASE}/shows/${id}`)
  if (!res.ok) throw new Error('Failed to fetch show')
  return res.json()
}