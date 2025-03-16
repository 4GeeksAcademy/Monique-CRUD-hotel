import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hoteles = () => {
  const [hoteles, setHoteles] = useState([]);
  const [hotelSeleccionado, setHotelSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener lista de hoteles al cargar el componente
  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/hoteles")
      .then((response) => response.json())
      .then((data) => setHoteles(data))
      .catch((error) => console.error("Error al obtener hoteles:", error));
  }, []); // solo se ejecuta una vez al montar el componente

  // Manejar el envío del formulario (crear o editar)
  const handleSubmit = (e) => {
    e.preventDefault();

    const hotelData = { nombre, email, password: password || undefined };

    if (hotelSeleccionado) {
      // Editar hotel
      fetch(process.env.BACKEND_URL + `/api/hoteles/${hotelSeleccionado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotelData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el hotel");
          }
          return response.json();
        })
        .then((updatedHotel) => {
          setHoteles((prevHoteles) =>
            prevHoteles.map((hotel) =>
              hotel.id === updatedHotel.id ? updatedHotel : hotel
            )
          );
          setHotelSeleccionado(null); // Limpiar el hotel seleccionado
          setMostrarFormulario(false); // Ocultar formulario después de editar
          setNombre("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => alert(error.message));
    } else {
      // Crear un nuevo hotel
      fetch(process.env.BACKEND_URL + "/api/hoteles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...hotelData, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al crear el hotel");
          }
          return response.json();
        })
        .then((newHotel) => {
          setHoteles([...hoteles, newHotel]);
          setMostrarFormulario(false); // Ocultar formulario después de crear
          setNombre("");
          setEmail("");
          setPassword("");
          navigate("/listaHoteles"); // Redirigir a la lista de hoteles
        })
        .catch((error) => alert(error.message));
    }
  };

  // Eliminar un hotel
  const eliminarHotel = (id) => {
    fetch(process.env.BACKEND_URL + `/api/hoteles/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setHoteles(hoteles.filter((hotel) => hotel.id !== id));
        } else {
          alert("Hubo un problema al eliminar el hotel");
        }
      })
      .catch((error) => alert("Error al eliminar: " + error.message));
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Hoteles</h2>

      {/* Botón para crear hotel */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setHotelSeleccionado(null); // Limpiar selección
            setNombre("");
            setEmail("");
            setPassword("");
            setMostrarFormulario(true); // Mostrar formulario solo cuando se haga clic
          }}
        >
          Crear Hotel
        </button>
      </div>

      {/* Lista de Hoteles */}
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
            <button
              className="btn btn-warning me-5"
              onClick={() => {
                setHotelSeleccionado(hotel); // Establecer el hotel seleccionado
                setNombre(hotel.nombre);
                setEmail(hotel.email);
                setPassword(""); // Dejamos la contraseña vacía para que el usuario ingrese una nueva
                setMostrarFormulario(true); // Mostrar el formulario para editar
              }}
            >
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => eliminarHotel(hotel.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {/* Formulario para crear o editar un hotel */}
      {mostrarFormulario && (
        <div className="card p-4 mt-5">
          <h3 className="text-center mb-4">
            {hotelSeleccionado ? "Editar Hotel" : "Crear Hotel"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" placeholder="Nombre" required />
            </div>
            <div className="mb-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />
            </div>
            <div className="mb-3">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Contraseña"
                required={!hotelSeleccionado} // Solo es obligatorio si estamos creando un hotel
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary w-100">
                {hotelSeleccionado ? "Guardar Cambios" : "Crear Hotel"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/privateHotel")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Hoteles;