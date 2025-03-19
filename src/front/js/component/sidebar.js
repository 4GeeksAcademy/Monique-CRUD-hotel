import React from "react"
import { Link } from "react-router-dom";


const Sidebar = () => {
    
    return (

        <div className="sidebar" style={{ width: "250px", backgroundColor: "#3f1d77", minHeight: "86vh" }}>
          <div className="d-flex flex-column align-items-start p-3">
            <h4 className="text-white mb-4">Hotel Dashboard</h4>
            <Link className="nav-link text-white mb-2" to="/listaHoteles">Go to Hoteles</Link>
            <Link className="nav-link text-white mb-2" to="/listaBranches">Go to Branches</Link>
            <Link className="nav-link text-white mb-2" to="/theme">Go to Theme Form</Link>
            <Link className="nav-link text-white mb-2" to="/listaCat">Go to Category Form</Link>
            <Link className="nav-link text-white mb-2" to="/hoteltheme">Go to Hotel Theme Form</Link>
            <Link className="nav-link text-white mb-2" to="/listaRooms">Go to Room</Link>
            <Link className="nav-link text-white mb-2" to="/ListaMaintenance">Go to Maintenance</Link>
            <Link className="nav-link text-white mb-2" to="/houseKeeper">Go to HouseKeeper Form</Link>
            <Link className="nav-link text-white mb-2" to="/HouseKeeperTask">Go to House Keeper Task Form</Link>
            <Link className="nav-link text-white mb-2" to="/maintenanceTask">Go to Maintenance Task Form</Link>
          </div>
        </div>

    );
};

export default Sidebar