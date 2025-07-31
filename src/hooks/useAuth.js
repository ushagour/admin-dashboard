import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

import { decodeToken } from "react-jwt";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      // Optionally fetch user profile here
      const decoded = decodeToken(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {

    setLoading(true);
    setError(null);
    try {
      const data = await apiLogin(email, password);
      if (data) {
        setToken(data);
        localStorage.setItem('token', data);


          const myDecodedToken = decodeToken(data);
          setUser(myDecodedToken);
        // Optionally redirect or show success message
        window.location.href = '/'; // Redirect to dashboard after login


      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await apiRegister(userData);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 