import React from "react";
import "../../styles/home.css";
import ListaCategoria from "../component/listaCategoria";
import Sidebar from "../component/sidebar";



export const ListaCat = () => {
    
    return (
        <>
            <div className="d-flex">
                {/* Sidebar */}
               <Sidebar/>
                {/* Main Content */}
                <div className="main-content flex-fill p-4">
                    {/* Texto centrado */}
                    <div className="text-center"></div>
                    <div className="text-center mt-5">
                        <h1 aria-live="polite">Categorias</h1>
                    </div>
                    <ListaCategoria />
                </div>
            </div>
        </>
    );
};