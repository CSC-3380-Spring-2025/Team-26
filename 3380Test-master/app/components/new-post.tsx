"use client";

import { useState, useRef, type FormEvent, useEffect } from "react";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "lib/firebase";
import { User } from "firebase/auth";

export interface Post {
  id: string;
  restaurant: string;
  meal: string;
  rating: number;
  image: string;
  likes: number;
  createdAt: Date;
  caption: string;
  user: {
    uid: string;
    email: string | null;
    username?: string;
  };
}

interface NewPostFormProps {
  onPost: (post: Post) => void;
}

const NewPostForm: React.FC<NewPostFormProps> = ({ onPost }) => {
  const [post, setPost] = useState({
    restaurant: "",
    meal: "",
    rating: 0,
    caption: "",
    photo: null as File | null,
  });

  const [user, setUser] = useState<User | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setUser(auth.currentUser);

    const handlePaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const items = e.clipboardData.items;
      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            setPost((prev) => ({ ...prev, photo: file }));
          }
        }
      }
    };

    const formEl = formRef.current;
    formEl?.addEventListener("paste", handlePaste as any);
    return () => {
      formEl?.removeEventListener("paste", handlePaste as any);
    };
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post.");
      return;
    }

    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    const imageUrl = post.photo ? URL.createObjectURL(post.photo) : "/favicon.ico";

    const newPostData = {
      restaurant: post.restaurant,
      meal: post.meal,
      rating: post.rating,
      caption: post.caption,
      image: imageUrl,
      likes: 0,
      createdAt: new Date(),
      user: {
        uid: user.uid,
        email: user.email,
        username: userData.username || user.displayName || "Anonymous",
      },
    };

    const docRef = await addDoc(collection(db, "posts"), newPostData);

    const newPost: Post = { ...newPostData, id: docRef.id };
    onPost(newPost);

    setPost({ restaurant: "", meal: "", rating: 0, caption: "", photo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-4 mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-black">Share Your Meal</h2>

      {/* Restaurant */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Restaurant</label>
        <input
          type="text"
          value={post.restaurant}
          onChange={(e) => setPost({ ...post, restaurant: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-blue-600 text-black"
        />
      </div>

      {/* Meal */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Meal</label>
        <input
          type="text"
          value={post.meal}
          onChange={(e) => setPost({ ...post, meal: e.target.value })}
          required
          className="mt-1 block w-full rounded-md border border-blue-600 text-black"
        />
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Rating</label>
        <select
          value={post.rating}
          onChange={(e) => setPost({ ...post, rating: Number(e.target.value) })}
          required
          className="mt-1 block w-full rounded-md border border-blue-600 text-black"
        >
          <option value={0}>Select a rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Caption */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">Your Thoughts</label>
        <textarea
          value={post.caption}
          onChange={(e) => setPost({ ...post, caption: e.target.value })}
          placeholder="Write your thoughts about the meal or experience..."
          className="mt-1 block w-full rounded-md border border-blue-600 text-black h-24 resize-none"
        />
      </div>

      {/* Photo Upload */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-black">
          Upload a Photo (or paste from clipboard)
        </label>
        <input
          type="file"
          accept="image/*"
          name="photo"
          ref={fileInputRef}
          onChange={(e) => setPost({ ...post, photo: e.target.files?.[0] || null })}
          className="mt-1 block w-full rounded-md border border-blue-600 text-black"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
};

export default NewPostForm;
