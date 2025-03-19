import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"; // Importar Link

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

    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await fetch(`${backendUrl}api/loginHouseKeeper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
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
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9b5de5" }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white fs-2" to="/">APIHOTEL</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/authhotel">Hotel Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/loginHouseKeeper">Housekeeper Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fs-5" to="/loginMaintenance">Maintenance Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="d-flex justify-content-center align-items-center vh-90">
        <div className="container" style={{ width: "500px" }}>
          <h2 className="text-center mb-4 mt-5">Iniciar sesión</h2>
          <div className="mb-3">
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
          <div className="mb-3">
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
          <button className="btn w-100" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}onClick={handleLogin}>
           Login
          </button>
          <div className="mt-3 text-center">
            <button className="btn btn-link" onClick={() => navigate('/signupHouseKeeper')}>
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginHouseKeeper;