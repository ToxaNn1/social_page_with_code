import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Buttons.module.css";

const Buttons = (props) => {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className={style.buttons}>
            {pathname === "/friends" ? (
                <button onClick={() => props.deleteFriend(props.personId)} className={style.button}>
                    Видалити з друзів
                </button>
            ) : (
                <button
                    onClick={() => {
                        props.setActive(true);
                    }}
                    className={style.button}
                >
                    Видалити з друзів
                </button>
            )}
            <Link to={`/friends/message/${props.personId}`}>
                <button className={style.button}>Написати повідомлення</button>
            </Link>
        </div>
    );
};

export default Buttons;
