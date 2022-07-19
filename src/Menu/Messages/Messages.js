import React, { useEffect } from "react";
import style from "../Messages/Messages.module.css";
import { fetchInfo } from "../../Store/asyncActions/asyncInfo";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Messages = () => {
    const dispatch = useDispatch();

    const perosnalInfoList = useSelector((state) => state.info);

    useEffect(() => {
        dispatch(fetchInfo.getAll());
    });

    return (
        <div>
            {perosnalInfoList === false ? (
                <p>Немає ще повідомлень</p>
            ) : (
                perosnalInfoList.map((person) => {
                    return (
                        <div
                            onClick={() => console.log(person.id)}
                            key={person.id}
                            className={style.container}
                        >
                            <div className={style.image}>
                                <img src="../image/ava.jpg" alt="fsdf" />
                            </div>
                            <div className={style.personalInfo}>
                                <Link to={`/menu/friends/${person.id}`}>
                                    <p className={style.paragraph}>name: {person.name}</p>
                                </Link>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Messages;
