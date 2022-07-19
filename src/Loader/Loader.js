import React from "react";
import style from "./Loader.module.css";
const Loader = () => {
    return (
        <div className={style.container}>
            <div className={style.box} >
                <div className={style.ldsRoller}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
