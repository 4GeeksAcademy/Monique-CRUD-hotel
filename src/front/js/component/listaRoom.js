import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ListaRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(null); // ID de la habitación que se está eliminando
  const { store, actions } = useContext(Context);
    const navigate = useNavigate();
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

  // Obtener habitaciones
  useEffect(() => {
    const cargarRooms = async () => {
      const apiUrl = getBackendUrl();
      if (!apiUrl) return;

      setCargando(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}api/rooms`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })
        if (!response.ok) {
          throw new Error("Error al cargar las habitaciones");
        }
        const data = await response.json();
        setRooms(data);
        actions.setRooms(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(true);
      }
    };

    cargarRooms();
  }, []);

  // Eliminar habitación
  const eliminarRoom = useCallback(async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta habitación?")) return;

    const apiUrl = getBackendUrl();
    if (!apiUrl) return;

    setEliminando(id);

    try {
      const response = await fetch(`${apiUrl}api/rooms/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar la habitación.");
      }

      // Eliminar la habitación de la lista
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
    } catch (error) {
      alert(error.message);
    } finally {
      setEliminando(null);
    }
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-3">
        <Link to="/listaRooms" className="btn btn-primary">Lista de Habitaciones</Link>
        <Link to="/crearRoom" className="btn btn-success">Crear Habitación</Link>
      </div>
      <h2 className="text-center my-3">Lista de Habitaciones</h2>
      {(
        <>
          <div className="row bg-light p-2 fw-bold border-bottom">
            <div className="col">Nombre</div>
            <div className="col text-center">Acciones</div>
          </div>
          {rooms?.map((room) => (
            <div key={room.id} className="row p-2 border-bottom align-items-center">
              <div className="col">{room.nombre}</div>
              <div className="col d-flex justify-content-center">
                <Link to={`/editarRoom/${room.id}`}>
                  <button className="btn btn-warning me-3">Editar</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarRoom(room.id)}
                  disabled={eliminando === room.id}
                >
                  {eliminando === room.id ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/privateHotel")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default ListaRoom;