import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    <div className="private-container d-flex justify-content-center vh-100">
      <div className="text-center">
        <h2>¡Bienvenido a la zona Hotel</h2>
            <div><Link to="/listaHoteles">Go to Hoteles</Link></div>
            <div><Link to="/listaBranches">Go to Branches</Link></div>
            <div><Link to="/theme">Go to Theme Form</Link></div>
            <div><Link to="/listaCat">Go to Category Form</Link></div>
            <div><Link to="/hoteltheme">Go to Hotel Theme Form</Link></div>
            <div><Link to="/listaRooms">Go to Room</Link></div>
            <div><Link to="/ListaMaintenance"> Go to Maintenance</Link></div>
            <div><Link to="/houseKeeper">Go to HouseKeeper Form</Link></div>
            <div><Link to="/HouseKeeperTask">Go to House Keeper Task Form</Link></div>
            <div><Link to="/maintenanceTask">Go to Maintenance Task Form</Link></div>
                  
        <button className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default PrivateHotel;