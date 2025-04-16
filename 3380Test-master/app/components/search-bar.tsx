"use client";

import { useState, type FormEvent } from "react";
import type React from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "lib/firebase";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;

    console.log("Searching for:", search);
    console.log("User is logged in:", !!user);

    if (user) {
      router.push("/aftersearch-pageLdin");
    } else {
      router.push("/aftersearch-pageLdout");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        placeholder="Search for a restaurant or meal..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-l-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black"
        aria-label="Search input"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          aria-label="Search button"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => alert("Filter coming soon!")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Filter
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
