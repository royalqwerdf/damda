import React, {useEffect, useState} from 'react';
import '../styles/MainPage.css';
import axios from "axios";
import Dropdown from "../components/dropdown/DropDown";
import SearchClassList from "./SearchClassList";

function SearchPage(){
    const [data, setData] = useState([]);
    const [locationView, setLocationView] = useState(false);
    return(
        <div id="searchPage">
            <div id="searchOption">
                <div>
                    <div>
                        <input id="inputKeyword" type="text" placeholder="검색할 키워드를 입력해주세요"/>
                    </div>
                    <div id="dropboxes">
                        <div id="addressDropdown">
                            <ul onClick={() => {
                                setLocationView(!locationView)
                            }}>
                                지역{" "}
                                {locationView ? '⌃' : '⌄'}
                                {locationView && <Dropdown/>}
                            </ul>
                        </div>
                        <div id="categoryDropdown">
                            <Dropdown/>
                        </div>
                        <div>
                            시간드롭다운
                        </div>
                    </div>
                    <div>
                        <input id="inputNumber" type="number" placeholder="최소 가격"/>
                        {" ~ "}
                        <input id="inputNumber" type="number" placeholder="최대 가격"/>
                        <button id="btnSearch" onClick={()=>onClick()}>검색</button>
                    </div>
                </div>
            </div>
            <div id="resultSearch-container">
                <SearchClassList class={data}/>
            </div>
        </div>
    );

    function onClick(){
        let categoryId = document.getElementById("categoryUl").value;
        setData([]);
            axios.get("/search",{
            params:{
                keyword: "",
                address: "",
                categoryId: categoryId,
                week: "",
                minPrice: 0,
                maxPrice: 0
            }
        })
            .then(response=>
            {
                setData(response.data);
                console.log(data);
            })
            .catch(error => console.log(error))
    }

}

export default SearchPage;