import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarLogin from '../component/sidebarLogin';

const LoginMaintenance = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor ingresa tu email y contraseña');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}api/loginMaintenance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/privateMaintenance');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Credenciales incorrectas. Intenta nuevamente.'}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un problema al intentar iniciar sesión. Inténtalo más tarde.');
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SidebarLogin />

      {/* Contenido - Formulario en el centro */}
      <div className="container d-flex flex-column align-items-center text-center" style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h2 className="text-center mb-4">Login Mantenimiento</h2>

        <div className="w-100">
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button className="btn w-100 mb-4" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }} onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>

        {/* Imagen completamente centrada debajo del botón */}
        <div className="d-flex justify-content-center">
          <img
            src="https://res.cloudinary.com/dnftnyi5g/image/upload/v1742391521/DALL_E_2025-03-19_14.38.26_-_An_illustration_of_maintenance_staff_members_working_in_a_hotel_environment._One_technician_is_holding_a_toolbox_another_is_using_a_mobile_device_an_hwhqvh.webp"
            alt="Personal de mantenimiento del hotel"
            className="img-fluid"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginMaintenance;
