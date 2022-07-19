import React, { useContext } from "react";
import style from "./App.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "../index";
import { Routes, Route } from "react-router-dom";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
// Components
import MainCharacter from "../MainCharacter/MainCharacter.js";
import Friends from "../Menu/Friends/Friends";
import PersonInfo from "../Menu/PersonInfo/PersonInfo.js";
import Login from "../Header/Navbar/Login/Login";
import Message from "../Menu/Messages/Message/Message";

import Loader from "../Loader/Loader";
import Layout from "../Routes/Layout";
import Registation from "../Header/Navbar/Registation/Registation";
import NotFound from "../NotFound/NotFound";

function App() {
    const { auth } = useContext(Context);
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className={style.wrapper}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* logins */}
                    <Route index element={<Login />} />
                    <Route path="registration" element={<Registation />} />
                    {/* {main} */}
                    <Route
                        path="main"
                        element={
                            <PrivateRouter user={user}>
                                <MainCharacter />
                            </PrivateRouter>
                        }
                    />
                    {/* friends */}
                    <Route
                        path="friends"
                        element={
                            <PrivateRouter user={user}>
                                <Friends />
                            </PrivateRouter>
                        }
                    />
                    {/* friends page */}
                    <Route path="friends/:personId" element={<PersonInfo />} />
                    {/* message friedns */}
                    <Route path="friends/message/:personId" element={<Message />} />
                    {/* {404} */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
