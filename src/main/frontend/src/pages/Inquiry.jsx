import Dropdown from "../components/dropdown/DropDown";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Inquiry(){
    let arr = ["클래스","수강","예약","결제/환불","이벤트","기타"];
    const navigate = useNavigate();

    return(
        <div id="inquiry-container">
            <div id="inquiry-text">
                <span>문의하기</span>
            </div>
            <div id="inquiry-form">
                <hr/>
                <Dropdown list={arr} text="문의분류"/>
                <div id="inquiry-grid">
                    <span>제목</span>
                    <input type="text" id="inquiry-title"/>
                    <span>문의 내용</span>
                    <textarea id="inquiry-content"/>
                </div>
                <div>
                    <button onClick={()=>postInquiry()}>문의하기</button>
                </div>
            </div>

        </div>
    )

    function postInquiry(){
        let title = document.getElementById("inquiry-title").value.toString();
        let content = document.getElementById("inquiry-content").value.toString();
        let type = document.getElementById("dropdownUl").innerText;
        console.log(type);
        axios.post("/inquiry", {
                //todo: 작성한 유저의 idx 값도 넘겨줘야함(컬럼명 user_id)
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