import React, { useState, useContext } from "react";
import { Link } from "react-router-dom"; // Importar Link
import SignupHotel from "../pages/signupHotel";
import LoginHotel from "../pages/loginHotel";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";

const AuthHotel = () => {
    const { store, actions } = useContext(Context);
    const [isSignup, setIsSignup] = useState(false);

    // Cambiar entre login y signup
    const handleSignup = () => setIsSignup(true);
    const handleGoToLogin = () => setIsSignup(false);

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
        </>
    );
};

export default AuthHotel;
