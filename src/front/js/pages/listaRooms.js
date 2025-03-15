import React from "react";
import "../../styles/home.css";
import ListaRoom from "../component/listaRoom";
export const ListaRooms = () => {
    return (
        <>
            <div className="text-center mt-5">
                <h1 aria-live="polite">Habitaciones</h1>
            </div>
            <ListaRoom />
        </>
    );
};