import React, { useEffect, useState } from "react";
import styles from "../Posts/Posts.module.css";
import Post from "./Post/Post";
import { fetchPosts } from "../../Store/asyncActions/asyncPosts";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import NewPost from "../NewPost/NewPost";

const Posts = (props) => {
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const allPosts = useSelector((state) => state.posts[0]);

    const [loading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPost = allPosts?.slice(firstPostIndex, lastPostIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <h2>Loading....</h2>;
    }

    const postOnPage = currentPost?.map((onePost) => {
        return <Post key={onePost.id} post={onePost}></Post>;
    });

    return (
        <>
            <div className={styles.newPost}>
                {location.pathname === "/main" ? (
                    <NewPost currentPost={currentPost}></NewPost>
                ) : (
                    <h2 className={styles.postsH}>Мої Пости</h2>
                )}
            </div>
            <ul className={styles.posts}>{postOnPage}</ul>
            <Pagination
                paginate={paginate}
                postPerPage={postPerPage}
                totalPosts={allPosts?.length}
            ></Pagination>
        </>
    );
};

export default Posts;
