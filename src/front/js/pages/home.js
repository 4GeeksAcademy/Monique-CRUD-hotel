import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import SidebarLogin from "../component/sidebarLogin";

export const Home = () => {
    const { store, actions } = useContext(Context);

    // Verifica si el store está disponible antes de renderizar
    if (!store) {
        return <div>Loading...</div>;  // O algo más adecuado si store no está listo
    }
    

    return (
        <div>
           <div className="d-flex">
                   {/* Sidebar */}
                  <SidebarLogin/>
            {/* Imagen y descripción */}
            <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1" style={{ height: "80vh" }}>
                <img
                    src="https://res.cloudinary.com/dnftnyi5g/image/upload/v1742292824/DALL_E_2025-03-18_10.06.33_-_A_logo_design_for_a_hotel_management_project_called_APIHOTEL._The_logo_should_have_a_modern_and_professional_style_featuring_a_shade_of_lilac_similar_huhask_Square_naq329.webp"
                    alt="Logo del Hotel"
                    style={{ width: "350px" }}
                />
                <p className="mt-4 fs-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    Nuestra API de Gestión de Hoteles permite a los administradores gestionar de manera eficiente la información relacionada con hoteles, sucursales, funcionarios y tareas de mantenimiento. El adminitrador a poder gestionar hoteles, sucursales, camareras de piso, técnicos de mantenimiento, y reportes de incidencias.
                </p>
                <p className="fs-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    La API está diseñada para facilitar la integración con sistemas de gestión de hoteles y mejorar la eficiencia en la resolución de incidencias.
                </p>

              </div>  
            </div>
        </div>
    );
};