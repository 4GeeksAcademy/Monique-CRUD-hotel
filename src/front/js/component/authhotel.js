import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Importar Link
import SignupHotel from "../pages/signupHotel";
import LoginHotel from "../pages/loginHotel";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";
import SidebarLogin from "../component/sidebarLogin";

const AuthHotel = () => {
    const { store, actions } = useContext(Context);
    const [isSignup, setIsSignup] = useState(false);

    // Cambiar entre login y signup
    const handleSignup = () => setIsSignup(true);
    const handleGoToLogin = () => setIsSignup(false);

    return (
        <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <SidebarLogin />
            {/* Contenido principal */}
            <img
          src="https://res.cloudinary.com/dnftnyi5g/image/upload/v1742394623/image_white_walls_1_pci7z4.png"
          alt="Adminitrativo del hotel"
          style={{ width: "50%", borderRadius: "10px" }}
        />
            <div className="container" style={{ width: "500px" }}>
                {/* Contenido de Login/Signup */}
                <div className="d-flex flex-column align-items-center mt-5">
                    {isSignup ? <SignupHotel /> : <LoginHotel />}
                    <div className="mt-3">
                        {isSignup ? (
                            <button onClick={handleGoToLogin} className="btn btn-link custom-link">
                                ¿Ya tienes cuenta? Inicia sesión
                            </button>
                        ) : (
                            <button onClick={handleSignup} className="btn btn-link custom-link">
                                ¿No tienes cuenta? Regístrate
                            </button>
                        )}
                    </div>
                  
                </div>
            </div>
            
           
        </div>
    );
};

export default AuthHotel;
