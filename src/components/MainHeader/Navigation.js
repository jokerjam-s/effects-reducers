import React, { useContext } from "react";

import styles from "./Navigation.module.css";
import AuthContext from "../../context/auth-context";

const Navigation = () => {
    const ctx = useContext(AuthContext);
    console.log(ctx.isLoggedIn);
    return (
        <nav className={styles.nav}>
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Пользователи</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Админ</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogout}>Выйти</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
