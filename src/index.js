import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import { store } from "./Store/index";
import { BrowserRouter } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyDabzV9IXT9rpkZ7G1sMA21PyP7P6cFJ1U",
    authDomain: "social-project-4d891.firebaseapp.com",
    projectId: "social-project-4d891",
    storageBucket: "social-project-4d891.appspot.com",
    messagingSenderId: "197727057594",
    appId: "1:197727057594:web:dc1a2b51170e6c6e1c3483",
    measurementId: "G-YZ2H81HNFQ",
});

export const Context = createContext(null);

const auth = getAuth();
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Context.Provider
                    value={{
                        app,
                        auth,
                        firestore,
                    }}
                >
                    <App />
                </Context.Provider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
