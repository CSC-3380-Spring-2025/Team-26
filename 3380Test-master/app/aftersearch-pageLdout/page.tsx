"use client";

import Header from "../components/header";
import SearchBar from "../components/search-bar";

const AfterSearchPageLdout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <div className="mt-8 px-4 justify-center">
        <SearchBar />
      </div>
      

      {/* Page Title */}
      <h2 className="text-2xl font-bold text-center text-black mt-10 mb-6">
        Related Post
      </h2>

      {/* Post Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-6 pb-10">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-md shadow-md p-4 text-sm text-black"
          >
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AfterSearchPageLdout;