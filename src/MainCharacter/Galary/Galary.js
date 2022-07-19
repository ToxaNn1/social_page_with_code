import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "./Modal/Modal";
//slick
import Slider from "react-slick";
import style from "../Galary/Galary.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// dispatch
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../../Store/asyncActions/asyncImages";

const Galary = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const locationArr = location.pathname.split('');

    useEffect(() => {
        if (locationArr[locationArr.length-1] === "/") {
            dispatch(fetchImages.getImagesMain());
        } else if (typeof +locationArr[locationArr.length-1] === 'number') {
            dispatch(fetchImages.getImagesFriends());
        }
    }, []);

    const allImages = useSelector((state) => state);
    const [modalActive, setModalActive] = useState(false);
    const [currentImg, setCurrentImg] = useState(allImages.images[0].url);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        arrows: false,
    };

    const imageClick = (event) => {
        setCurrentImg((currentImg) => event.target.currentSrc);
    };

    return (
        <div className={style.GalaryWrapper}>
            <Slider {...settings}>
                {allImages.images.map(({ id, url, title }) => {
                    return (
                        <div key={id}>
                            <img
                                className={style.img}
                                src={url}
                                alt={title}
                                onClick={(e) => {
                                    setModalActive(true);
                                    imageClick(e);
                                }}
                            />
                        </div>
                    );
                })}
            </Slider>
            <Modal  active={modalActive} setActive={setModalActive}>
                <img className={style.modalImg} src={currentImg} alt="" />
            </Modal>
        </div>
    );
};

export default Galary;
