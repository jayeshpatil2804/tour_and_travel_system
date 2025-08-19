import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import api from '../api/api';

const AdminRoute = () => {
  const { token, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // If user data is available in context, check role directly
        if (user && user.role) {
          setIsAdmin(user.role === 'admin');
          setLoading(false);
          return;
        }

        // Otherwise, decode token and fetch user data
        const decodedToken = jwtDecode(token);
        const response = await api.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setIsAdmin(response.data.role === 'admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [token, user]);

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin-login" replace />;
};

export default AdminRoute;