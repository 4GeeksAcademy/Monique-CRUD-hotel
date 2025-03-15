import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  function handleLogout() {
    actions.logout(); // Llama a la acción de logout para cambiar el estado
    navigate("/privatehotel"); // Redirige a la página PrivateHotel
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <button className="btn btn-primary ms-auto" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </nav>
  );
};
