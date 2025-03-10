import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir a otra página

const LoginAdministrador = () => {
	const [email, setEmail] = useState(""); 
	const [password, setPassword] = useState(""); 
	const [error, setError] = useState(""); 
	const navigate = useNavigate(); 

	function handleLogin(e) {
		e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

		// Aquí estableces las credenciales predefinidas (por ejemplo, para prueba)
		const validEmail = "admin@admin.com";  // Correo predefinido
		const validPassword = "123";      // Contraseña predefinida

		// Verifica si las credenciales introducidas coinciden con las predefinidas
		if (email === validEmail && password === validPassword) {
			// Redirige al usuario a la página de inicio si las credenciales son correctas
			navigate("/");
		} else {
			// Si las credenciales son incorrectas, muestra un mensaje de error
			setError("Credenciales incorrectas");
		}
	}

	return (
		<div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
			<div className="card p-4" style={{ width: "100%", maxWidth: "400px" }}>
				<h2 className="text-center mb-4">Iniciar sesión</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input
							type="email"
							className="form-control"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password" className="form-label">Contraseña</label>
						<input
							type="password"
							className="form-control"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <div className="alert alert-danger">{error}</div>} {/* Mostrar mensaje de error */}
					<button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
				</form>
			</div>
		</div>
	);
};

export default LoginAdministrador;
