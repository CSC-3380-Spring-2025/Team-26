"use client";

import { useEffect, useState } from "react";
import { auth } from "lib/firebase";
import { useRouter } from "next/navigation";
import HeaderALog from "../components/headerALog";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
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
                {user ? user.email : "User Name"}
              </h3>
            </div>
          </div>

          {/* Settings Gear */}
          <button className="text-gray-500 hover:text-black">
            <span role="img" aria-label="settings">⚙️</span>
          </button>
        </div>

        {/* User's Post Filter/Search Bar */}
        <input
          type="text"
          placeholder="User's Post"
          className="w-full border px-4 py-2 rounded-md mb-6"
        />

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Repeat these as real data later */}
          <div className="h-40 bg-gray-200 rounded-md" />
          <div className="h-40 bg-gray-200 rounded-md" />
          <div className="h-40 bg-gray-200 rounded-md" />
        </div>
      </main>
    </div>
  );
}
