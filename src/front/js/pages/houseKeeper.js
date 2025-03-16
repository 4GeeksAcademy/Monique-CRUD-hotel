import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const HouseKeeper = () => {
  const [housekeepers, setHousekeepers] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id_branche, setIdBranche] = useState('');
  const [id_hotel, setIdHotel] = useState('');
  const [branches, setBranches] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

  const loadHousekeepers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/housekeepers`);
      if (response.ok) {
        const data = await response.json();
        setHousekeepers(data);
      } else {
        console.error("Error al obtener los housekeepers:", response.status);
      }
    } catch (error) {
      console.error('Error al obtener los housekeepers:', error);
    }
  };

  const loadBranches = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/branches`);
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      } else {
        console.error("Error al obtener las sucursales:", response.status);
      }
    } catch (error) {
      console.error('Error al obtener las sucursales:', error);
    }
  };

  const loadHotels = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/hoteles`);
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        console.error("Error al obtener los hoteles:", response.status);
      }
    } catch (error) {
      console.error('Error al obtener los hoteles:', error);
    }
  };

  const createHouseKeeper = async () => {
    if (!nombre || !email || !password || !id_branche || !id_hotel) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (!email.includes('@')) {
      alert('Por favor, ingresa un email válido');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/housekeepers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          id_branche,
          hotel_id: id_hotel,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHousekeepers([...housekeepers, data]);
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Error al crear el housekeeper:", errorData.message);
      }
    } catch (error) {
      console.error('Error al crear el housekeeper:', error);
    }
  };

  const updateHouseKeeper = async () => {
    if (!nombre || !email || !password || !editingId || !id_branche || !id_hotel) {
      alert('Por favor, completa todos los campos para editar');
      return;
    }

    if (!email.includes('@')) {
      alert('Por favor, ingresa un email válido');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/housekeepers/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
          id_branche,
          hotel_id: id_hotel,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHousekeepers(
          housekeepers.map(item => (item.id === editingId ? data : item))
        );
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Error al editar el housekeeper:", errorData.message);
      }
    } catch (error) {
      console.error('Error al editar el housekeeper:', error);
    }
  };

  const deleteHouseKeeper = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar este housekeeper?");
    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/housekeepers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHousekeepers(housekeepers.filter(item => item.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar el housekeeper:", errorData.message);
      }
    } catch (error) {
      console.error('Error al eliminar el housekeeper:', error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setIdBranche('');
    setIdHotel('');
    setEditingId(null);
  };

  const handleEdit = (housekeeper) => {
    setNombre(housekeeper.nombre);
    setEmail(housekeeper.email);
    setPassword(housekeeper.password);
    setIdBranche(housekeeper.id_branche);
    setIdHotel(housekeeper.hotel_id);
    setEditingId(housekeeper.id);
  };

  useEffect(() => {
    loadHousekeepers();
    loadBranches();
    loadHotels();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gestión de Housekeepers</h2>
      <div className="row bg-light p-2 fw-bold border-bottom">
        <div className="col">Nombre</div>
        <div className="col">Email</div>
        <div className="col">Hotel</div>
        <div className="col">Sucursal</div>
        <div className="col text-center">Acciones</div>
        <ul className="list-group mt-3">
          {housekeepers.map(housekeeper => (
            <li key={housekeeper.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="row w-100">
                <div className="col">{housekeeper.nombre}</div>
                <div className="col">{housekeeper.email}</div>
                <div className="col">{housekeeper.hotel_id}</div>
                <div className="col">{housekeeper.id_branche}</div>
                <div className="col text-center">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(housekeeper)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteHouseKeeper(housekeeper.id)}>Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={e => { e.preventDefault(); editingId ? updateHouseKeeper() : createHouseKeeper(); }} className="bg-light p-4 rounded shadow-sm">
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="nombre" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="id_hotel" className="form-label">Hotel</label>
            <select id="id_hotel" className="form-select" value={id_hotel} onChange={e => setIdHotel(e.target.value)} required>
              <option value="">Seleccione un hotel</option>
              {hotels.map(hotel => (
                <option key={hotel.id} value={hotel.id}>{hotel.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="id_branche" className="form-label">Sucursal</label>
            <select id="id_branche" className="form-select" value={id_branche} onChange={e => setIdBranche(e.target.value)} required>
              <option value="">Seleccione una sucursal</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.nombre}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">{editingId ? 'Actualizar' : 'Crear'} Housekeeper</button>
        </form>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate("/privateHotel")}>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default HouseKeeper;
