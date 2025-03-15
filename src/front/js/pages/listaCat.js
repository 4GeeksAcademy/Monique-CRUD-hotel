import React from "react";
import "../../styles/home.css";
import ListaCategoria from "../component/listaCategoria";
import EditarCategoria from "../component/editarCategoria";
export const ListaCat = () => {
    return (
        <>
            <div className="text-center mt-5">
                <h1 aria-live="polite">Categorias</h1>
            </div>
            <ListaCategoria />
            {/* <EditarCategoria />*/}
        </>
    );
};