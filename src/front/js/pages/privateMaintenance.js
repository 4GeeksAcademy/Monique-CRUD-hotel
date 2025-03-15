import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateMaintenance = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loginMaintenance'); // Redirige a la pantalla de login de mantenimiento
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary">Área de Mantenimiento</h2>
        <p className="text-center">Bienvenido al sistema de mantenimiento del hotel.</p>
        <div className="d-flex justify-content-center">
          <button 
            className="btn btn-primary mt-3 px-5 py-2"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateMaintenance;