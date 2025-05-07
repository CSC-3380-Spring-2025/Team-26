"use client";

import HeaderALog from "../components/headerALog";
import SearchBar from "../components/search-bar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase";
import type { Post } from "../components/new-post";

const AfterSearchPageLdin: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"));
      const allPosts = snapshot.docs.map(doc => doc.data() as Post);

      const filtered = allPosts.filter(
        (post) =>
          post.restaurant.toLowerCase().includes(query) ||
          post.meal.toLowerCase().includes(query)
      );

      setResults(filtered);
    };

    if (query) {
      fetchPosts();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      <HeaderALog />

      {/* Search Bar */}
      <div className="mt-8 px-4 justify-center">
        <SearchBar />
      </div>

      {/* Page Title */}
      <h2 className="text-2xl font-bold text-center text-black mt-10 mb-6">
        Related Post{results.length !== 1 ? "s" : ""}
      </h2>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-6 pb-10">
        {results.length > 0 ? (
          results.map((post, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-md shadow-md p-4 text-black"
            >
              {/* Restaurant */}
              <h3 className="font-bold text-lg">{post.restaurant}</h3>

              {/* Posted by */}
              <p className="text-sm text-gray-600 italic mb-1">
                Posted by: {post.user?.username || "Unknown"}
              </p>

              {/* Meal & Rating */}
              <p className="text-sm text-gray-800">Meal: {post.meal}</p>
              <p className="text-sm text-gray-800">Rating: {post.rating}</p>

              {/* Caption */}
              {post.caption && (
                <p className="text-sm text-gray-700 mt-2 italic">
                  "{post.caption}"
                </p>
              )}

              {/* Image */}
              <img
                src={post.image}
                alt={post.meal}
                className="w-40 h-40 object-cover rounded-md mt-2"
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default AfterSearchPageLdin;
