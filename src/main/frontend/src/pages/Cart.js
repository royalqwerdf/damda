import '../styles/Cart.css';
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function Cart() {
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        axios.get('/carts')
            .then(response=>
            {
                setCarts(response.data.carts);
                console.log(carts);
            })
            .catch(error => console.log(error))
    }, []);

    // 체크박스
    const [checkboxes, setCheckboxes] = useState([]);
    const handleCheckboxChange = (checkboxName) => {
        return () => {
            setCheckboxes({
                ...checkboxes,
                [checkboxName]: !checkboxes[checkboxName]
            });
        };
    };

    return (
        <div id="cart">
            <div id="title">
                <h2>장바구니</h2>
            </div>
            <div id="step">
                <span class="now">01 장바구니 &gt;&nbsp;</span><span>02 예약 작성/결제 &gt;&nbsp;</span><span>03 예약 완료</span>
            </div>
            <div id="row">
                <input type="checkbox" checked={checkboxes.length > 0 && checkboxes.every((checkbox) => checkbox)} onClick={handleCheckboxChange}/>
                <span class="class">CLASS 명</span><span>인원</span><span>예약 일시</span><span>결제 금액</span>
            </div>
            <div id="lists">

            </div>
        </div>
    )
}

export default Cart;