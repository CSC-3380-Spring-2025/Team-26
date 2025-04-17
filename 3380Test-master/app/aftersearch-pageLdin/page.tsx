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

      <div className="mt-8 px-4 justify-center">
        <SearchBar />
      </div>

      <h2 className="text-2xl font-bold text-center text-black mt-10 mb-6">
        Related Post{results.length !== 1 ? "s" : ""}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 px-6 pb-10">
        {results.length > 0 ? (
          results.map((post, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-md shadow-md p-4 text-black"
            >
              <h3 className="font-bold">{post.restaurant}</h3>
              <p>Meal: {post.meal}</p>
              <p>Rating: {post.rating}</p>
              <img
                src={post.image}
                alt={post.meal}
                className="mt-2 w-full rounded-md"
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
