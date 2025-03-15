import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [maintenanceSeleccionado, setMaintenanceSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener lista de Maintenance al cargar el componente
  useEffect(() => {
    let isMounted = true; // Flag para verificar si el componente sigue montado

    fetch(process.env.BACKEND_URL + "/api/maintenance")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setMaintenance(data); // Solo actualizamos el estado si el componente sigue montado
        }
      })
      .catch((error) => console.error("Error al obtener Maintenance:", error));

    // Cleanup function para evitar la actualización del estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, []);

  // Manejar el envío del formulario (crear o editar)
  const handleSubmit = (e) => {
    e.preventDefault();

    const maintenanceData = { nombre, email, password };

    const url = process.env.BACKEND_URL + (maintenanceSeleccionado ? `/api/maintenance/${maintenanceSeleccionado.id}` : "/api/maintenance");
    const method = maintenanceSeleccionado ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maintenanceData),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error al ${maintenanceSeleccionado ? "actualizar" : "crear"} el mantenimiento`);
        return response.json();
      })
      .then((maintenance) => {
        if (maintenanceSeleccionado) {
          setMaintenance((prevMaintenance) => prevMaintenance.map((m) => (m.id === maintenance.id ? maintenance : m)));
        } else {
          setMaintenance((prevMaintenance) => [...prevMaintenance, maintenance]);
        }

        setMaintenanceSeleccionado(null);
        setNombre("");
        setEmail("");
        setPassword("");
        setMostrarFormulario(false);
        navigate("/listaMaintenance");
      })
      .catch((error) => { 
        alert(error.message);
      });
  };

  // Eliminar un mantenimiento
  const eliminarMaintenance = (id) => {
    let isMounted = true; // Verificamos si el componente sigue montado

    fetch(process.env.BACKEND_URL + `/api/maintenance/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Hubo un problema al eliminar el mantenimiento");
        if (isMounted) {
          setMaintenance((prevMaintenance) => prevMaintenance.filter((mantenimiento) => mantenimiento.id !== id));
        }
      })
      .catch((error) => {
        alert("Error al eliminar: " + error.message);
      });

    // Cleanup function para evitar actualizaciones del estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Tecnicos</h2>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setMaintenanceSeleccionado(null);
            setNombre("");
            setEmail("");
            setPassword("");
            setMostrarFormulario(true);
          }}
        >
          Crear Tecnico de Mantenimiento
        </button>
      </div>

      <div className="row bg-light p-2 fw-bold border-bottom">
        <div className="col">Nombre</div>
        <div className="col">Email</div>
        <div className="col text-center">Acciones</div>
      </div>

      {maintenance.map((mantenimiento) => (
        <div key={mantenimiento.id} className="row p-2 border-bottom align-items-center">
          <div className="col">{mantenimiento.nombre}</div>
          <div className="col">{mantenimiento.email}</div>
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-warning me-2"
              onClick={() => {
                setMaintenanceSeleccionado(mantenimiento);
                setNombre(mantenimiento.nombre);
                setEmail(mantenimiento.email);
                setPassword(mantenimiento.password);
                setMostrarFormulario(true);
              }}
            >
              Editar
            </button>
            <button className="btn btn-danger" onClick={() => eliminarMaintenance(mantenimiento.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {mostrarFormulario && (
        <div className="card p-4 mt-5">
          <h3 className="text-center mb-4">{maintenanceSeleccionado ? "Editar Tecnico" : "Crear Tecnico"}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control mb-3" placeholder="Nombre" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder="Contraseña" required />
            <button type="submit" className="btn btn-primary w-100">{maintenanceSeleccionado ? "Guardar Cambios" : "Crear Tecnico"}</button>
          </form>
        </div>
      )}

      {/* Botón para volver a la página anterior */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/privateHotel")}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Maintenance;
