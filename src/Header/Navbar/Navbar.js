import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../../Routes/Routes";
import style from "./Navbar.module.css";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);

    return (
        <div className={style.navbar}>
            {user ? (
                <NavLink to={LOGIN_ROUTE}>
                    <button onClick={() => auth.signOut()} className={style.btn}>
                        LOG OUT
                    </button>
                </NavLink>
            ) : (
                <NavLink to={LOGIN_ROUTE}>
                    <button className={style.btn}>LOGIN</button>
                </NavLink>
            )}
        </div>
    );
};

export default Navbar;
