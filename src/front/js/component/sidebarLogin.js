import React from "react"
import { Link } from "react-router-dom";


const SidebarLogin = () => {

    return (

        <div className="sidebar" style={{ width: "250px", backgroundColor: "#3f1d77", height: "86vh" }}>
            <div className="d-flex flex-column align-items-start p-3">
                <h4 className="text-white mb-4">Hotel Dashboard</h4>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item m-2">
                        <Link className="nav-link text-white fs-5" to="/authhotel">Hotel Login</Link>
                    </li>
                    <li className="nav-item m-3">
                        <Link className="nav-link text-white fs-5" to="/loginHouseKeeper">Housekeeper Login</Link>
                    </li>
                    <li className="nav-item m-3">
                        <Link className="nav-link text-white fs-5" to="/loginMaintenance">Maintenance Login</Link>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default SidebarLogin