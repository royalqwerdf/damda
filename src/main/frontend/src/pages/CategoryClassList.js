import React, {useEffect, useState} from 'react';
import CategoryClassList2 from "./CategoryClassList2";

function CategoryClassList(props) {
    const [categoryId, setCategoryId] = useState(1);

    function classList(id) {
        setCategoryId(id);
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
                            <a href='javascript:void(0)' onClick={()=>classList(category.id)}>
                                {category.categoryName}
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div id="aa">
                <CategoryClassList2 key={categoryId} categoryId={categoryId} />
            </div>
        </div>
    );
}

export default CategoryClassList;