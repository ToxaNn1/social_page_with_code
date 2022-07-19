import React from "react";
import styles from "../ModalButtons/ModalButtons.module.css";

const ModalButtons = ({ active, setActive, children }) => {
    return (
        <div
            className={active ? [styles.modal, styles.active].join(" ") : styles.modal}
            onClick={() => setActive(false)}
        >
            <div
                className={
                    active ? [styles.modalContent, styles.active].join(" ") : styles.modalContent
                }
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalButtons;
