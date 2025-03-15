import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap importado.

const LoginUser = () => {
    const {store, actions} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // estado para msg de error caso el hotrl tenga cuenta registrada
    const navigate = useNavigate();
    
    function sendData(e){
        e.preventDefault();
        console.log("send data", email, password);

        actions.loginUser(email, password).then(success => {
            if (success) {
                navigate("/privateUser");
            } else {
                setError("Usuario no encontrado! Necesitas crear una cuenta primero.");
                console.error("Error al iniciar sesion");
            }
        });
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-80">
            <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Iniciar sesión</h2>
                <form onSubmit={sendData}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar el mensaje de error */}
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginUser;