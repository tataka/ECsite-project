// components/RequireAdmin.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    alert('管理者としてログインが必要です');
    return <Navigate to="/testLogin" replace />;
  }

  return children;
};

export default RequireAdmin;
