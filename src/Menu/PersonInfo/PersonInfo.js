import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import style from "../PersonInfo/PersonInfo.module.css";
// dispatch
import { useDispatch } from "react-redux";
import { fetchInfo } from "../../Store/asyncActions/asyncInfo";
import { fetchPosts } from "../../Store/asyncActions/asyncPosts";
import { deleteCreater } from "../../Store/Reduce/reducerMain";
// components
import FriendDescrip from "../FriendCharacter/FriendDescrip";
import Galary from "../../MainCharacter/Galary/Galary";
import Posts from "../../MainCharacter/Posts/Posts";
import Buttons from "../Friends/Buttons/Buttons";
import ModalButtons from "../Friends/ModalButtons/ModalButtons";

const PersonInfo = () => {
    const { auth } = useContext(Context);
    const { personId } = useParams();
    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);
    const [isFriend, setIsFriendDelete] = useState(true);

    useEffect(() => {
        dispatch(fetchInfo.getById(personId));
        dispatch(fetchPosts());
    }, [dispatch, personId]);

    const deleteFriend = (id) => {
        dispatch(deleteCreater(id));
        setIsFriendDelete((isFriendDelete) => false);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.main}>
                <div className={style.imageBlock}>
                    <img src="../../image/ava.jpg" alt="ffsdf" />
                    {auth.currentUser !== null ? (
                        isFriend ? (
                            <Buttons
                                setActive={setModalActive}
                                deleteFriend={deleteFriend}
                                personId={personId}
                            ></Buttons>
                        ) : null
                    ) : null}
                </div>

                {isFriend === false ? null : (
                    <ModalButtons
                        active={modalActive}
                        setActive={setModalActive}
                        popUpFromButton={isFriend}
                    >
                        <div className={style.modal}>
                            <p  className={style.modalParagpaph}>Ви впевнені що хочете видалити друга?</p>
                            <button  className={style.modalButton} onClick={() => setIsFriendDelete(false)}>Так</button>
                            <button  className={style.modalButton} >Ні</button>
                        </div>
                    </ModalButtons>
                )}
                <FriendDescrip></FriendDescrip>
            </div>
            <div className={style.galary}>
                <h2>Галерея</h2>
                <Galary></Galary>
            </div>
            <div>
                <Posts></Posts>
            </div>
        </div>
    );
};

export default PersonInfo;
