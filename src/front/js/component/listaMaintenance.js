import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Maintenance = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [maintenanceSeleccionado, setMaintenanceSeleccionado] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [hoteles, setHoteles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [imagen, setImagen] = useState(null); // Estado para la imagen
  const [imagenPreview, setImagenPreview] = useState(""); // Estado para la previsualización
  const navigate = useNavigate();

  useEffect(() => {
    fetch(process.env.BACKEND_URL + "/api/maintenance")
      .then((response) => response.json())
      .then((data) => setMaintenance(data))
      .catch((error) => console.error("Error al obtener Maintenance:", error));

    fetch(process.env.BACKEND_URL + "/api/hoteles")
      .then((response) => response.json())
      .then((data) => setHoteles(data))
      .catch((error) => console.error("Error al obtener Hoteles:", error));
  }, []);

  useEffect(() => {
    if (hotelId) {
      fetch(`${process.env.BACKEND_URL}/api/branches?hotel_id=${hotelId}`)
        .then((response) => response.json())
        .then((data) => {
          setBranches(data);
          setBranchId("");
        })
        .catch((error) => console.error("Error al obtener Sucursales:", error));
    } else {
      setBranches([]);
    }
  }, [hotelId]);

  const handleLogout = () => {
    actions.logout();
    navigate("/authhotel");
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotelId || !branchId) {
      alert("Debes seleccionar un hotel y una sucursal.");
      return;
    }

    let imageUrl = "";
    if (imagen) {
      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("upload_preset", "hoteles_mantenimiento");

      const response = await fetch("https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      imageUrl = data.secure_url;
    }

    const maintenanceData = {
      nombre,
      email,
      password,
      hotel_id: parseInt(hotelId),
      branch_id: parseInt(branchId),
      foto: imageUrl, 
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
        if (!response.ok) throw new Error("Error al guardar el técnico");
        return response.json();
      })
      .then((maintenance) => {
        if (maintenanceSeleccionado) {
          setMaintenance((prev) => prev.map((m) => (m.id === maintenance.id ? maintenance : m)));
        } else {
          setMaintenance((prev) => [...prev, maintenance]);
        }

        setMaintenanceSeleccionado(null);
        setNombre("");
        setEmail("");
        setPassword("");
        setHotelId("");
        setBranchId("");
        setImagen(null);
        setImagenPreview("");
        setMostrarFormulario(false);
      })
      .catch((error) => alert(error.message));
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9b5de5" }}>
            <div className="container-fluid">
              <Link className="navbar-brand text-white fs-2" to="/">APIHOTEL</Link>
              <button className="btn btn-light mt-3" onClick={handleLogout}>Logout</button>
            </div>
          </nav>
          <div className="d-flex">
            {/* Sidebar */}
            <div className="sidebar" style={{ width: "250px", backgroundColor: "#9b5de5", minHeight: "100vh" }}>
              <div className="d-flex flex-column align-items-start p-3">
                <h4 className="text-white mb-4">Hotel Dashboard</h4>
                <Link className="nav-link text-white" to="/listaHoteles">Go to Hoteles</Link>
                <Link className="nav-link text-white" to="/listaBranches">Go to Branches</Link>
                <Link className="nav-link text-white" to="/theme">Go to Theme Form</Link>
                <Link className="nav-link text-white" to="/listaCat">Go to Category Form</Link>
                <Link className="nav-link text-white" to="/hoteltheme">Go to Hotel Theme Form</Link>
                <Link className="nav-link text-white" to="/listaRooms">Go to Room</Link>
                <Link className="nav-link text-white" to="/ListaMaintenance">Go to Maintenance</Link>
                <Link className="nav-link text-white" to="/houseKeeper">Go to HouseKeeper Form</Link>
                <Link className="nav-link text-white" to="/HouseKeeperTask">Go to House Keeper Task Form</Link>
                <Link className="nav-link text-white" to="/maintenanceTask">Go to Maintenance Task Form</Link>
    
              </div>
            </div>
    
            {/* Main Content */}
            <div className="main-content flex-fill p-4">
              {/* Texto centrado */}
              <div className="text-center mt-5"></div>
    <div className="container">
      <h2 className="text-center my-3">Técnicos de Mantenimiento</h2>

      <button
        className="btn mb-3"  style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
        onClick={() => {
          setMaintenanceSeleccionado(null);
          setNombre("");
          setEmail("");
          setPassword("");
          setHotelId("");
          setBranchId("");
          setImagen(null);
          setImagenPreview("");
          setMostrarFormulario(true);
        }}
      >
        Crear Técnico de Mantenimiento
      </button>

      <div className="row bg-light p-2 fw-bold border-bottom">
        <div className="col">Foto</div>
        <div className="col">Nombre</div>
        <div className="col">Email</div>
        <div className="col">Hotel</div>
        <div className="col">Sucursal</div>
        <div className="col text-center">Acciones</div>
      </div>

      {maintenance.map((mantenimiento) => (
        <div key={mantenimiento.id} className="row p-2 border-bottom align-items-center">
          <div className="col">
            {mantenimiento.foto ? (
              <img src={mantenimiento.foto} alt="Foto" className="rounded-circle" width="50" height="50" />
            ) : (
              <div className="text-muted">Sin foto</div>
            )}
          </div>
          <div className="col">{mantenimiento.nombre}</div>
          <div className="col">{mantenimiento.email}</div>
          <div className="col">{hoteles.find((h) => h.id === mantenimiento.hotel_id)?.nombre || "No asignado"}</div>
          <div className="col">{mantenimiento.branch || "No asignado"}</div>
          <div className="col d-flex justify-content-center">
            <button
              className="btn me-2"  style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
              onClick={() => {
                setMaintenanceSeleccionado(mantenimiento);
                setNombre(mantenimiento.nombre);
                setEmail(mantenimiento.email);
                setPassword(mantenimiento.password);
                setHotelId(mantenimiento.hotel_id);
                setBranchId(mantenimiento.branch_id);
                setImagenPreview(mantenimiento.foto || "");
                setMostrarFormulario(true);
              }}
            >
              Editar
            </button>
          </div>
        </div>
      ))}

      {mostrarFormulario && (
        <div className="card p-4 mt-4">
          <h3 className="text-center">{maintenanceSeleccionado ? "Editar Técnico" : "Crear Técnico"}</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control mb-3" placeholder="Nombre" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" placeholder="Contraseña" required />

            <input type="file" className="form-control mb-3" onChange={handleImagenChange} />
            {imagenPreview && <img src={imagenPreview} alt="Previsualización" className="img-thumbnail mb-3" width="100" />}

            <button type="submit"  style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }} className="w-100" >
              {maintenanceSeleccionado ? "Guardar Cambios" : "Crear Técnico"}
            </button>
          </form>
        </div>
      )}
    </div>
    </div>
    </div>
    </>
  );
};

export default Maintenance;
