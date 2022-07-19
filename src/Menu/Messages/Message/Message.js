import React, { useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../../../index";
import { collection, addDoc, orderBy } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInfo } from "../../../Store/asyncActions/asyncInfo";
import style from "./Message.module.css";
import Loader from "../../../Loader/Loader";

const Message = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    // parametrs
    const { personId } = useParams();
    const nameOfCollection = `messages_${personId}`;
    // database
    const [messages, loading] = useCollectionData(
        collection(firestore, `User:${auth.currentUser.uid}`, "messageCollection", nameOfCollection)
    );
    //messages
    const [value, setValue] = useState("");
    const [idMessage, setidMessage] = useState(1);
    // dispatch
    const dispatch = useDispatch();
    const allInfo = useSelector((state) => state.infoPerson);

    useEffect(() => {
        dispatch(fetchInfo.getById(personId));
    }, []);

    let sortedArray = [];

    const sendMessages = async () => {
        await addDoc(
            collection(
                firestore,
                `User:${auth.currentUser.uid}`,
                "messageCollection",
                nameOfCollection
            ),
            {
                numberMessage: idMessage,
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                createdAt: Date.now(),
            }
        );
        setidMessage((idMessage) => idMessage + 1);
        console.log(user);
        setValue("");
    };

    sortedArray = messages?.sort((a, b) => (a.numberMessage > b.numberMessage ? 1 : -1));

    return (
        <div className={style.container}>
            <div className={style.personalInfo}>
                <div className={style.avatar}>
                    <img src="../../../image/ava.jpg" alt="" />
                </div>
                <div>
                    <p>{allInfo.name}</p>
                </div>
            </div>

            <div className={style.box}>
                {loading ? (
                    <Loader></Loader>
                ) : (
                    
                    sortedArray?.map((item) => {
                        return (
                            <div
                                key={item.createdAt}
                                className={
                                    user.uid === item.uid
                                        ? [style.userBox, style.myMessage].join(" ")
                                        : [style.userBox, style.friendMessage].join(" ")
                                }
                            >
                                <div className={style.infoPerson}>
                                    <img className={style.img} src={item.photoURL} alt="s" />
                                    <div>{item.displayName}</div>
                                </div>
                                <div>{item.text}</div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className={style.boxInput}>
            {console.log(sortedArray)}
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    className={style.input}
                    type="text"
                    name=""
                    id=""
                />
                <button onClick={sendMessages} className={style.button}>
                    Enter
                </button>
            </div>
        </div>
    );
};

export default Message;
