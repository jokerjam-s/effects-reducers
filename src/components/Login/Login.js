import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import { type } from "@testing-library/user-event/dist/type";
import AuthContext from "../../context/auth-context";

const Login = (props) => {
	// const [inputEmail, setInputEmail] = useState("");
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [inputPassword, setInputPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const ctx = useContext(AuthContext);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const emailReducer = (prevState, action) => {
		if (action.type === 'USER_INPUT') {
			return {
				value: action.value,
				isValid: action.value.includes('@')
			};
		}

		if (action.type === 'INPUT_BLUR') {
			return {
				value: prevState.value,
				isValid: prevState.value.includes('@')
			};
		}

		return {
			value: '',
			isValid: false
		};
	};


	// prevState - предыдущее состояние, action - текущее состояние
	const passwordReducer = (prevState, action) => {
		if (action.type === 'USER_INPUT') {
			return {
				value: action.value,
				isValid: action.value.trim().length > 7
			};
		}

		if (action.type === 'USER_BLUR') {
			return {
				value: prevState.value,
				isValid: prevState.value.trim().length > 7
			};
		}

		return {
			value: '',
			isValid: false
		};
	};

	const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: false });
	const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, { value: '', isValid: false });

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const timer = setTimeout(() => {
			console.log('effect applying');
			setFormIsValid(
				emailIsValid && passwordIsValid
			);
		}, 1000);

		return () => {
			clearTimeout(timer);
			console.log('clearning');
		}

	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmailState({ type: 'USER_INPUT', value: event.target.value });
		setFormIsValid(
			emailState.isValid && passwordState.isValid
		);
	};

	const passwordChangeHandler = (event) => {
		dispatchPasswordState({ type: 'USER_INPUT', value: event.target.value })
		setFormIsValid(
			emailState.isValid && passwordState.isValid
		);
	};

	const validateEmailHandler = () => {
		dispatchEmailState({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPasswordState({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		console.log(formIsValid);
		if (formIsValid) {
			ctx.onLogin(emailState.value, passwordState.value);
		}
		else if (!emailIsValid) {
			emailInputRef.current.focus();
		}
		else {
			passwordInputRef.current.focus();
		}


		// ctx.onLogin(emailState.value, passwordState.value)
		// if(formIsValid){
		// 	ctx.isLoggedIn = true;
		// }
	};



	return (
		<Card className={styles.login}>
			<form onSubmit={submitHandler}>
				<Input
					label="Email"
					type="email"
					id="email"
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					isValid={emailIsValid}
					ref={emailInputRef}
				/>
				<Input
					label="password"
					type="password"
					id="password"
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					isValid={passwordIsValid}
					ref={passwordInputRef}
				/>

				<div className={styles.actions}>
					<Button type="submit" className={styles.btn} disabled={!formIsValid}>
						Вход
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
