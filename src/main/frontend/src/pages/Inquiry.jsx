import Dropdown from "../components/dropdown/DropDown";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import React, {useEffect, useState} from "react";

function Inquiry(){
    let arr = ["클래스","수강","예약","결제/환불","이벤트","기타"];
    const navigate = useNavigate();

    const [member,setMember] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const decodedToken = jwtDecode(token);
        const memberEmail = decodedToken.userEmail;

        axios.get(`/api/member/${memberEmail}`)
            .then(response => {
                setMember(response.data);
            })
            .catch(error => console.log(error))
    }, []);

return(
    <div id="inquiry-container">
        <div id="inquiry-text">
            <span>문의하기</span>
        </div>
        <div id="inquiry-form">
            <hr/>
            <div id="inquiry-dropdown">
                <Dropdown list={arr} text="문의분류선택"/>
            </div>
            <hr/>
            <div id="inquiry-grid">
                <input type="text" id="inquiry-title" placeholder="제목을 입력해 주세요"/>
                <textarea id="inquiry-content" placeholder="내용을 입력해 주세요"/>
            </div>
            <div id="inquiry-btn-div">
                <button id="inquiry-btn" onClick={()=>postInquiry()}>문의하기</button>
            </div>
        </div>

    </div>
)

function postInquiry(){
    let title = document.getElementById("inquiry-title").value.toString();
    let content = document.getElementById("inquiry-content").value.toString();
    let type = document.getElementById("dropdownUl").innerText;
    let memberId = member.id;

    axios.post(`/inquiry/${memberId}`, {
            title: title,
            content: content,
            type: type
    }).then(response => {
        console.log(response)
    })
        .catch((error) => console.log(error.response));
    navigate("/");
}

}

export default Inquiry;