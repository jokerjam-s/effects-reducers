import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import { type } from "@testing-library/user-event/dist/type";

const Login = (props) => {
  // const [inputEmail, setInputEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [inputPassword, setInputPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
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
    props.onLogin(emailState.value, passwordState.value);
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
          className={`${styles.control} ${passwordState.isValid === false ? styles.invalid : ""
            }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
