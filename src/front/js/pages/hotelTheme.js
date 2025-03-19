import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const HotelTheme = () => {
  const [hoteles, setHoteles] = useState([]);
  const [themes, setThemes] = useState([]);
  const [hotelId, setHotelId] = useState('');
  const [themeId, setThemeId] = useState('');
  const [hotelThemes, setHotelThemes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const backendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

  const handleLogout = () => {
    actions.logout();
    navigate("/authhotel");
};

  const loadHoteles = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/hoteles`);
      if (response.ok) {
        const data = await response.json();
        setHoteles(data);
      } else {
        console.error("Error al obtener los hoteles:", response.status);
      }
    } catch (error) {
      console.error('Error al obtener los hoteles:', error);
    }
  };

  const loadThemes = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/theme`);
      if (response.ok) {
        const data = await response.json();
        setThemes(data.themes);
      } else {
        console.error("Error al obtener los temas:", response.status);
      }
    } catch (error) {
      console.error('Error al obtener los temas:', error);
    }
  };

  const loadHotelThemes = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/hoteltheme`);
      if (response.ok) {
        const data = await response.json();
        setHotelThemes(data);
      } else {
        console.error("Error al obtener las relaciones hotel-tema:", response.status);
      }
    } catch (error) {
      console.error('Error al obtener las relaciones hotel-tema:', error);
    }
  };

  const createHotelTheme = async () => {
    if (!hotelId || !themeId) {
      alert('Por favor, selecciona tanto un hotel como un tema');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/hoteltheme`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_hoteles: hotelId,
          id_theme: themeId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHotelThemes([...hotelThemes, data]);
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Error al crear la relación:", errorData.message);
      }
    } catch (error) {
      console.error('Error al crear la relación hotel-tema:', error);
    }
  };

  const updateHotelTheme = async () => {
    if (!hotelId || !themeId || !editingId) {
      alert('Por favor, selecciona tanto un hotel como un tema para editar');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/hoteltheme/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_hoteles: hotelId,
          id_theme: themeId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setHotelThemes(
          hotelThemes.map(item =>
            item.id === editingId ? data : item
          )
        );
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Error al editar la relación:", errorData.message);
      }
    } catch (error) {
      console.error('Error al editar la relación hotel-tema:', error);
    }
  };

  const deleteHotelTheme = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta relación?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/hoteltheme/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setHotelThemes(hotelThemes.filter(item => item.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar la relación:", errorData.message);
      }
    } catch (error) {
      console.error('Error al eliminar la relación hotel-tema:', error);
    }
  };

  const resetForm = () => {
    setHotelId('');
    setThemeId('');
    setEditingId(null);
  };

  const editHotelTheme = (id) => {
    const hotelThemeToEdit = hotelThemes.find((ht) => ht.id === id);
    if (hotelThemeToEdit) {
      setHotelId(hotelThemeToEdit.id_hoteles);
      setThemeId(hotelThemeToEdit.id_theme);
      setEditingId(id);
    }
  };

  const cancelEdit = () => {
    resetForm();
  };

  useEffect(() => {
    loadHoteles();
    loadThemes();
    loadHotelThemes();
  }, []);

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
            <h1>Gestión de Relaciones entre Hotel y Tema</h1>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{editingId ? 'Editar' : 'Crear'} Relación Hotel-Tema</h5>

                <form>
                  <div className="form-group">
                    <label htmlFor="hotelSelect">Hotel</label>
                    <select
                      className="form-control"
                      id="hotelSelect"
                      value={hotelId}
                      onChange={(e) => setHotelId(e.target.value)}
                    >
                      <option value="">Selecciona un hotel</option>
                      {hoteles.map((hotel) => (
                        <option key={hotel.id} value={hotel.id}>
                          {hotel.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="themeSelect">Tema</label>
                    <select
                      className="form-control"
                      id="themeSelect"
                      value={themeId}
                      onChange={(e) => setThemeId(e.target.value)}
                    >
                      <option value="">Selecciona un tema</option>
                      {themes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                          {theme.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <button
                      type="button"
                      className="btn" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
                      onClick={editingId ? updateHotelTheme : createHotelTheme}
                    >
                      {editingId ? 'Actualizar' : 'Crear'} Relación
                    </button>

                    {editingId && (
                      <button
                        type="button"
                        className="btn ml-2" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
                        onClick={cancelEdit}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            <h3 className="mt-4">Relaciones Actuales entre Hotel y Tema</h3>
            <div className="list-group mt-4">
              {hotelThemes.map((hotelTheme) => (
                <div className="list-group-item d-flex justify-content-between align-items-center" key={hotelTheme.id}>
                  <div>
                    <strong>Hotel ID:</strong> {hotelTheme.id_hoteles} - <strong>Tema ID:</strong> {hotelTheme.id_theme}
                  </div>
                  <div>
                    <button
                      className="btn btn-sm m-2" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
                      onClick={() => editHotelTheme(hotelTheme.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn  btn-sm" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
                      onClick={() => deleteHotelTheme(hotelTheme.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelTheme;