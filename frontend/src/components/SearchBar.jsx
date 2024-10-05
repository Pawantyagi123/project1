import React from 'react'

export default function SearchBar({searchTerm,setSearchTerm}) {
  return (
    <div className="mb-4">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search users by name"
      className="w-72 p-2 border border-gray-300 rounded-md"
    />
  </div>
  )
}
