import React from "react";
import { useState } from "react";
import "../Reaction/Reaction.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Reaction = () => {
    const [like, setLike] = useState(false);
    const [disLike, setDisLike] = useState(false);

    const changeActive = (callback) => {
        callback((state) => !state);
    };

    return (
        <div className="wrapperReaction">
            <div>
                <FontAwesomeIcon
                    icon={faThumbsUp}
                    onClick={(elem) => changeActive(setLike)}
                    className={like ? "iconReaction isLike" : "iconReaction"}
                />
            </div>
            <div>
                <FontAwesomeIcon
                    icon={faThumbsDown}
                    onClick={(elem) => changeActive(setDisLike)}
                    className={disLike ? "iconReaction isDisLike" : "iconReaction"}
                />
            </div>
        </div>
    );
};

export default Reaction;
