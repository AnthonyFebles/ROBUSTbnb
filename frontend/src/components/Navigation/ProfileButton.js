import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css'
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const history = useHistory()

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu, dispatch]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logOut());
		history.push('/')
		setShowMenu(false)
	};

	

	const ulClassName = "profile-dropdown" + (showMenu ? " " : " hidden");

	return (
		<>
			<button className="actual-profile-button" onClick={openMenu}>
				<i className="fa-solid fa-bars"></i>
				{' '}
				
				<i className="fas fa-user-circle" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<li className="dropdown-li">{user.username}</li>
						<li className="dropdown-li">
							Hello {user.firstName} {user.lastName}
						</li>
						<li className="dropdown-li">{user.email}</li>
						<li className="dropdown-li-logout">
							<button onClick={logout}>Log Out</button>
						</li>
					</>
				) : (
					<>
						<li className="dropdown-li-login">
							<OpenModalButton
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>
						</li>
						<li className="dropdown-li-signup">
							<OpenModalButton
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
						</li>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
