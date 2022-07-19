import React, { useState } from "react";
import style from "../NewPost/NewPost.module.css";
import Button from "./Button/Button";
import { useDispatch } from "react-redux";
import { createrAddPost } from "../../Store/Reduce/reducerMain";

const NewPost = (props) => {
    const dispatch = useDispatch();
    const [valueInput, setValueInput] = useState("");
    const [valueTextArea, setValueTextArea] = useState("");

    const handleChangeInput = (event) => {
        setValueInput((valueInput) => event.target.value);
    };

    const handleChangeTextArea = (event) => {
        setValueTextArea((valueTextArea) => event.target.value);
    };

    const addPost = (e) => {
        dispatch(createrAddPost({ valueInput, valueTextArea, post: props.currentPost }));
        setValueInput("");
        setValueTextArea("");
    };

    return (
        <div className={style.wrapper}>
            <h2 className={style.header}>Що у вас на думці</h2>

            <input
                value={valueInput}
                onChange={handleChangeInput}
                placeholder="Тема"
                type="text"
                className={style.input}
            />

            <textarea
                value={valueTextArea}
                onChange={handleChangeTextArea}
                className={style.textarea}
                name=""
                id=""
                cols="20"
                rows="5"
            ></textarea>

            <div className={style.button}>
                <Button
                    valueInput={valueInput}
                    valueTextArea={valueTextArea}
                    addPost={addPost}
                ></Button>
            </div>
        </div>
    );
};

export default NewPost;
