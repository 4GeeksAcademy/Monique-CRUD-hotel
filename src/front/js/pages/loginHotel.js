import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap importado.


const LoginHotel = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // estado para msg de error caso el hotrl tenga cuenta registrada
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        console.log("send data", email, password);

        actions.login(email, password).then(success => {
            if (success) {
                navigate("/privatehotel");
            } else {
                setError("Usuario no encontrado! Necesitas crear una cuenta primero.");
                console.error("Error al iniciar sesion");
            }
        });
    }

    return (
            
            <div className="container" style={{ width: "500px" }}>
                <h2 className="text-center mb-4">Login Hotel</h2>
                <div className="mb-3">
                    <form onSubmit={sendData}>
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingrese su correo electrónico"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password1" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="Password1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingrese su contraseña"
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar el mensaje de error */}
                        <button
                            type="submit"
                            className="btn w-100"
                            style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}>
                            Iniciar sesión
                        </button>

                    </form>
                </div>
            </div>
        
    );
};

export default LoginHotel;