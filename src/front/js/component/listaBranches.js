import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AutocompleteWithMap from "./autoComplete";


const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [branchSeleccionado, setBranchSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [hoteles, setHoteles] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/branches")
      .then((response) => response.json())
      .then((data) => setBranches(data))
      .catch((error) => console.error("Error al obtener Branches:", error));

    fetch(process.env.BACKEND_URL + "/api/hoteles")
      .then((response) => response.json())
      .then((data) => {
        setHoteles(data);
        console.log("Hoteles cargados:", data);
      })
      .catch((error) => console.error("Error al obtener Hoteles:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hotelId) {
      alert("Debes seleccionar un hotel.");
      return;
    }

    const branchData = { nombre, direccion, longitud, latitud, hotel_id: parseInt(hotelId) };

    const url = process.env.BACKEND_URL + (branchSeleccionado ? `/api/branches/${branchSeleccionado.id}` : "/api/branches");
    const method = branchSeleccionado ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(branchData),
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Error al ${branchSeleccionado ? "actualizar" : "crear"} el branch`);
        return response.json();
      })
      .then((branch) => {
        if (branchSeleccionado) {
          setBranches(branches.map((b) => (b.id === branch.id ? branch : b)));
        } else {
          setBranches((prevBranches) => [...prevBranches, branch]);
        }

        setBranchSeleccionado(null);
        setNombre("");
        setDireccion("");
        setLongitud("");
        setLatitud("");
        setHotelId("");
        setMostrarFormulario(false);
        navigate("/listaBranches");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const eliminarBranch = (id) => {
    fetch(process.env.BACKEND_URL + `/api/branches/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Hubo un problema al eliminar el branch");
        setBranches((prevBranches) => prevBranches.filter((branch) => branch.id !== id));
      })
      .catch((error) => {
        alert("Error al eliminar: " + error.message);
      });
  };

  // Manejar la actualización de latitud y longitud desde Autocomplete
  const handleLatLngChange = (lat, lng) => {
    setLatitud(lat);
    setLongitud(lng);
  };

  return (
    <div className="container">
      <h2 className="text-center my-3">Branches</h2>

      <div className="d-flex justify-content-center align-items-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            setBranchSeleccionado(null);
            setNombre("");
            setDireccion("");
            setLongitud("");
            setLatitud("");
            setHotelId("");
            setMostrarFormulario(true);
          }}
        >
          Crear Branch
        </button>
      </div>

      <div className="row bg-light p-2 fw-bold border-bottom">
        <div className="col">Nombre</div>
        <div className="col">Dirección</div>
        <div className="col">Longitud</div>
        <div className="col">Latitud</div>
        <div className="col">Hotel</div>
        <div className="col text-center">Acciones</div>
      </div>

      {branches.map((branch) => (
        <div key={branch.id} className="row p-2 border-bottom align-items-center">
          <div className="col">{branch.nombre}</div>
          <div className="col">{branch.direccion}</div>
          <div className="col">{branch.longitud}</div>
          <div className="col">{branch.latitud}</div>
          <div className="col">
            {hoteles.find((hotel) => hotel.id === branch.hotel_id)?.nombre || "No asignado"}
          </div>
          <div className="col d-flex justify-content-center">
            <button
              className="btn btn-warning me-2"
              onClick={() => {
                setBranchSeleccionado(branch);
                setNombre(branch.nombre);
                setDireccion(branch.direccion);
                setLongitud(branch.longitud);
                setLatitud(branch.latitud);
                setHotelId(branch.hotel_id);
                setMostrarFormulario(true);
              }}
            >
              Editar
            </button>
            <button className="btn btn-danger" onClick={() => eliminarBranch(branch.id)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}

      {mostrarFormulario && (
        <div className="card p-4 mt-5">
          <h3 className="text-center mb-4">{branchSeleccionado ? "Editar Branch" : "Crear Branch"}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control mb-3" placeholder="Nombre Sucursal" required />
            <select
              value={hotelId}
              onChange={(e) => setHotelId(e.target.value)}
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
            <AutocompleteWithMap
              value={direccion}
              onChange={setDireccion}
              onSelect={setDireccion}
              onLatLngChange={handleLatLngChange} // Pasa las coordenadas
            />

            <input type="number" value={longitud} onChange={(e) => setLongitud(e.target.value)} className="form-control mb-3" placeholder="Longitud" required />
            <input type="number" value={latitud} onChange={(e) => setLatitud(e.target.value)} className="form-control mb-3" placeholder="Latitud" required />

            <button type="submit" className="btn btn-primary w-100">
              {branchSeleccionado ? "Guardar Cambios" : "Crear Branch"}
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

export default Branches;