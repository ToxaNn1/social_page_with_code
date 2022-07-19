import React from "react";
import styles from "../Post/Post.module.css";
import Reaction from "./Reaction/Reaction";

const Post = (props) => {
    let post = props.post;
    return (
        <li className={styles.wrapper}>
            <div>
                <img className={styles.avatar} src="../../../image/ava.jpg" alt="" />
                <Reaction></Reaction>
            </div>
            <div className={styles.post}>
                <div className={styles.postTitle}>
                    <p className={styles.postTitle}>{post.title}</p>
                </div>
                <div className={styles.postContent}>
                    <p className={styles.postContent}>{post.body}</p>
                </div>
            </div>
        </li>
    );
};
export default Post;
