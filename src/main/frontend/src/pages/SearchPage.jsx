import React, {useEffect, useState} from 'react';
import '../styles/MainPage.css';
import axios from "axios";
import Dropdown from "../components/dropdown/DropDown";
import SearchClassList from "./SearchClassList";

function SearchPage(){
    const [data, setData] = useState([]);
    const [address,setAddress] = useState([]);
    const [category,setCategory]=useState([]);
    useEffect(() => {
        axios.get('/category')
            .then(response=>
            {
                setCategory(response.data);
                setAddress(["서울","경기","인천","대전","대구","부산","광주","울산","충청","충북","충남","강원","세종","경북","경상","경남","전라","전북","전남","제주"]);
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
                        <div id="addressDropdown">
                            <Dropdown list={address} text={"지역"}/>
                        </div>
                        <div id="categoryDropdown">
                            <Dropdown list={category} text={"카테고리"}/>
                        </div>
                        <div>
                            시간드롭다운
                        </div>
                    </div>
                    <div id="price-container">
                        <input id="inputMinPrice" type="number" placeholder="최소 가격"/>
                        {" ~ "}
                        <input id="inputMaxPrice" type="number" placeholder="최대 가격"/>
                        <button id="btnSearch" onClick={()=>search()}>검색</button>
                    </div>
                </div>
            </div>
            <div id="resultSearch-container">
                <SearchClassList class={data}/>
            </div>
        </div>
    );

    function search(){
        setData([]);

        let keyword = document.getElementById("inputKeyword").value;
        let address = document.getElementById("addressDropdown").innerText;
        let categoryId = document.getElementById("dropdownUl").value;
        let minPrice=Number(document.getElementById("inputMinPrice").value);
        let maxPrice=Number(document.getElementById("inputMaxPrice").value);

        axios.get("/search",{
            params:{
                keyword: keyword !== undefined ? keyword : "",
                //keyword || "" -> 위 코드를 줄일 수 있음
                address: address !== "지역" ? address : "",
                categoryId: categoryId !== undefined ? categoryId : 0,
                week: "",
                minPrice: minPrice !== undefined ? minPrice : 0,
                maxPrice: maxPrice !== undefined ? maxPrice : 0
            }
        })
            .then(response=>
            {
                setData(response.data);
            })
            .catch(error => console.log(error))
    }

}

export default SearchPage;