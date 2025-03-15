import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PrivateUser = () => {
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
        <h2>¡Bienvenido a la zona de Usuario</h2>
        
            <div><Link to="/listaHoteles">Go to Hoteles</Link></div>
            <div><Link to="/listaBranches">Go to Branches</Link></div>
            
            

        <button className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default PrivateUser;