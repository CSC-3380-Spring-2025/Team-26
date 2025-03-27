const Header = require("./components/header").default;
const SearchBar = require("./components/searchbar").default;
const PostFeed = require("./components/recent-feed").default;
const NewPostForm = require("./components/new-post").default;
const WeeklyTournament = require("./components/weekly-tourny").default;

function Home() {
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

module.exports = Home;
