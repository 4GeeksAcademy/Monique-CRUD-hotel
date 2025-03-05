import React, { useContext } from "react";
import "../../styles/home.css";
import ListaHoteles from "../component/listaHoteles";


export const Lista = () => {
	
	return (
		<div className="text-center mt-5">
			<h1> HOla</h1>
			<ListaHoteles/>
		</div>
	);
};
