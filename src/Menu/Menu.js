import React from "react";
import style from "../Menu/Menu.module.css";
import { NavLink } from "react-router-dom";
import Messages from "./Messages/Messages";
const Menu = () => {
    return (
        <div className={style.container}>
            <NavLink exact to='/menu/friends'>Friends</NavLink>
        </div>
    );
};

export default Menu;
