import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
  return (
    <div className="flex mt-4">
      <input
        type="text"
        placeholder="Search for a restaurant or meal..."
        className="flex-grow p-3 border rounded-l-md"
      />
      <button className="bg-blue-600 text-white px-4 rounded-r-md">
        <FaSearch />
      </button>
    </div>
  );
}
