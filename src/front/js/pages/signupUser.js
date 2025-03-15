import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

const SignupUser = () => {
    const { actions } = useContext(Context);
    const [nombre, setNombre] = useState(""); // Nuevo estado para el nombre
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectoToLogin, setRedirectToLogin] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.signupUser(nombre, email, password); // Pasamos el nombre junto con el email y la contraseña
        setRedirectToLogin(true); //redirige al login despues de crear el usuario
    };

    if (redirectoToLogin) {
        return <Navigate to="/loginUser" />;
    }

    return (
      <div className="d-flex justify-content-center align-items-center vh-80">
            <div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
            
                <h2>Crear Cuenta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado de nombre
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Registro
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupUser;