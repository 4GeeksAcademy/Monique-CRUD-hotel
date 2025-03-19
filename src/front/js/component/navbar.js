import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#9b5de5" }}>
						<div className="container-fluid">
							<Link className="navbar-brand text-white fs-2" to="/">APIHOTEL</Link>
							<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<div className="collapse navbar-collapse" id="navbarNav">
								<ul className="navbar-nav ms-auto">
									<li className="nav-item">
										<Link className="nav-link text-white fs-5" to="/authhotel">Hotel Login</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-white fs-5" to="/loginHouseKeeper">Housekeeper Login</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link text-white fs-5" to="/loginMaintenance">Maintenance Login</Link>
									</li>
								</ul>
							</div>
						</div>
					</nav>
	);
};