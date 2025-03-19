import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Usando el nombre correcto

export const Navbar = () => {
  const { actions } = useContext(Context); // Asegúrate de que tu Provider use este Context
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/authhotel");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9b5de5" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white fs-2" to="/">APIHOTEL</Link>
        <button className="btn btn-light mt-3" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};
