import React, {useEffect, useState} from 'react';
import CategoryClassList from "./CategoryClassList";



function CategoryList(props) {
    const [categoryId, setCategoryId] = useState(1);

    function classList(id) {
        setCategoryId(id);
        let allA = document.getElementById("categories").getElementsByTagName("a");
        for(let i=0;i<allA.length;i++){
            allA.item(i).style = "border:none;font-weight:normal";
        }
        let a = document.getElementById(id);
        a.style = " border-radius: 100%;\n" +
            "  background-color: #FFDCD1;\n" +
            "  font-weight:bold; width: 30px; height: 30px; overflow: visible; border:1px solid #FFDCD1;  align-content: center;white-space : nowrap;";
    }

    return (
        <div id="category">
            <div id="text">
                <span>
                    CLASS
                </span>
            </div>
            <ul id="categories">
                {props.categories?.map(category =>{
                    return (
                        <li key={category.id}>
                            <a id={category.id} href={()=>false} onClick={()=>classList(category.id)}>
                                {category.categoryName}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div id="category-container">
                    <CategoryClassList key={categoryId} categoryId={categoryId}/>
            </div>

        </div>
    );
}

export default CategoryList;