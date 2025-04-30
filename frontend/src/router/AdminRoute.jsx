// frontend/src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
