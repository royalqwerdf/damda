import {useParams} from "react-router-dom";
import React, {useState} from "react";

let categoryText = "카테고리";
function Dropdown({categories}) {
    const [categoryView, setCategoryView] = useState(false);

    return (
        <ul id="categoryUl" onClick={() => {
            setCategoryView(!categoryView)
        }}>
            {categoryText}{" "}
            {categoryView ? '⌃' : '⌄'}
            {categoryView ? setCategory(categories) : null}

        </ul>
    );
}

function setCategory(categories) {
    const li = categories.map(category =>
        <li onClick={() => onClick(category)}>{category.categoryName}</li>
    )
    return li;
}

function onClick(category){
    categoryText = category.categoryName;
}

export default Dropdown;