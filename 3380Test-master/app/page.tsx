"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Header from "./components/header";
import NewPostForm, { Post as BasicPost } from "./components/new-post";
import PostFeed from "./components/post-feed";
import SearchBar from "./components/search-bar";
import WeeklyTournament from "./components/weekly-tournament";
import { db } from "lib/firebase";
import Link from "next/link";

interface Post extends BasicPost {
  likes: number;
  createdAt: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const addPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-black">Recent Posts</h2>
            <PostFeed posts={posts} setPosts={setPosts} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-black">Create an Account to Post</h3>
            <Link href = "/login-page">  
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Post
              </button>
            </Link>
            <WeeklyTournament />
          </div>
        </div>
      </main>
    </div>
  );
}
