import React from "react";
import '../styles/CartReservationComplete.css';
import { Link } from "react-router-dom";

function CartReservationComplete() {
    return (
        <div id="complete">
            <div id="title">
                장바구니
            </div>
            <div id="step">
                <span>01 장바구니 &gt;&nbsp;</span><span>02 예약 작성/결제 &gt;&nbsp;</span><span className="now">03 예약 완료</span>
            </div>
            <div id="row"></div>
            <div id="message">예약이 완료되었습니다!</div>
            <div className="buttons">
                <Link to={"/"}><button className="mainPage">메인 페이지로</button></Link>
                <button className="reservation">내 예약 확인하기</button>
            </div>
        </div>
    )
}

export default CartReservationComplete;