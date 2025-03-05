import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListaHoteles = () => {
    const [hoteles, setHoteles] = useState([]);

    useEffect(() => {
        obtenerHoteles()
    }, []);

    //obtener Hoteles
    function obtenerHoteles(){
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json"},
        };
  
        fetch("https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles", requestOptions)
            .then((response) => response.json())
            .then((data) => setHoteles(data))           
    };

     // Eliminar Hotel
    const eliminarHotel = (id) => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };
        
          fetch(`https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles/${id}`, requestOptions)
            .then((response) => {
                if (response.ok) {
                    //si la eliminacion fue exitosa, actualiza a la lista de hoteles
                    setHoteles(hoteles.filter(hotel => hotel.id !== id));
                } else {
                    alert("hubo un problema al eliminar el hotel");
                } 
            }) 
    };
  

    return (
        <div className="container">
            <h2 className="text-center my-3">Lista de Hoteles</h2>
            <div className="row bg-light p-2 fw-bold border-bottom">
                <div className="col">Nombre</div>
                <div className="col">Email</div>
                <div className="col text-center">Acciones</div>
            </div>
            {hoteles.map((hotel) => (
                <div key={hotel.id} className="row p-2 border-bottom align-items-center">
                    <div className="col">{hotel.nombre}</div>
                    <div className="col">{hotel.email}</div>
                    <div className="col d-flex justify-content-center">
                    <Link to={`/editar/${hotel.id}`}>
                        <button className="btn btn-warning me-5">Editar</button>
                    </Link>
                        <button className="btn btn-danger" onClick={()=> eliminarHotel(hotel.id)}>Eliminar</button>
                    </div>
                </div>
            ))}
        </div> 
    );
};

export default ListaHoteles;