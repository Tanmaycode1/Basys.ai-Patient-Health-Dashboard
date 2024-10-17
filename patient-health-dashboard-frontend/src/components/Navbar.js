// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Health Dashboard
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white sm:hidden focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <div className={`hidden sm:flex items-baseline space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
              <Link to="/" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/patients" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Patients
              </Link>
              <Link to="/review-authorizations" className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Review Authorizations
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <Link to="/" className="block text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Dashboard
          </Link>
          <Link to="/patients" className="block text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Patients
          </Link>
          <Link to="/review-authorizations" className="block text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Review Authorizations
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-gray-300 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
