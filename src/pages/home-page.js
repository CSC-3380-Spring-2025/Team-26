import React from 'react';
import Header from '../components/header';
import SearchBar from '../components/searchbar';
import RecentPost from '../components/recent-post';
import NewPost from '../components/new-post';
import WeeklyTourny from '../components/weekly-tourny';

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <SearchBar />
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4 text-black">Recent Posts</h2>
              <RecentPost />
            </div>
            <div className="w-full lg:w-1/3 space-y-8">
              <NewPost />
              <WeeklyTourny />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
