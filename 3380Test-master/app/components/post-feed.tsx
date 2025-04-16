"use client";

import { Star, ThumbsUp } from "lucide-react";
import type React from "react";
import type { Post } from "./new-post";

interface PostFeedProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostFeed: React.FC<PostFeedProps> = ({ posts, setPosts }) => {
  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center gap-4">
            {/* Left: Text Content */}
            <div className="flex-1">
              <h3 className="text-black font-semibold">{post.restaurant}</h3>
              <p className="text-black">{post.meal}</p>

              <div className="flex items-center mt-2">
                {[...Array(post.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center text-blue-500 hover:text-blue-600 mt-2"
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {post.likes} Likes
              </button>
            </div>

            {/* Right: Image */}
            <img
              src={post.image}
              alt={post.meal}
              className="w-28 h-28 object-cover rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
