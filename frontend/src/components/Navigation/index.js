import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";

// import * as sessionActions from "../../store/session";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import OpenModalButton from "../OpenModalButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const history= useHistory()

	const handleClick = () => {
		 history.push('/spots/new')
	}

	return (
		<header>
			<nav className="nav-bar">
				<ul>
					<li className="logo-home">
						<NavLink exact to="/">
							<img
								className="logo"
								src="https://tinypic.host/images/2023/11/16/Robust-BnB.png"
							></img>
						</NavLink>
					</li>
				</ul>
			</nav>
			{isLoaded && (
				<div className="right-side-nav">
					<div className="newSpotButton">
						{sessionUser ? (
							<button onClick={handleClick} className="new-spot-button">
								Create A New Spot
							</button>
						) : (
							<></>
						)}
					</div>

					<div className="profile-button">
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</header>
	);
}

export default Navigation;
