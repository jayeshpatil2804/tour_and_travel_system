import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = token && jwtDecode(token).role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TravelNest
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
          <Link to="/tours" className="text-gray-600 hover:text-blue-500">Tours</Link>
          {token ? (
            <>
              {isAdmin && <Link to="/admin" className="text-gray-600 hover:text-blue-500">Admin</Link>}
              <Link to="/my-bookings" className="text-gray-600 hover:text-blue-500">My Bookings</Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-500">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-50">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;