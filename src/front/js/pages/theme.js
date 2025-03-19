import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const ThemeForm = () => {
    const [nombre, setNombre] = useState('');
    const [message, setMessage] = useState('');
    const [themesList, setThemesList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedThemeId, setSelectedThemeId] = useState(null);

    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_BACKEND_URL || process.env.BACKEND_URL;

    useEffect(() => {
        fetchThemes();
    }, []);

    const handleLogout = () => {
        actions.logout();
        navigate("/authhotel");
    };

    const fetchThemes = async () => {
        try {
            const response = await fetch(`${backendUrl}api/theme`);
            const data = await response.json();
            if (response.ok) {
                setThemesList(data.themes);
            } else {
                setMessage('Failed to load themes.');
            }
        } catch (error) {
            setMessage('Error fetching themes.');
            console.error('Error fetching themes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre) {
            setMessage('Theme name is required!');
            return;
        }

        const url = editMode
            ? `${backendUrl}/api/theme/${selectedThemeId}`
            : `${backendUrl}/api/theme`;

        const method = editMode ? 'PUT' : 'POST';
        const body = JSON.stringify({
            nombre,
        });

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            const data = await response.json();

            if (response.ok) {
                setNombre('');
                setEditMode(false);
                setSelectedThemeId(null);
                fetchThemes();
                setMessage('Theme updated successfully.');
            } else {
                setMessage('Error creating or updating theme.');
            }
        } catch (error) {
            setMessage('Error creating or updating theme.');
            console.error('Error making request:', error);
        }
    };

    const handleDelete = async (themeId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this theme?');

        if (!isConfirmed) {
            return;
        }

        const url = `${backendUrl}/api/theme/${themeId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const data = await response.json();

            if (response.ok) {
                setThemesList((prevThemesList) => {
                    const newThemesList = prevThemesList.filter(theme => theme.id !== themeId);
                    if (newThemesList.length === 0) {
                        setMessage("No themes available.");
                    }
                    return newThemesList;
                });
                setMessage('Theme deleted successfully.');
            } else {
                setMessage('Failed to delete theme.');
            }
        } catch (error) {
            setMessage('Error deleting theme.');
            console.error('Error deleting theme:', error);
        }
    };

    const handleEdit = (themeId) => {
        const themeToEdit = themesList.find((theme) => theme.id === themeId);
        if (themeToEdit) {
            setNombre(themeToEdit.nombre);
            setSelectedThemeId(themeId);
            setEditMode(true);
        }
    };

    const handleCancel = () => {
        setNombre('');
        setEditMode(false);
        setSelectedThemeId(null);
    };

    const goToHome = () => {
        navigate('/');
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
                    <div className="text-center">

                        <div className="container mt-5 mb-5 container-dark">
                            <h2 className="text-center mb-4">{editMode ? 'Edit Theme' : 'Create Theme'}</h2>
                            <div className="row justify-content-center">
                                <div className="col-md-7">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="theme" className="form-label custom-label">Theme:</label>
                                            <input
                                                type="text"
                                                id="theme"
                                                className="form-control custom-input"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                                style={{ fontSize: '24px' }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn w-100" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
                                        >
                                            {editMode ? 'Save Changes' : 'Create Theme'}
                                        </button>
                                        {editMode && (
                                            <button
                                                type="button"
                                                className="btn w-100 mt-2" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}
                                                onClick={handleCancel}
                                            >
                                                Cancel changes
                                            </button>
                                        )}
                                    </form>
                                </div>
                            </div>

                            {message && <p className="mt-3 text-center text-dark">{message}</p>}

                            <h3 className="text-center mt-5">Themes List</h3>
                            <div className="mt-4 col-md-7 mx-auto row">
                                <ul className="list-group">
                                    {themesList.length > 0 ? (
                                        themesList.map((theme) => (
                                            <li key={theme.id} className="list-group-item d-flex justify-content-between align-items-center  mb-2">
                                                <span className="theme-text">{theme.nombre}</span>
                                                <div className="col-2 d-flex justify-content-between">
                                                    <i
                                                        className="fa fa-pencil"
                                                        style={{
                                                            fontSize: '20px',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => handleEdit(theme.id)}
                                                    ></i>
                                                    <i
                                                        className="fa fa-trash"
                                                        style={{
                                                            fontSize: '20px',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => handleDelete(theme.id)}
                                                    ></i>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="mt-3 text-center text-dark">No themes available.</p>
                                    )}
                                </ul>
                                <button className="btn" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }} onClick={() => navigate("/privateHotel")}>
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </>
            );
};

            export default ThemeForm;