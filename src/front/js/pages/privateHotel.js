import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../component/sidebar";

const PrivateHotel = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  if (!store.auth) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/loginhotel" />;
  }

   return (
    <>
     <div className="d-flex">
        {/* Sidebar */}
        <Sidebar/>
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
