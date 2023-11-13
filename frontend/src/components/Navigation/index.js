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

	const history= useHistory

	const handleClick = () => {
		
	}

	return (
		<header>
			<nav className="nav-bar">
				<ul>
					<li className="logo-home">
						<NavLink exact to="/">
							<img className="logo" src="https://i.imgur.com/9IQJP32.png"></img>
						</NavLink>
					</li>
				</ul>
			</nav>
			{isLoaded && (
				<div className="right-side-nav">
					<div className="newSpotButton">
						{sessionUser ? <button className="new-spot-button">Create A New Spot</button> : <></>}
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
