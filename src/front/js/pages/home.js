import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
// import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
     // Verifica si el store está disponible antes de renderizar
     if (!store) {
        return <div>Loading...</div>;  // O algo más adecuado si store no está listo
    }
    return (

        <div className="text-center mt-5">
            <h1>Hello Rigo!!</h1>
            <p>
                <img src={rigoImageUrl} />
            </p>
        <div className="alert alert-info">
				    {store.message || "Loading message from the backend (make sure your python backend is running)..."}
		  	</div>
            <div><Link to="/authhotel">Go to login Hotel Form</Link></div>
             <div><Link to="/loginHouseKeeper">Go to login housekeeper Form</Link></div>
             <div><Link to="/loginMaintenance">Go to login maintenance Form</Link></div>
        </div>

    );
};