import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="text-center mt-5">
            <div>
                <Link to="/loginadministrador">
                    <button className="btn btn-primary btn-lg">Ir a Login Administrador</button>
                </Link>
            </div>
            <p>
                <img src={rigoImageUrl} />
            </p>
            <div className="alert alert-info">
                {store.message || "Loading message from the backend (make sure your python backend is running)..."}
            </div>
            <div><Link to="/theme">Go to Theme Form</Link></div>
            <div><Link to="/listaHoteles">Go to Hoteles</Link></div>
            <div><Link to="/listaBranches"> Go to Branches</Link></div>
            <div><Link to="/ListaMaintenance"> Go to Maintenance</Link></div>


        </div>
    );
};
