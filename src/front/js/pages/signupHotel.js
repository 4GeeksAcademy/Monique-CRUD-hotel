import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignupHotel = () => {
  const [hotelExists, setHotelExists] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verifica si ya existe un hotel registrado en el backend.
    fetch("/api/checkHotel")
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          setHotelExists(true);
        }
      });

    // Verifica si el usuario es un administrador.
    // Esto puede depender del estado de autenticación y roles del usuario.
    const userRole = localStorage.getItem("role");
    if (userRole === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelExists) {
      // Código para registrar un nuevo hotel y crear el usuario administrador.
      fetch("/api/registerHotel", {
        method: "POST",
        body: JSON.stringify({ hotelName: "Nuevo Hotel", userRole: "admin" }),
      }).then((response) => {
        if (response.ok) {
          alert("Hotel registrado exitosamente!");
        }
      });
    } else {
      alert("Ya existe un hotel registrado.");
    }
  };

  if (!isAdmin) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  return (
    <>
     
    <div>
      <h2>Registrar Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Hotel:</label>
          <input type="text" required />
        </div>
        <div>
          <button type="submit" style={{ width: "250px", backgroundColor: "#9b5de5", minHeight: "100vh" }}>Registrar</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default SignupHotel;
