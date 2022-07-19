import React from "react";
import style from '../Button/Button.module.css'

const Button = (props)=>{
    return(
        <button onClick={()=>props.addPost(props.valueInput,props.valueTextArea)} className={style.button}>
            Добавити новий пост!
        </button>
    )
}

export default Button