"use client";

import type React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "lib/firebase";

const HeaderALog: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Link */}
        <Link href="/postlogin-homepage" className="text-2xl font-bold">
          FoodieFinds
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/postlogin-homepage">Home</Link>
            </li>
            <li>
              <Link href="/profile-page">Profile</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:underline text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderALog;
