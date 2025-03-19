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
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9b5de5" }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white fs-2" to="/">APIHOTEL</Link>
          <button className="btn btn-light mt-3" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar" style={{ width: "250px", backgroundColor: "#9b5de5", minHeight: "100vh" }}>
          <div className="d-flex flex-column align-items-start p-3">
            <h4 className="text-white mb-4">Hotel Dashboard</h4>
            <Link className="nav-link text-white" to="/listaHoteles">Go to Hoteles</Link>
            <Link className="nav-link text-white" to="/listaBranches">Go to Branches</Link>
            <Link className="nav-link text-white" to="/theme">Go to Theme Form</Link>
            <Link className="nav-link text-white" to="/listaCat">Go to Category Form</Link>
            <Link className="nav-link text-white" to="/hoteltheme">Go to Hotel Theme Form</Link>
            <Link className="nav-link text-white" to="/listaRooms">Go to Room</Link>
            <Link className="nav-link text-white" to="/ListaMaintenance">Go to Maintenance</Link>
            <Link className="nav-link text-white" to="/houseKeeper">Go to HouseKeeper Form</Link>
            <Link className="nav-link text-white" to="/HouseKeeperTask">Go to House Keeper Task Form</Link>
            <Link className="nav-link text-white" to="/maintenanceTask">Go to Maintenance Task Form</Link>

          </div>
        </div>

        {/* Main Content */}
        <div className="main-content flex-fill p-4">
          {/* Texto centrado */}
          <div className="text-center">
            <h2>¡Bienvenido a la zona Hotel</h2>

            {/* Logo del hotel debajo de la frase */}
            <div>
              <img
                src="https://res.cloudinary.com/dnftnyi5g/image/upload/v1742292824/DALL_E_2025-03-18_10.06.33_-_A_logo_design_for_a_hotel_management_project_called_APIHOTEL._The_logo_should_have_a_modern_and_professional_style_featuring_a_shade_of_lilac_similar_huhask_Square_naq329.webp"
                alt="Logo del Hotel"
                style={{ width: "350px", height: "auto" }}
              />

            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default PrivateHotel;
