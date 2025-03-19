import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    // Verifica si el store está disponible antes de renderizar
    if (!store) {
        return <div>Loading...</div>;  // O algo más adecuado si store no está listo
    }

    return (
        <div>
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

            {/* Imagen y descripción */}
            <div className="text-center mt-5">
                <img
                    src="https://res.cloudinary.com/dnftnyi5g/image/upload/v1742292824/DALL_E_2025-03-18_10.06.33_-_A_logo_design_for_a_hotel_management_project_called_APIHOTEL._The_logo_should_have_a_modern_and_professional_style_featuring_a_shade_of_lilac_similar_huhask_Square_naq329.webp"
                    alt="Logo del Hotel"
                    style={{ width: "350px", height: "auto" }}
                />
                <p className="mt-4 fs-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    Nuestra API de Gestión de Hoteles permite a los administradores gestionar de manera eficiente la información relacionada con hoteles, sucursales, funcionarios y tareas de mantenimiento. Con esta API, los usuarios pueden realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar hoteles, sucursales, camareras de piso, técnicos de mantenimiento, y reportes de incidencias.
                </p>
                <p className="fs-4" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    La API está diseñada para facilitar la integración con sistemas de gestión de hoteles y mejorar la eficiencia en la resolución de incidencias.
                </p>

                <div className="alert alert-info mt-4 fs-5" style={{ backgroundColor: "#f0f8ff", color: "#333" }}>
                    {store.message || "Loading message from the backend (make sure your python backend is running)..." }
                </div>
            </div>
        </div>
    );
};
