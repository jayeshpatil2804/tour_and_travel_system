import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // You need to decode the token to check the role, as user from context might not have it
  const decodedToken = jwtDecode(token);
  const isAdmin = decodedToken.role === 'admin';

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;