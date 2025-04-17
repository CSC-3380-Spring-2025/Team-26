"use client";

import { useEffect, useState } from "react";
import { auth, db } from "lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import HeaderALog from "../components/headerALog";

interface Post {
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

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>("");
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);

        // 🔍 Get username from Firestore
        const userDoc = await getDoc(doc(db, "users", u.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username || u.email);
        }

        // 📥 Get user's posts
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("user.uid", "==", u.uid));
        const querySnapshot = await getDocs(q);

        const posts: Post[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Post, "id">),
        }));

        setUserPosts(posts);
      } else {
        router.push("/login-page");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeaderALog />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Info Section */}
        <div className="flex items-center justify-between border p-4 rounded-md mb-6">
          <div className="flex items-center space-x-4">
            {/* User Image */}
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white">
              Image
            </div>

            {/* Username */}
            <div>
              <h3 className="text-xl font-bold text-black">
                {username || "User"}
              </h3>
            </div>
          </div>

          {/* Settings Gear */}
          <button className="text-gray-500 hover:text-black">
            <span role="img" aria-label="settings">⚙️</span>
          </button>
        </div>

        {/* User's Post Title */}
        <h2 className="text-2xl font-semibold text-black mb-4">User's Posts</h2>

        {/* Grid of Posts */}
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {userPosts.map((post) => (
              <div key={post.id} className="bg-gray-100 p-4 rounded-md shadow">
                <h4 className="text-lg font-semibold text-black">{post.restaurant}</h4>
                <p className="text-black">{post.meal}</p>

                {/* Caption */}
                {post.caption && (
                  <p className="text-gray-800 mt-2">{post.caption}</p>
                )}

                <img
                  src={post.image}
                  alt={post.meal}
                  className="w-24 h-24 object-cover rounded-md mt-2"
                />
                <p className="text-sm text-gray-600 mt-1">{post.likes} likes</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">You haven't posted anything yet.</p>
        )}
      </main>
    </div>
  );
}
