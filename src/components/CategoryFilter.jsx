function CategoryFilter({ categories = [], selectedCategory = 'All', onSelectCategory }) {
  const handleChange = (e) => {
    onSelectCategory && onSelectCategory(e.target.value)
  }

  return (
    <div className="mb-4">
      <label className="mr-2 font-medium">Category:</label>
      <select value={selectedCategory} onChange={handleChange} className="border p-2 rounded">
        <option value="All">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter