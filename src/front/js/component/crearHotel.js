import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrearHotel = () => {
    const[nombre, setNombre] = useState("");
    const[email, setEmail] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!nombre || !email){
            alert("Todos los campos son obligatorios.");
            return;
        }

    //Crear y enviar solicitud POST para agregar el nuevo hotel
        fetch("https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({nombre, email}),
            })
            .then ((response) => {
                if (!response.ok) {
                    throw new Error("Error al crear el hotel");
                }
                return response.json();
            })
            .then(() => { navigate("/"); })//redirige a la pagina principal despues de crear el nuevo hotel
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="card p-4" style={{ width: "300px" }}>
            <h1 className="text-center mb-4">Crear Hotel</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" placeholder="Nombre" />
                </div>
                <div className="mb-3">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="email"/>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-100">
                        Crear Hotel
                    </button>
                </div>
            </form>
        </div>
    </div>
);
};

export default CrearHotel;
