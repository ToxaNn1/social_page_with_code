import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";

const NotFound = () => {
    const { auth } = useContext(Context);
    console.log(auth.currentUser);
    return (
        <div>
            <h1>Сторінка не найдена</h1>
            {auth.currentUser !== null ? (
                <Link to="main">
                    <p>Перейти на головну</p>
                </Link>
            ) : null}
        </div>
    );
};

export default NotFound;
