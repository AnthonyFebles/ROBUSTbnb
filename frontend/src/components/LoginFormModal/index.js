import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({});

	const { closeModal } = useModal();

	if (sessionUser) {
		//console.log(sessionUser);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		dispatch(sessionActions.logIn({ credential, password }))
			.then(() => closeModal())
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message) setErrors({ message: data.message });
				//console.log(data)
				alert(data.message);
			});
	};

	const handleDisabled = (cred, pass) => {
		if (cred.length < 4 || pass.length < 6) {
			return true;
		}
		return false;
	};

	const handleDemo = () => {
		setCredential("Isa-Demo");
		setPassword("password");
		dispatch(sessionActions.logIn({ credential, password }))
			.then(() => closeModal())
			.catch(async (res) => {
				const data = await res.json();
			});
	};

	return (
		<>
			<h1>Log In</h1>
			<form className="login-form" onSubmit={handleSubmit}>
				<label>
					Username or Email
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</label>
				<label className="pword">
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors && <p>{errors.message}</p>}
				<button
					className="login"
					type="submit"
					disabled={handleDisabled(credential, password)}
				>
					Log In
				</button>
				<button onClick={handleDemo} className="demo-login" type="submit">
					Demo User
				</button>
			</form>
		</>
	);
};

export default LoginFormModal;
