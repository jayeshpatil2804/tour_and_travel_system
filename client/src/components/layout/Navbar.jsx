import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Safely decode token to check if user is admin
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === 'admin';
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tours', label: 'Tours' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold text-blue-600">
              TravelNest
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.path}>
                <Link
                  to={link.path}
                  className={`font-medium ${
                    isActiveLink(link.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
            
            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              {token ? (
                <>
                  {isAdmin && (
                    <div>
                      <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                        Admin
                      </Link>
                    </div>
                  )}
                  <div>
                    <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium">
                      My Bookings
                    </Link>
                  </div>
                  <div>
                    <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">
                      Profile
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Login
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/register"
                      className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded font-medium hover:bg-blue-600 hover:text-white"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="py-4 space-y-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 font-medium transition-colors duration-300 ${
                  isActiveLink(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {token ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/my-bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  My Bookings
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-3 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center border-2 border-blue-600 text-blue-600 py-3 rounded font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;