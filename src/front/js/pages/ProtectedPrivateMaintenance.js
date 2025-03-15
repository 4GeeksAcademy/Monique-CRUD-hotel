import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedPrivateMaintenance = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/loginMaintenance" replace />;
  }

  return children;
};

export default ProtectedPrivateMaintenance;