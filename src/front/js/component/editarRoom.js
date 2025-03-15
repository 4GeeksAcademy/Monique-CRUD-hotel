import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const EditarRoom = () => {
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtener el ID de la habitación desde la URL
  const navigate = useNavigate();
  const { store } = useContext(Context);

  // Función para obtener la URL del backend de forma segura
  const getBackendUrl = () => {
    const baseUrl = process.env.BACKEND_URL;
    if (!baseUrl) {
      console.error("Error: BACKEND_URL no está definido.");
      setError("Error interno: No se ha configurado la URL del servidor.");
      return null;
    }
    return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  };

  // Cargar los datos de la habitación al montar el componente
  useEffect(() => {
    const apiUrl = getBackendUrl();
    if (!apiUrl) return;

    const fetchRoom = async () => {
      try {
        const response = await fetch(`${apiUrl}api/rooms/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar los datos de la habitación.");
        }
        const data = await response.json();
        setNombre(data.nombre); // Asume que el objeto recibido tiene un campo "nombre"
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchRoom();
  }, [id]);

  // Manejar la actualización de la habitación
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    const apiUrl = getBackendUrl();
    if (!apiUrl) return;

    try {
      const response = await fetch(`${apiUrl}api/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la habitación.");
      }

      const data = await response.json(); // Datos actualizados
      alert("Habitación actualizada exitosamente.");
      navigate("/listaRoom");
    } catch (error) {
      setError(error.message || "Error desconocido al actualizar la habitación.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Editar Habitación</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="nombre">Nombre de la Habitación</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            placeholder="Nombre de la habitación"
            disabled={cargando}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
          {cargando ? "Guardando..." : "Actualizar Habitación"}
        </button>
      </form>
      <div className="mt-3 text-center">
        <button className="btn btn-secondary" onClick={() => navigate("/listaRoom")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default EditarRoom;
