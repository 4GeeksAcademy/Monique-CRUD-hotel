import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import ListaHoteles from "../component/listaHoteles";


export const Home = () => {
	
	return (
		<div className="text-center mt-5">
			<h1> Bienvenido</h1>
			<ListaHoteles/>
		</div>
	);
};
