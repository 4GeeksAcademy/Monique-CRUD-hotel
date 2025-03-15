import React, { useState, useContext } from "react";
import SignupUser from "../pages/signupUser";
import LoginUser from "../pages/loginUser";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Context } from "../store/appContext";

const AuthUser = () => {
    const { store, actions } = useContext(Context);
	const [isSignup, setIsSignup] = useState(false); //Corrección del nombre de estado

	// Cambiar entre login y signup
	const handleSignup = () => setIsSignup(true);
	const handleGoToLogin = () => setIsSignup(false);


	return (
		<div className="text-center mt-5">
			<h1>¡Bienvenido!</h1>
			
						<div>
							{isSignup ?(
								<SignupUser />
							) : (
								<LoginUser/>
							)}
							<div className="button-container">
								{isSignup ? (
									<button onClick={handleGoToLogin} aria-label="Ir a login" className="btn btn-link text-primary">¿Ya tienes cuenta? Inicia sesión</button>
								) : (
									<button onClick={handleSignup} aria-label="Ir a signup" className="btn btn-link text-primary">¿No tienes cuenta? Registrate</button>
								)}
							</div>
						</div>
							
		</div>
	);
};

export default AuthUser;
