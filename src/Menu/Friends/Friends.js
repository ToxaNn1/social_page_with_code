import React, { useState, useEffect, useContext } from "react";
import style from "../Friends/Friends.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchInfo } from "../../Store/asyncActions/asyncInfo";
import { deleteCreater, searchCreater } from "../../Store/Reduce/reducerMain";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../..";
import Buttons from "./Buttons/Buttons";

const Friends = () => {
    const dispatch = useDispatch();
    const allInfo = useSelector((state) => state);
    // context
    const { auth } = useContext(Context);
    // search
    const [value, setValue] = useState("");
    // if login or log out
    const [user] = useAuthState(auth);
    
    useEffect(() => {
        dispatch(fetchInfo.getAll());
    }, []);

    const deleteFriend = (id) => {
        dispatch(deleteCreater(id));
    };

    const inputValue = (elem) => {
        setValue((value) => elem.target.value);
    };

    const searchFriend = () => {
        dispatch(searchCreater(value));
        if (value === "") {
            dispatch(fetchInfo.getAll());
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.search}>
                <input className={style.searchInput} value={value} onChange={inputValue} type="text" name="search" placeholder="Search Friend"/>
                <button className={style.searchBtn} onClick={() => searchFriend()}>Search</button>
            </div>
            {allInfo.info === false ? (
                <div>Нема такого друга</div>
            ) : (
                allInfo.info.map((person) => {
                    return (
                        <div
                            onClick={() => console.log(person.id)}
                            key={person.id}
                            className={style.container}
                        >
                            <div className={style.image}>
                                <img src="../image/ava.jpg" alt="fsdf" />
                                {user ? (
                                    <Buttons
                                        deleteFriend={deleteFriend}
                                        personId={person.id}
                                    ></Buttons>
                                ) : null}
                            </div>
                            <div className={style.personalInfo}>
                                <Link to={`/friends/${person.id}`}>
                                    <p className={style.paragraph}>name: {person.name}</p>
                                </Link>
                                <p className={style.paragraph}>username: {person.username}</p>
                                <p className={style.paragraph}>email: {person.email}</p>
                                <p className={style.paragraph}>city: {person.address.city}</p>
                                <p className={style.paragraph}>street: {person.address.street}</p>
                                <p className={style.paragraph}>phone:{person.phone}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default Friends;
