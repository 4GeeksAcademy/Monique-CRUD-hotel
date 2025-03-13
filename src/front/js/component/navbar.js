import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
		
	function handleLogout(){
		actions.logout(); // llama a la accion de logout para cambiar el estado
		navigate("/") // redirige a la pagina principal 
	}
			
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{store.auth && (
				<button className="btn btn-primary ms-auto"  onClick={()=>handleLogout()}>Logout</button>
				)} 
			</div>
		</nav>
	);
};