import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import { type } from "@testing-library/user-event/dist/type";

const Login = (props) => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [inputPassword, setInputPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

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

  const [emailState, dispatchEmailState] = useReducer(emailReducer, { value: '', isValid: false });

  // useEffect(()=>{
  //   const timer = setTimeout(() => {
  //     console.log('effect applying');
  //     setFormIsValid(
  //       inputEmail.includes("@") && inputPassword.trim().length > 7
  //     );
  //   }, 500);

  //   return () => {
  //     clearTimeout(timer);
  //     console.log('clearning');
  //   }

  // }, [inputEmail, inputPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: 'USER_INPUT', value: event.target.value });
    setFormIsValid(
      emailState.isValid && inputPassword.trim().length > 7
    );
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 7
    );
  };

  const validateEmailHandler = () => {
    dispatchEmailState({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 7);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
