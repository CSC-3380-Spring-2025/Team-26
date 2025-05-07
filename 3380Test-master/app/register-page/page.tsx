"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "lib/firebase";
import Header from "../components/header";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 🧠 Update Firebase Auth user profile with displayName
      await updateProfile(user, {
        displayName: username,
      });

      // 🔥 Save full user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
        uid: user.uid,
        createdAt: new Date(),
      });

      router.push("/login-page");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-black">Create an Account</h2>
        <form
          onSubmit={handleRegister}
          className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md border"
        >
          {/* Username */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 text-black"
              placeholder="Choose a username"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400 text-black"
              placeholder="Enter your email"
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
              placeholder="Create a password"
              required
            />
          </div>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => router.push("/login-page")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Back to Login
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
