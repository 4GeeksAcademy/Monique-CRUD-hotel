const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			categories: [],
			rooms: []

		},


		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			setCategories: (categories) => {
				setStore({ categories })
			},

			setRooms: (rooms) => {
				store.rooms = rooms; // Aquí actualizamos el estado de rooms
			},

			logout: () => {
				console.log("logout")
				localStorage.removeItem("token");
				setStore({ auth: false });
			},

			login: (email, password) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				};

				return fetch(process.env.BACKEND_URL + "/api/loginhotel", requestOptions)
					.then(response => {
						console.log(response.status)
						if (response.status == 200) {
							return response.json().then(data => {
								localStorage.setItem("token", data.access_token);
								setStore({ auth: true });
								return true; // Exito
							});
						} else {
							setStore({ auth: false });
							return false; //fallo el login
						}
					})
			},

			signup: (nombre, email, password) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(
						{
							"nombre": nombre,
							"email": email,
							"password": password
						}
					)
				};

				fetch(process.env.BACKEND_URL + "/api/signuphotel", requestOptions)
					.then(response => response.text())
					.then((result) => console.log(result))

			},
			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

		},
	};
};

export default getState;