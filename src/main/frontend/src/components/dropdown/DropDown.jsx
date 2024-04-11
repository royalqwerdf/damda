import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";


function Dropdown(props) {
    const [View, setView] = useState(false);
    const [Text ,setText] = useState(props.text);
    return (
        <ul id="dropdownUl" onClick={() => {
            setView(!View)
        }}>
            {Text}
            {View ? setList(props.list) : null}

        </ul>
    );


    function setList(list) {
        let li;
        if(props.text==="카테고리"){
             li = list?.map(list =>
                <li key = {list.id} onClick={() => onClick(list)}>{list.categoryName}</li>
            )
        }
        else if(props.text==="지역"||props.text==="문의분류"){
            li = list?.map(list =>
                <li onClick={() => onClick(list)}>{list}</li>
            )
        }
        return li;
    }

    function onClick(list) {
        if(props.text==="카테고리") {
            setText(list.categoryName);
            document.getElementById("dropdownUl").value = list.id;
            console.log(document.getElementsByClassName("dropdownUl").value);
        }
        else if(props.text==="지역"||props.text==="지역"){
            setText(list);
        }
    }
}

export default Dropdown;