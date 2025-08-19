import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/api'; // Corrected import path

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // 1. Add state for the token itself
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Check if token is expired
        if (decodedUser.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          return;
        }
        setUser(decodedUser);
      } catch (error) {
        console.error('Invalid token found, clearing:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken); // Update token state
    const decodedUser = jwtDecode(newToken);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null); // Clear token state
    setUser(null);
  };

  // 2. Provide the token in the context value
  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};