import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
        console.log(showMenu)
        if (showMenu) return ;
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
	}, [showMenu]);

	const logOut = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logOut());
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<button onClick={openMenu}>
				User Info <i className="fas fa-user-circle" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				<li>{user.username}</li>
				<li>
					{user.firstName} {user.lastName}
				</li>
				<li>{user.email}</li>
				<li>
					<button onClick={logOut}>Log Out</button>
				</li>
			</ul>
		</>
	);
}

export default ProfileButton;
