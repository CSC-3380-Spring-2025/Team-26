"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Header from "../components/header";

export default function Login() {
  const router = useRouter();

  const [userOrEmail, setUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      let email = userOrEmail;

      // 🔍 If input doesn't include "@" assume it's a username
      if (!userOrEmail.includes("@")) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", userOrEmail));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("Username not found.");
          return;
        }

        const userDoc = querySnapshot.docs[0];
        email = userDoc.data().email;
      }

      // 🧠 Use resolved email to log in
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/postlogin-homepage");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-black">Login</h2>

        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md border"
        >
          {/* Username or Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">
              Username or Email
            </label>
            <input
              type="text"
              value={userOrEmail}
              onChange={(e) => setUserOrEmail(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 text-black"
              placeholder="Enter your username or email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => router.push("/register-page")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
