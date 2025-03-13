import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateHotel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  if (!store.auth) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/loginhotel" />;
  }

  const handleLogout = () => {
    actions.logout();
    navigate("/authhotel");
  };

  return (
    <div className="private-container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h2>¡Bienvenido a la zona secreta!</h2>
        <button className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default PrivateHotel;