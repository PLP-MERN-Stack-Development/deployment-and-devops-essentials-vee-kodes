import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold">Bug Tracker</h1>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-gray-200">Home</Link>
            {user ? (
              <>
                <Link to="/new-bug" className="hover:text-gray-200">Report Bug</Link>
                <Link to="/bug-list" className="hover:text-gray-200">All Bugs</Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Welcome, {user.username}</span>
                  <button
                    onClick={logout}
                    className="hover:text-gray-200 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:text-gray-200">Login</Link>
                <Link to="/register" className="hover:text-gray-200">Register</Link>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
            <Link to="/" className="block px-3 py-2 text-base font-medium hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
            {user ? (
              <>
                <Link to="/new-bug" className="block px-3 py-2 text-base font-medium hover:text-gray-200" onClick={() => setIsOpen(false)}>Report Bug</Link>
                <Link to="/bug-list" className="block px-3 py-2 text-base font-medium hover:text-gray-200" onClick={() => setIsOpen(false)}>All Bugs</Link>
                <div className="border-t border-blue-600 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-200">Welcome, {user.username}</div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium hover:text-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-blue-600 pt-2 mt-2">
                <Link to="/login" className="block px-3 py-2 text-base font-medium hover:text-gray-200" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="block px-3 py-2 text-base font-medium hover:text-gray-200" onClick={() => setIsOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
