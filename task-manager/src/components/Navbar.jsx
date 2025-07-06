import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; 

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-2 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          My App
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="hover:text-gray-300">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/posts" className="hover:text-gray-300">
              Posts
            </Link>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;