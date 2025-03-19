import React from "react";
import "../../styles/home.css";
import ListaCategoria from "../component/listaCategoria";
import { Link } from "react-router-dom";



export const ListaCat = () => {

    const handleLogout = () => {
        actions.logout();
        navigate("/authhotel");
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
                    <div className="text-center"></div>
                    <div className="text-center mt-5">
                        <h1 aria-live="polite">Categorias</h1>
                    </div>
                    <ListaCategoria />
                </div>
            </div>
        </>
    );
};