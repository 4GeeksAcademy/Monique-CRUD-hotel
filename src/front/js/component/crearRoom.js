import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const CrearRoom = () => {
    const [branchId, setBranchId] = useState("");  // ✅ Definir branchId
    const [branches, setBranches] = useState([]);  // ✅ Evitar error en .map()   
    const [nombre, setNombre] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Usamos useRef para mantener una referencia al estado de si el componente está montado o no
    const isMounted = useRef(true); // Esto se utilizará para evitar actualizaciones en un componente desmontado     
    // Función para obtener la URL del backend
    const getBackendUrl = () => {
        const baseUrl = process.env.BACKEND_URL;
        if (!baseUrl) {
            console.error("Error: BACKEND_URL no está definido en las variables de entorno.");
            setError("Error interno: No se ha configurado la URL del servidor.");
            return null;
        }
        return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    };

    // Se ejecuta cuando el componente se desmonta
    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/branches")  // Asegúrate de que esta URL es correcta
            .then((response) => response.json())
            .then((data) => setBranches(data))
            .catch((error) => console.error("Error cargando branches:", error));
        // Cuando el componente se desmonta, se cambia la referencia a false
        isMounted.current = false;
        return () => {
            isMounted.current = false; // Se asegura de que cuando el componente se desmonte, no se actualice el estado
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nombreTrim = nombre.trim();

        if (!nombreTrim) {
            setError("El nombre de la habitación es obligatorio.");
            return;
        }

        const apiUrl = getBackendUrl();
        if (!apiUrl) return;

        setCargando(true);
        setError(null);
        try {
            const response = await fetch(`${apiUrl}api/rooms`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    branchId: Number(branchId) || null
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al actualizar la habitación."); f
            }
            const data = await response.json(); // Esto asume que la respuesta es JSON
            console.log("Habitación creada:", data);
            setNombre(""); // Limpiar el campo de nombre
            alert("Habitación creada exitosamente.");
            navigate("/listaRoom");
        } catch (error) {
            console.error("Error al crear la habitación:", error);
            setError(error.message || "Error desconocido al crear la habitación.");
        } finally {
            setCargando(false);
        }

    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <div className="card p-4" style={{ width: "300px" }}>
                <h1 className="text-center mb-4">Crear Habitación</h1>
                {error && <div className="alert alert-danger text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="form-control"
                            placeholder="Nombre de la habitación"
                            required
                            disabled={cargando}
                        />
                        <select
                            value={branchId}
                            onChange={(e) => setBranchId(e.target.value)}
                            className="form-control mb-3"
                            required
                        >
                            <option value="">Seleccionar Branch</option>
                            {branches.length > 0 ? (
                                branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.nombre}
                                    </option>
                                ))
                            ) : (
                                <option disabled>Cargando branches...</option>
                            )}
                        </select>
                        <button type="submit" className="btn w-100" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }}>
                            {branchId ? "Guardar Cambios" : "Crear Room"}
                        </button>
                    </div>
                </form >
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <button className="btn" style={{ backgroundColor: "#ac85eb", borderColor: "#B7A7D1" }} onClick={() => navigate("/listaRooms")}>
                        Volver
                    </button>
                </div >
            </div>

        </div >
    );
};

export default CrearRoom;