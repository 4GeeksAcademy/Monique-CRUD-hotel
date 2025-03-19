// src/layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import ThemeForm from './pages/theme';
import HotelTheme from './pages/hotelTheme';
import HouseKeeper from './pages/houseKeeper';
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { ListaCat } from "./pages/listaCat";
import { ListaRooms } from "./pages/listaRooms";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import EditarCategoria from "./component/editarCategoria";
import CrearCategoria from "./component/crearCategoria";
import ListaCategoria from "./component/listaCategoria";
import Hoteles from "./component/listaHoteles";
import Branches from "./component/listaBranches";
import EditarRoom from "./component/editarRoom";
import CrearRoom from "./component/crearRoom";
import ListaRoom from "./component/listaRoom";
import Maintenance from "./component/listaMaintenance";
import LoginHouseKeeper from "./pages/loginHouseKeeper";
import PrivateHouseKeeper from './pages/privateHouseKeeper';
import ProtectedPrivateHouseKeeper from './pages/ProtectedPrivateHouseKeeper';
import HouseKeeperTask from './pages/HouseKeeperTask';
import LoginHotel from "./pages/loginHotel";
import SignupHotel from "./pages/signupHotel";
import PrivateHotel from "./pages/privateHotel";
import AuthHotel from "./component/authhotel";
import MaintenanceTask from './pages/maintenanceTask';
import LoginMaintenance from "./pages/loginMaintenance";
import PrivateMaintenance from './pages/privateMaintenance';
import ProtectedPrivateMaintenance from './pages/ProtectedPrivateMaintenance';
import { Footer } from "./component/footer";



const Layout = () => {
    // Basename: Usado si el proyecto está en un subdirectorio, configurado en .env
    const basename = process.env.BASENAME || "";

    // Si la variable de entorno BACKEND_URL no está configurada, muestra un mensaje de error
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
        return <BackendURL />;
    }
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<ListaCat />} path="/listaCat" />
                        <Route element={<EditarCategoria />} path="/editar/:id" />
                        <Route element={<CrearCategoria />} path="/crearCategoria" />
                        <Route element={<ListaCategoria />} path="/listaCategoria" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Hoteles />} path="/hoteles" />
                        <Route element={<Hoteles />} path="/listaHoteles" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<ThemeForm />} path="/theme" />
                        <Route element={<HotelTheme />} path="/hotelTheme" />
                        <Route element={<Branches />} path="/listaBranches" />
                        <Route element={<ListaRooms />} path="/listaRooms" />
                        <Route element={<EditarRoom />} path="/editarRoom/:id" />
                        <Route element={<CrearRoom />} path="/crearRoom" />
                        <Route element={<ListaRoom />} path="/listaRoom" />
                        <Route element={<Maintenance />} path="/listaMaintenance" />
                        <Route element={<HouseKeeper />} path="/houseKeeper" />
                        <Route element={<LoginHouseKeeper />} path="/loginHouseKeeper" />
                        <Route element={<ProtectedPrivateHouseKeeper><PrivateHouseKeeper /></ProtectedPrivateHouseKeeper>} path="/privateHouseKeeper" />
                        <Route element={<HouseKeeperTask />} path="/HouseKeeperTask" />
                        <Route element={<PrivateHotel />} path="/privateHotel" />
                        <Route element={<SignupHotel />} path="/signupHotel" />
                        <Route element={<LoginHotel />} path="/loginHotel" />
                        <Route element={<AuthHotel />} path="/authhotel" />
                        <Route element={<MaintenanceTask />} path="/maintenanceTask" />
                        <Route element={<LoginMaintenance />} path="/loginMaintenance" />
                        <Route element={<ProtectedPrivateMaintenance><PrivateMaintenance /></ProtectedPrivateMaintenance>} path="/privateMaintenance" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer/>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);