import React, { useState, useContext } from "react";
import style from "./Registation.module.css";
import { Context } from "../../..";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";

const Registation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm({ mode: "onChange" });
    // дані про юзера
    const { auth, firestore } = useContext(Context);
    const [ errorReg, setErrorReg] = useState(false)
    // login and password
    const [valueLogin, setValueLogin] = useState();
    const [valuePassword, setValuePassword] = useState();
    // стейти для полів фамілія.імя.вік і тд
    const [inputName, setInputName] = useState("");
    const [inputSurname, setInputSurname] = useState("");
    const [inputAge, setInputAge] = useState("");
    const [inputCountry, setInputCountry] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputGender, setInputGender] = useState("");
    const [inputUniversity, setInputUniversity] = useState("");
    const [inputPhone, setInputPnone] = useState("");
    const [inputStreet, setInputStreet] = useState("");

    //перекинути на головну сторінку
    const navigate = useNavigate();

    if (isSubmitSuccessful) {
        console.log(1111111111111111);
    }

    const registration = async () => {
        await createUserWithEmailAndPassword(auth, valueLogin, valuePassword)
            .then((result) => {
                const newUser = result.user;
                return newUser;
            })
            .catch((error, result) => {
                setErrorReg(true)
                return result;
            })
            .then((result) => {
                addDoc(collection(firestore, `User:${result.uid}`), {
                    uid: result.uid,
                    email: result.email,
                    password: valuePassword,
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
            })
            .then(() => {
                navigate("/main"); //перекинути на головну сторінку
            });
    };

    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.regBlock}>
            <h1 className={style.h}>Реєстрація</h1>
            {errorReg && isSubmitSuccessful ?  <span>Такий аккаунт вже існує</span> : null}
            <div className={style.block}>
                <div className={style.blockValidation}>
                    {errors?.email && <p>{errors.email.message}</p>}
                    <input
                        {...register("email", {
                            required: "Поле необхідно заповнити",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Некоректні дані",
                            },
                        })}
                        className={style.input}
                        onChange={(e) => setValueLogin(e.target.value)}
                        type="text"
                        placeholder="email"
                    />
                </div>
                <div className={style.blockValidation}>
                    {errors?.password && <p>{errors.password.message}</p>}
                    <input
                        {...register("password", {
                            required: "Поле необхідно заповнити",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                message:
                                    "Пароль має містити одну велику букву і спеціальний символ та цифри",
                            },
                        })}
                        className={style.input}
                        onChange={(e) => setValuePassword(e.target.value)}
                        type="text"
                        placeholder="password"
                    />
                </div>
            </div>
            <div className={style.block}>
                <div className={style.blockValidation}>
                    {errors?.name && <p>{errors.name.message}</p>}
                    <input
                        {...register("name", {
                            required: "Поле необхідно заповнити",
                            minLength: {
                                value: 4,
                                message: "Мінімум 4 символа",
                            },
                        })}
                        className={style.input}
                        onChange={(e) => setInputName((item) => e.target.value)}
                        placeholder="Name"
                        type="text"
                    />
                </div>
                <div className={style.blockValidation}>
                    {errors?.surname && <p>{errors.surname.message}</p>}
                    <input
                        {...register("surname", {
                            required: "Поле необхідно заповнити",
                            minLength: {
                                value: 4,
                                message: "Мінімум 4 символа",
                            },
                        })}
                        className={style.input}
                        onChange={(e) => setInputSurname((item) => e.target.value)}
                        placeholder="Surname"
                        type="text"
                    />
                </div>
            </div>
            <div className={style.block}>
                <input
                    className={style.input}
                    onChange={(e) => setInputGender((item) => e.target.value)}
                    placeholder="Gender"
                    type="text"
                />
                <input
                    className={style.input}
                    onChange={(e) => setInputAge((item) => e.target.value)}
                    placeholder="Age"
                    type="text"
                />
            </div>
            <div className={style.block}>
                <input
                    className={style.input}
                    onChange={(e) => setInputCountry((item) => e.target.value)}
                    placeholder="Country"
                    type="text"
                />
                <input
                    className={style.input}
                    onChange={(e) => setInputCity((item) => e.target.value)}
                    placeholder="City"
                    type="text"
                />
            </div>
            <div className={style.block}>
                <input
                    className={style.input}
                    onChange={(e) => setInputStreet((item) => e.target.value)}
                    placeholder="Street"
                    type="text"
                />
                <input
                    className={style.input}
                    onChange={(e) => setInputUniversity((item) => e.target.value)}
                    placeholder="University"
                    type="text"
                />
            </div>
            <div className={style.block}>
                <input
                    className={style.input}
                    onChange={(e) => setInputPnone((item) => e.target.value)}
                    placeholder="PHONE"
                    type="number"
                />
            </div>
            <button className={style.btnReg} onClick={registration}>
                зареєструватись
            </button>
        </form>
    );
};

export default Registation;
