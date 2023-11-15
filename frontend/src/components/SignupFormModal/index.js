import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

const SignupFormModal = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const history = useHistory();

	if (sessionUser) return history.push("/");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signUp({
					email,
					username,
					firstName,
					lastName,
					password,
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) {
						//console.log(data)
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				"Confirm Password field must be the same as the Password field",
		});
	};

	const handleDisabled = (
		email,
		username,
		firstname,
		lastname,
		password,
		confirm
	) => {
		if (
			email.length < 1 ||
			username.length < 1 ||
			firstname.length < 1 ||
			lastname.length < 1 ||
			password.length < 1 ||
			confirm.length < 1
		) {
			return true;
		}

		if (username.length < 4 || password.length < 6) {
			return true;
		}

		return false;
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form className="signUp" onSubmit={handleSubmit}>
				<label>
					Email
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p>{errors.email}</p>}
				<label>
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors.username && <p>{errors.username}</p>}
				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				{errors.firstName && <p>{errors.firstName}</p>}
				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				{errors.lastName && <p>{errors.lastName}</p>}
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p>{errors.password}</p>}
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors.confirmPassword && <p>{errors.confirmPassword}</p>}
				<button
					className="signup-button"
					disabled={handleDisabled(
						email,
						username,
						firstName,
						lastName,
						password,
						confirmPassword
					)}
					type="submit"
				>
					Sign Up
				</button>
			</form>
		</>
	);
};

export default SignupFormModal;
