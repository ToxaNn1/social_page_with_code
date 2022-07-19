import React, { useContext, useState } from "react";
import styles from "../CharacterDescrip/CharacterDescrip.module.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, updateDoc } from "firebase/firestore";
import Loader from "../../Loader/Loader";
import { Context } from "../..";


const CharacterDescrip = (props) => {
    const { auth, firestore } = useContext(Context);
    const [registerData, loading] = useCollectionData(
        collection(firestore, `User:${auth?.currentUser?.uid}`)
    );
        //inputs
    const [inputName, setInputName] = useState("");
    const [inputSurname, setInputSurname] = useState("");
    const [inputAge, setInputAge] = useState("");
    const [inputCountry, setInputCountry] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputGender, setInputGender] = useState("");
    const [inputUniversity, setInputUniversity] = useState("");
    const [inputPhone, setInputPnone] = useState("");
    const [inputStreet, setInputStreet] = useState("");

    let data;
    if (loading) {
        <Loader></Loader>;
    } else {
        data = registerData[0];
    }

    //Uncaught FirebaseError: Expected type 'ba', but it was: a custom va object

    const saveOptions = () => {
        updateDoc(collection(firestore, `User:${auth.currentUser.uid}`), {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: inputName,
            surname: inputSurname,
            gender: inputGender,
            age: inputAge,
            city: inputCity,
            university: inputUniversity,
            phone: inputPhone,
            country: inputCountry,
            street: inputStreet,
            createdAt: Date.now(),
        });
        props.setIsActiveSettings(false);
    };

    return (
        <div className={styles.mainContainer}>
            {loading ? (
                <Loader></Loader>
            ) : props.isActive ? (
                <div>
                    <div className={styles.updateData}>
                        <div className={styles.updateCol}>
                            <div className={styles.updateOneInput}>
                                <label htmlFor="name">Name: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputName((item) => e.target.value)}
                                    placeholder="Name"
                                    type="text"
                                    id="name"
                                />
                            </div>
                            <div className={styles.updateOneInput}>
                                <label htmlFor="surname">Surname: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputSurname((item) => e.target.value)}
                                    placeholder="Surname"
                                    type="text"
                                    id="surname"
                                />
                            </div>
                            <div className={styles.updateOneInput}>
                                <label htmlFor="gender">Gender: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputGender((item) => e.target.value)}
                                    placeholder="Gender"
                                    type="text"
                                    id="gender"
                                />
                            </div>
                            <div className={styles.updateOneInput}>
                                <label htmlFor="age">Age: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputAge((item) => e.target.value)}
                                    placeholder="Age"
                                    type="text"
                                    id="age"
                                />
                            </div>
                        </div>
                        <div className={styles.updateCol}>
                            <div className={styles.updateOneInput}>
                                {" "}
                                <label htmlFor="country">Country: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputCountry((item) => e.target.value)}
                                    placeholder="Country"
                                    type="text"
                                    id="country"
                                />
                            </div>
                            <div className={styles.updateOneInput}>
                                {" "}
                                <label htmlFor="city">City: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputCity((item) => e.target.value)}
                                    placeholder="City"
                                    type="text"
                                    id="city"
                                />
                            </div>
                            <div className={styles.updateOneInput}>
                                {" "}
                                <label htmlFor="street">Stret: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputStreet((item) => e.target.value)}
                                    placeholder="Street"
                                    type="text"
                                    id="street"
                                />
                            </div>
                            <div className={styles.updateOneInput}>
                                <label htmlFor="university">University: </label>
                                <input
                                    className={styles.updateInput}
                                    onChange={(e) => setInputUniversity((item) => e.target.value)}
                                    placeholder="University"
                                    type="text"
                                    id="university"
                                />
                            </div>
                        </div>
                        <div className={styles.updateOneInput}>
                            <label htmlFor="label">Phone: </label>
                            <input
                                className={styles.updateInputLast}
                                onChange={(e) => setInputPnone((item) => e.target.value)}
                                placeholder="PHONE"
                                type="text"
                                id="label"
                            />
                        </div>
                    </div>
                    <div className={styles.blockButton}>
                        <button className={styles.buttonOption} onClick={saveOptions}>
                            Зберегти
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className={styles.description}>
                        <div className={styles.halfInfo}>
                            {data?.name || data?.suranme ? (
                                <p className={styles.paragraph}>
                                    Full name: {data.name} {data.suranme}
                                </p>
                            ) : (
                                <p className={styles.paragraph}>
                                    Full name: {auth.currentUser?.displayName}
                                </p>
                            )}
                            {data?.gender ? (
                                <p className={styles.paragraph}>gender: {data.gender} </p>
                            ) : null}
                        </div>
                        <div className={styles.halfInfo}>
                            {data?.age ? <p className={styles.paragraph}>age:{data.age} </p> : null}
                            {data?.country ? (
                                <p className={styles.paragraph}>country: {data.country} </p>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.description}>
                        <div className={styles.halfInfo}>
                            {data?.city ? (
                                <p className={styles.paragraph}> city: {data.city} </p>
                            ) : null}
                            {data?.street ? (
                                <p className={styles.paragraph}>street: {data.street} </p>
                            ) : null}
                        </div>
                        <div className={styles.halfInfo}>
                            {data?.university ? (
                                <p className={styles.paragraph}> university: {data.university} </p>
                            ) : null}
                            {data?.phone ? (
                                <p className={styles.paragraph}> phone: {data.phone} </p>
                            ) : null}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CharacterDescrip;
