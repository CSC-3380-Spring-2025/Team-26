// Header Component: Displays the navigation bar with links
import type React from "react";
import Link from "next/link";

// Header component following the React Functional Component structure
const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Link */}
        <Link href="/" className="text-2xl font-bold">
          FoodieFinds
        </Link>
        
        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login-page">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
