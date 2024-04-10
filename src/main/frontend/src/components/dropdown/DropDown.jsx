import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

let categoryText = "카테고리";
function Dropdown() {
    const [categoryView, setCategoryView] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <ul id="categoryUl" onClick={() => {
            setCategoryView(!categoryView)
        }}>
            {categoryText}
            {categoryView ? setCategory(categories) : null}

        </ul>
    );


    function setCategory(categories) {
        const li = categories?.map(category =>
            <li key = {category.id} onClick={() => onClick(category)}>{category.categoryName}</li>
        )
        return li;
    }

    function onClick(category) {
        categoryText = category.categoryName;
        document.getElementById("categoryUl").value = category.id;
    }
}

export default Dropdown;