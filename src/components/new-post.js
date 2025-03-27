import { useState } from "react";

const NewPostForm = () => {
  const [post, setPost] = useState({
    restaurant: "",
    meal: "",
    rating: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement post submission logic here
    console.log("New post:", post);
    // Reset form
    setPost({ restaurant: "", meal: "", rating: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-bold mb-4 text-black">Share Your Meal</h2>

      <div className="mb-4">
        <label htmlFor="restaurant" className="block text-sm font-medium text-black">
          Restaurant
        </label>
        <input
          type="text"
          id="restaurant"
          value={post.restaurant}
          onChange={(e) => setPost({ ...post, restaurant: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="meal" className="block text-sm font-medium text-gray-700">
          Meal
        </label>
        <input
          type="text"
          id="meal"
          value={post.meal}
          onChange={(e) => setPost({ ...post, meal: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <select
          id="rating"
          value={post.rating}
          onChange={(e) => setPost({ ...post, rating: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-700"
          required
        >
          <option value={0} className="text-gray-700">Select a rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className="text-gray-700">
              {num} Star{num !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Post
      </button>
    </form>
  );
};

export default NewPostForm;