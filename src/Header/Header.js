import React, { useContext, useState } from "react";
import styles from "../Header/Header.module.css";
import Logo from "./Logo/Logo";
import Navbar from "./Navbar/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { Context } from "../index";

const Header = () => {
    const { auth } = useContext(Context);
    const location = useLocation();

    const [sendEmailVerification] = useSendEmailVerification(auth);

    const [CloseWindow, setCloseWindow] = useState(true);

    let isVerified = auth;

    const refreshEmail = async () => {
        await sendEmailVerification(auth.currentUser);
    };

    return (
        <>
            {location.pathname === "/main" && auth.currentUser !== null ? (
                !isVerified.currentUser.emailVerified && CloseWindow ? (
                    <div className={styles.blockVer}>
                        <p>Пітвердіть Вашу почту</p>
                        <button className={styles.verButton} onClick={refreshEmail}>
                            Відправити повідомлення ще раз
                        </button>
                        <div className={styles.cross}>
                            <p onClick={() => setCloseWindow(false)}>x</p>
                        </div>
                    </div>
                ) : null
            ) : null}

            <header className={styles.main}>
                <Logo></Logo>

                <div className={styles.nav}>
                    <NavLink to="/friends">
                        <p className={styles.paragraph}>Друзі</p>
                    </NavLink>
                    <NavLink to="/main">
                        <p className={styles.paragraph}>Головна</p>
                    </NavLink>
                </div>
                    <Navbar></Navbar>
            </header>
        </>
    );
};

export default Header;
