import '../styles/Cart.css';
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Cart() {
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        axios.get('/carts')
            .then(response=>
            {
                // 받아온 데이터를 가공하여 Date 객체로 변환
                const processedData = response.data.carts.map(cart => ({
                    ...cart,
                    classTime: {
                        ...cart.classTime,
                        classStartsAt: new Date(cart.classTime.classStartsAt)
                    }
                }));

                // 변환된 데이터를 상태로 설정
                setCarts(processedData);
            })
            .catch(error => console.log(error))
    }, []);

    // // 예시 데이터
    // useEffect(() => {
    //     setCarts([
    //         {
    //             id: 0,
    //             classTime: {
    //                 onedayClass: {
    //                     className: "Class 1"
    //                 },
    //                 classStartsAt: new Date(2024, 4, 8, 10, 0, 0)
    //             },
    //             selectedCount: 2,
    //             totalPrice: 10000
    //         },
    //         {
    //             id: 1,
    //             classTime: {
    //                 onedayClass: {
    //                     className: "Class 2"
    //                 },
    //                 classStartsAt: new Date(2024, 4, 9, 10, 0, 0)
    //             },
    //             selectedCount: 1,
    //             totalPrice: 5000
    //         }
    //     ]);
    // }, []);

    // 체크박스
    const [checkboxes, setCheckboxes] = useState([]);
    // 개별 선택/해제
    const toggleCheckbox = (checked, id) => {
        if (checked) {
            setCheckboxes(prev => [...prev, id]);
        } else {
            setCheckboxes(checkboxes.filter((el) => el !== id));
        }
    }
    // 전체 선택/해제
    const toggleAllCheckboxes = (checked) => {
        if (checked) {
            const idArray = [];
            carts.forEach((el) => idArray.push(el.id));
            setCheckboxes(idArray);
        } else {
            setCheckboxes([]);
        }
    }

    return (
        <div id="cart">
            <div id="title">
                <h2>장바구니</h2>
            </div>
            {/* 현재 단계 */}
            <div id="step">
                <span className="now">01 장바구니 &gt;&nbsp;</span><span>02 예약 작성/결제 &gt;&nbsp;</span><span>03 예약 완료</span>
            </div>
            {/* 맨 위 행 */}
            <div id="row">
                {/* 전체 체크박스 */}
                <input type="checkbox" name="select-all"
                       onChange={(e) => toggleAllCheckboxes(e.target.checked)}
                       checked={checkboxes.length === carts.length}
                       onClick={toggleAllCheckboxes}/>
                <span className="class">CLASS 명</span><span>인원</span><span>예약 일시</span><span>결제 금액</span>
            </div>
            <div id="cart-list">
                {carts.map((cart) => (
                    <div className="cart-item" key={cart.id}>
                        {/* 체크박스 */}
                        <input type='checkbox' name={`select-${cart.id}`}
                               onChange={(e) => toggleCheckbox(e.target.checked, cart.id)}
                               checked={checkboxes.includes(cart.id)}/>

                        {/* 클래스명 */}
                        <span className="class-name">
                            {/* 클릭하면 해당 클래스 페이지로 이동 */}
                            <Link to={`/classes/${cart.classTime.onedayClass.id}`}>{cart.classTime.onedayClass.className}</Link>
                        </span>

                        {/* 인원 */}
                        <span className="count">{cart.selectedCount}명</span>

                        {/* 예약일시 */}
                        <span className="date">{formatDate(cart.classTime.classStartsAt)}</span>

                        {/* 가격 */}
                        <span className="price">{cart.totalPrice}원</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function formatDate(date) {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export default Cart;