import React, { useEffect } from "react";
import { app, analytics } from "./firebase-config";

//  Import your homepage component
import Header from "./components/header";
import SearchBar from "./components/searchbar";
import PostFeed from "./components/recent-post"; // not recent-feed.js as in your example
import NewPostForm from "./components/new-post";
import WeeklyTournament from "./components/weekly-tourny";

function App() {
  useEffect(() => {
    console.log("Firebase is initialized!");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-black">Recent Posts</h2>
            <PostFeed />
          </div>
          <div>
            <NewPostForm />
            <WeeklyTournament />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

