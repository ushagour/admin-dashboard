import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RoleBasedRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  // Assume user object has a 'role' property
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
} 