import React, { useState, useEffect } from "react";
import styles from "../MainCharacter/MainCharacter.module.css";
import CharacterDescrip from "./CharacterDescrip/CharacterDescrip";
import Posts from "./Posts/Posts";
import Galary from "./Galary/Galary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const MainCharacter = () => {
    const location = useLocation();
    const [isActiveSettings, setIsActiveSettings] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0 });
        // scroll to the top of the browser window when changing route
    }, [location]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.image}>
                    <img src="image/ava.jpg" alt="fdsf" />
                </div>
                <CharacterDescrip isActive={isActiveSettings}></CharacterDescrip>
                {location.pathname === "/main" ? (
                    <div className={styles.icon}>
                        <FontAwesomeIcon
                            className={styles.settings}
                            onClick={() => setIsActiveSettings(!isActiveSettings)}
                            icon={faGear}
                        />
                    </div>
                ) : null}
            </div>
            <div className={styles.galary}>
                <h2 >Галерея</h2>
                <Galary></Galary>
            </div>

            <div className={styles.posts}>
                <Posts></Posts>
            </div>
        </div>
    );
};

export default MainCharacter;
