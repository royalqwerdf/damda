import React, {useEffect, useState} from 'react';
import '../styles/MainPage.css';
import axios from "axios";
import Dropdown from "../components/dropdown/DropDown";
import SearchClassList from "./SearchClassList";

function SearchPage(){
    const [data, setData] = useState([]);
    const [categoryView, setCategoryView] = useState(false);
    const [locationView, setLocationView] = useState(false);
    useEffect(() => {
        axios.get('/home')
            .then(response=>
            {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }, []);
    return(
        <div id="searchPage">
            <div id="searchOption">
                <div>
                    <div>
                        <input id="inputKeyword" type="text" placeholder="검색할 키워드를 입력해주세요"/>
                    </div>
                    <div id="dropboxes">
                        <div id="categoryDropdown">
                            <ul onClick={() => {
                                setLocationView(!locationView)
                            }}>
                                지역{" "}
                                {locationView ? '⌃' : '⌄'}
                                {locationView && <Dropdown/>}
                            </ul>
                        </div>
                        <div id="categoryDropdown">
                            <Dropdown categories={data.categories}/>
                        </div>
                        <div id="categoryDropdown">
                            <Dropdown categories={data.categories}/>
                        </div>
                    </div>
                    <div>
                        <input id="inputNumber" type="number" placeholder="최소 가격"/>
                        {" ~ "}
                        <input id="inputNumber" type="number" placeholder="최대 가격"/>
                        <button id="btnSearch">검색</button>
                    </div>
                </div>
            </div>
            <div id="resultSearch-container">
            <SearchClassList />
            </div>
        </div>
    );
}

export default SearchPage;