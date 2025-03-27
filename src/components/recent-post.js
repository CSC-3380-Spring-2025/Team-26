import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

const mockPosts = [
  {
    id: 1,
    restaurant: "Burger King",
    meal: "Whopper Meal",
    rating: 4,
    likes: 15,
    image: "/placeholder.svg?height=200&width=200",
  },
  
];

const PostFeed = () => {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (id) => {
    setPosts(posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-black font-semibold">{post.restaurant}</h3>
          <p className="text-black">{post.meal}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < post.rating ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <img
            src={post.image || "/placeholder.svg"}
            alt={post.meal}
            className="w-full h-48 object-cover rounded-md my-2"
          />
          <button
            onClick={() => handleLike(post.id)}
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <ThumbsUp className="w-5 h-5 mr-1" />
            {post.likes} Likes
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;