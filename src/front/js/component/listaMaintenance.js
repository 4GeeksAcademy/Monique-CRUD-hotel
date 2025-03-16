import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [maintenanceSeleccionado, setMaintenanceSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hotelId, setHotelId] = useState(""); // Para el hotel seleccionado
  const [branchId, setBranchId] = useState(""); // Para la sucursal seleccionada (ahora 'branch_id')
  const [hoteles, setHoteles] = useState([]);
  const [branches, setBranches] = useState([]); // Para las sucursales
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener lista de Maintenance y Hoteles al cargar el componente
  useEffect(() => {
    // Obtener los mantenimientos
    fetch(process.env.BACKEND_URL + "/api/maintenance")
      .then((response) => response.json())
      .then((data) => setMaintenance(data))
      .catch((error) => console.error("Error al obtener Maintenance:", error));

    // Obtener los hoteles
    fetch(process.env.BACKEND_URL + "/api/hoteles")
      .then((response) => response.json())
      .then((data) => {
        setHoteles(data);
        console.log("Hoteles cargados:", data); // Verifica si los datos son correctos
      })
      .catch((error) => console.error("Error al obtener Hoteles:", error));
  }, []);

  // Obtener las sucursales solo cuando se selecciona un hotel
  useEffect(() => {
    if (hotelId) {
      // Si hay un hotel seleccionado, obtener las sucursales relacionadas
      fetch(`${process.env.BACKEND_URL}/api/branches?hotel_id=${hotelId}`)
        .then((response) => response.json())
        .then((data) => {
          setBranches(data);
          setBranchId(""); // Resetear sucursal al cambiar el hotel
        })
        .catch((error) => console.error("Error al obtener Sucursales:", error));
    } else {
      setBranches([]); // Limpiar las sucursales si no se selecciona un hotel
    }
  }, [hotelId]); // Dependencia de hotelId

  // Manejar el envío del formulario (crear o editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelId || !branchId) {
      alert("Debes seleccionar un hotel y una sucursal.");
      return;
    }

    const maintenanceData = {
      nombre,
      email,
      password,
      hotel_id: parseInt(hotelId),
      branch_id: parseInt(branchId), // Ahora usa branch_id
    };

    const url =
      process.env.BACKEND_URL +
      (maintenanceSeleccionado ? `/api/maintenance/${maintenanceSeleccionado.id}` : "/api/maintenance");
    const method = maintenanceSeleccionado ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(maintenanceData),
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(`Error al ${maintenanceSeleccionado ? "actualizar" : "crear"} el mantenimiento`);
        return response.json();
      })
      .then((maintenance) => {
        if (maintenanceSeleccionado) {
          // Si es edición, actualiza la lista de mantenimientos
          setMaintenance((prevMaintenance) =>
            prevMaintenance.map((m) => (m.id === maintenance.id ? maintenance : m))
          );
        } else {
          // Si es creación, añade el nuevo mantenimiento a la lista
          setMaintenance((prevMaintenance) => [...prevMaintenance, maintenance]);
        }

        setMaintenanceSeleccionado(null);
        setNombre("");
        setEmail("");
        setPassword("");
        setHotelId("");
        setBranchId(""); // Resetear sucursal
        setMostrarFormulario(false);
        navigate("/listaMaintenance");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  // Eliminar un mantenimiento
  const eliminarMaintenance = (id) => {
    fetch(process.env.BACKEND_URL + `/api/maintenance/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Hubo un problema al eliminar el mantenimiento");
        setMaintenance((prevMaintenance) => prevMaintenance.filter((mantenimiento) => mantenimiento.id !== id));
      })
      .catch((error) => {
        alert("Error al eliminar: " + error.message);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Técnicos de Mantenimiento</h2>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setMaintenanceSeleccionado(null);
            setNombre("");
            setEmail("");
            setPassword("");
            setHotelId("");
            setBranchId(""); // Resetear sucursal
            setMostrarFormulario(true);
          }}
        >
          Crear Técnico de Mantenimiento
        </button>
      </div>

      <div className="row bg-light p-2 fw-bold border-bottom">
        <div className="col">Nombre</div>
        <div className="col">Email</div>
        <div className="col">Hotel</div>
        <div className="col">Sucursal</div>
        <div className="col text-center">Acciones</div>
      </div>

      {maintenance.map((mantenimiento) => (
        <div key={mantenimiento.id} className="row p-2 border-bottom align-items-center">
          <div className="col">{mantenimiento.nombre}</div>
          <div className="col">{mantenimiento.email}</div>
          <div className="col">
            {hoteles.find((hotel) => hotel.id === mantenimiento.hotel_id)?.nombre || "No asignado"}
          </div>
          <div className="col">
            {mantenimiento.branch || "No asignado"}
          </div>


          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-warning me-2"
              onClick={() => {
                setMaintenanceSeleccionado(mantenimiento);
                setNombre(mantenimiento.nombre);
                setEmail(mantenimiento.email);
                setPassword(mantenimiento.password);
                setHotelId(mantenimiento.hotel_id);
                setBranchId(mantenimiento.branch_id); // Asignar branch_id
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
          <h3 className="text-center mb-4">
            {maintenanceSeleccionado ? "Editar Técnico" : "Crear Técnico"}
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-control mb-3"
              placeholder="Nombre"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-3"
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mb-3"
              placeholder="Contraseña"
              required
            />
            <select
              value={hotelId}
              onChange={(e) => {
                setHotelId(e.target.value);
                setBranchId(""); // Resetear branch_id cuando se cambia el hotel
              }}
              className="form-control mb-3"
              required
            >
              <option value="">Seleccionar Hotel</option>
              {hoteles.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.nombre}
                </option>
              ))}
            </select>

            {/* Solo mostrar el select de sucursales si hay un hotel seleccionado */}
            {hotelId && (
              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                className="form-control mb-3"
                required
              >
                <option value="">Seleccionar Sucursal</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.nombre}
                  </option>
                ))}
              </select>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {maintenanceSeleccionado ? "Guardar Cambios" : "Crear Técnico"}
            </button>
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

export default Maintenance;
