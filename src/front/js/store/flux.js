const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			hoteles:[], //lista donde se guarda los hoteles
		},
		actions: {
			 //obtener Hoteles
			 obtenerHoteles(){
				const requestOptions = {
					method: "GET",
					headers: { "Content-Type": "application/json"},
				};
		  
				fetch("https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles", requestOptions)
					.then((response) => response.json())
					.then((data) => {
						setStore({hoteles:data});
					})
			},

			// crear un Hotel en la API
			crearHotel: (payload) => {
				fetch("https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles", {
					method: "POST",
					headers: {"Content-type": "application/json"},
					body: JSON.stringify(payload),
				})
				.then((response) => response.json())
				.then((data) => {
					const actions = getActions()
					console.log("hotel agregado", data);
				})
				.then(() => {
					getActions().obtenerHoteles(); //vuelve a obtener todos los hoteles desde la API
				})
			},

			//eliminar Hoteles
			deleteHoteles: (id) => {
				//eliminar el hotel en la API
				fetch(`https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles/${id}`, {
					method: "DELETE",
					headers: {"Content-type": "application/json"},
				})
				.then(() => {
					//despues de eliminar, actualizamos la lista
					const store = getStore();
					const updateHoteles = store.hoteles.filter(est =>est.id !== id);
					setStore({hoteles: updateHoteles}); // actualiza el estado con los hoteles restantes
					console.log(`Hoteles con ID ${id} eliminado`);
				})
			},

			//editar un Hotel
			editarHotel: (id, updateHoteles) => {
				fetch(`https://laughing-enigma-7qx7qv57p4gcw57r-3001.app.github.dev/api/hoteles/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updateHoteles)
			})
			.then((response) => response.json())
			.then((data) => {
				const store = getStore();
				const newHotel = store.hoteles.map(hotel =>
					hotel.id === parseInt(id) ? data : hotel
				);
				setStore({hoteles: newHotel});
				console.log(`Hoteles con ID ${id} actualizado`);
			})
		},
	}
			
	};
};

export default getState;
