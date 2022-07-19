import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInfo } from "../../Store/asyncActions/asyncInfo";
import style from '../FriendCharacter/FriendDescrip.module.css'

const FriendDescrip = () => {
    const { personId } = useParams();
    const dispatch = useDispatch();
    const { name, email, phone, address } = useSelector((state) => state.infoPerson);
    // const allInfo = useSelector((state) => state);
    //address.city не вертає, помилка
    useEffect(() => {
        dispatch(fetchInfo.getById(personId));
    }, [dispatch, personId]);

    return (
        <div className={style.friendDescrip}>
            <p className={style.descrip}>name: {name ? name : ""}</p>
            <p className={style.descrip}>email: {email ? email : ""}</p>
            <p className={style.descrip}>phone: {phone}</p>
            {/* <p>street: {address.street ? address.street : " "}</p> */}
            {/* <p>city: {city}</p>
            {/* {allInfo.map(({ item }) => {
                return (
                    <div>
                        <p>name: {name ? name : ""}</p>
                        <p>email: {email ? email : ""}</p>
                        <p>phone: {phone}</p>
                        <p>city: {address.city}</p>
                        <p>street: {address.street}</p>
                    </div>
                );
            })} */}
        </div>
    );
};

export default FriendDescrip;
