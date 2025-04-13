import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to home or login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
