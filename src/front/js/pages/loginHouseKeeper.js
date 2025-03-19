import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarLogin from '../component/sidebarLogin';

const LoginHouseKeeper = () => {
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
      const response = await fetch(`${backendUrl}api/loginHouseKeeper`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/privateHouseKeeper');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Algo salió mal. Intenta nuevamente.'}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al intentar iniciar sesión, por favor intenta más tarde.');
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SidebarLogin />

      {/* Contenido - Formulario en el centro */}
      <div className="container d-flex flex-column align-items-center" style={{ maxWidth: "500px", marginTop: "50px" }}>
        <h2 className="text-center mb-4">Login Housekeeper</h2>

        <div className="w-100">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button className="btn w-100 mb-4" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }} onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>

        {/* Imagen debajo del botón */}
        <img
          src="https://res.cloudinary.com/dnftnyi5g/image/upload/v1742389854/DALL_E_2025-03-19_14.10.41_-_An_illustration_of_five_hotel_cleaning_staff_members_in_a_modern_hotel_environment_wearing_uniforms_in_shades_of_lilac_purple_and_navy_blue._Each_s_kznes4.webp"
          alt="Personal de limpieza del hotel"
          style={{ width: "100%", maxWidth: "800px", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
};

export default LoginHouseKeeper;
