import React, { useState, useContext } from "react";
import { Context } from "../../..";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

const Login = () => {
    const { auth } = useContext(Context);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm({ mode: "onChange" });
    // стейти для полів логін і пароль
    const [valueLogin, setValueLogin] = useState("");
    const [valuePassword, setValuePassword] = useState();
    const [errorLogin, setErrorLogin] = useState(false);

    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);

    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const [showInput, setShowInput] = useState(false);

    const loginGoogle = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            })
            .then(() => {
                navigate("/main");
                //перекинути на головну сторінку
            });
    };

    const login = async () => {
        await signInWithEmailAndPassword(auth, valueLogin, valuePassword)
            .then((result) => {
                navigate("/main"); //перекинути на головну сторінку
                return result;
            })
            .catch((error) => {
                setErrorLogin(true);
            });
    };

    const redirectToRegistation = () => {
        navigate("registration");
    };

    const forgetPassword = async () => {
        setShowInput((showInput) => !showInput);
        await sendPasswordResetEmail(email)
            .then((result) => {
                alert("Провірте свою почту");
            })
            .catch((error) => {
                setErrorEmail(true);
            });
    };

    const showForgetInput = () => {
        setShowInput((showInput) => !showInput);
    };

    const onSubmit = (data) => console.log(data);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.container}>
            <h1>Ввійти</h1>
            <div className={style.inputsBox}>
                {errorLogin && isSubmitSuccessful ?  <span>Такого аккаунту не існує</span> : null}
                <div className={style.input}>
                    <input
                        {...register("email", {
                            required: "Поле необхідно заповнити",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Некоректні дані",
                            },
                        })}
                        onChange={(e) => setValueLogin(e.target.value)}
                        type="email"
                        placeholder="login"
                    />
                    {errors?.email && <span>{errors.email.message}</span>}
                </div>
                <div className={style.input}>
                    <input
                        {...register("password", {
                            required: {
                                message: "Поле необхідно заповнити",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                message:
                                    "Пароль має містити одну велику букву і спеціальний символ та цифри",
                            },
                        })}
                        onChange={(e) => setValuePassword(e.target.value)}
                        type="text"
                        placeholder="password"
                    />
                    {errors?.password && <span>{errors.password.message}</span>}
                </div>
                <div className={style.inputFooter}>
                    <button onClick={showForgetInput} className={style.button}>
                        Забули пароль?
                    </button>

                    <button className={style.button} onClick={redirectToRegistation}>
                        Реєстрація
                    </button>
                </div>
            </div>
            {errors?.login && <span>{errors.login.message}</span>}
            {showInput === false ? null : (
                <div className={style.resetPassword}>
                    <input
                        {...register("login", {
                            required: "Поле необхідно заповнити",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "Некоректні дані",
                            },
                        })}
                        className={style.emailReset}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="enter your email"
                    />
                    <button onClick={forgetPassword} className={style.forgetButton}>
                        Відправити
                    </button>
                </div>
            )}
            <div className={style.footer}>
                <div className={style.footerLogin}>
                    <button onClick={login} className={style.btn}>
                        ввійти
                    </button>
                    <button onClick={loginGoogle} className={style.btn}>
                        Ввійти з допомогою гугл
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;
