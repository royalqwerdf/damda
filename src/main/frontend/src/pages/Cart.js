import '../styles/Cart.css';
import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
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

    // 예시 데이터
    // useEffect(() => {
    //     setCarts([
    //         {
    //             id: 0,
    //             classTime: {
    //                 onedayClass: {
    //                     id:0,
    //                     className: "Class 1",
    //                     price: 10000
    //                 },
    //                 classStartsAt: new Date(2024, 4, 8, 10, 0, 0)
    //             },
    //             selectedCount: 2,
    //             totalPrice: 20000
    //         },
    //         {
    //             id: 1,
    //             classTime: {
    //                 onedayClass: {
    //                     id: 1,
    //                     className: "Class 2",
    //                     price: 15000
    //                 },
    //                 classStartsAt: new Date(2024, 4, 9, 10, 0, 0)
    //             },
    //             selectedCount: 1,
    //             totalPrice: 15000
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

    // 선택 클래스 삭제
    const deleteCheckedCarts = () => {
        checkboxes.forEach((cartId) => {
            axios.delete(`/carts/${cartId}`)
                .then(response => {
                    console.log(`Cart ${cartId} is deleted successfully`);
                    const updatedCarts = carts.filter(cart => cart.id !== cartId);
                    setCarts(updatedCarts);
                })
                .catch(error => console.log(error));
        })
    }
    const handleDelete = () => {
        if(checkboxes.length === 0){
            alert("삭제할 클래스를 선택해 주세요.")
        } else {
            const isConfirmed = window.confirm("선택한 클래스를 장바구니에서 삭제하시겠습니까?");
            if (isConfirmed) {
                deleteCheckedCarts();
                setCheckboxes([]);
            }
        }
    }

    // 예약 정보 저장
    // const history = useHistory();
    // const saveReserveInfo = (className, classDateTime, selectedCount, totalPrice) => {
    //     const reservationInfo = {
    //         className: className,
    //         classDateTime: formatDate(classDateTime),
    //         selectedCount: selectedCount,
    //         totalPrice: totalPrice
    //     }
    //     history.push(`/cart/reservation-complete`, { reservationInfo });
    // }

    // 선택 클래스 예약
    const reserveCheckedCarts = () => {
        checkboxes.forEach((cartId) => {
            const cart = carts.find(cart => cart.id === cartId);
            const classId = cart.classTime.onedayClass.id;
            axios.post(`/classes/${classId}/reservation`)
                .then(response => {
                    console.log(`Class ${classId} is reserved successfully`);
                    // saveReserveInfo(cart.classTime.onedayClass.className, cart.classTime.classStartsAt, cart.selectedCount, cart.totalPrice);
                    const updatedCarts = carts.filter(cart => cart.id !== cartId);
                    setCarts(updatedCarts);
                })
                .catch(error => console.log(error));
        })
    }
    const handleCheckedReserve = () => {
        if(checkboxes.length === 0) {
            alert("예약할 클래스를 선택해 주세요.")
        } else {
            const isConfirmed = window.confirm("선택한 클래스를 예약하시겠습니까?");
            if(isConfirmed) {
                reserveCheckedCarts();
                setCheckboxes([]);
            }
        }
    }

    // 전체 클래스 예약
    const reserveAllCarts = () => {
        carts.forEach((cart) => {
            const classId = cart.classTime.onedayClass.id;
            axios.post(`/classes/${classId}/reservation`)
                .then(response => {
                    console.log(`Class ${classId} is reserved successfully`);
                    // saveReserveInfo(cart.classTime.onedayClass.className, cart.classTime.classStartsAt, cart.selectedCount, cart.totalPrice);
                    setCarts([]);
                })
                .catch(error => console.log(error));
        })
    }
    const handleAllReserve = () => {
        if(carts.length === 0) {
            alert("장바구니에 담긴 클래스가 없습니다.")
        } else {
            const isConfirmed = window.confirm("장바구니의 모든 클래스를 예약하시겠습니까?");
            if(isConfirmed) {
                reserveAllCarts();
            }
        }
    }

    // 인원수 증가 버튼
    const handleIncrease = (cartId) => {
        const updatedCarts = carts.map(cart => {
            if(cart.id === cartId) {
                const updatedCount = cart.selectedCount + 1;
                const updatedPrice = cart.classTime.onedayClass.price * updatedCount;
                return { ...cart, selectedCount: updatedCount, totalPrice: updatedPrice };
            }
            return cart;
        })
        setCarts(updatedCarts);
        const updatedCart = updatedCarts.find(cart => cart.id === cartId);
        updateCart(cartId, updatedCart.selectedCount, updatedCart.totalPrice);
    }
    // 인원수 감소 버튼
    const handleDecrease = (cartId) => {
        const updatedCarts = carts.map(cart => {
            if(cart.id === cartId && cart.selectedCount > 1) {
                const updatedCount = cart.selectedCount - 1;
                const updatedPrice = cart.classTime.onedayClass.price * updatedCount;
                return { ...cart, selectedCount: updatedCount, totalPrice: updatedPrice };
            }
            return cart;
        })
        setCarts(updatedCarts);
        const updatedCart = updatedCarts.find(cart => cart.id === cartId);
        updateCart(cartId, updatedCart.selectedCount, updatedCart.totalPrice);
    }
    const updateCart = (cartId, selectedCount, totalPrice) => {
        axios.put(`/carts/${cartId}`, { selectedCount, totalPrice })
            .then(response => {
                console.log('Cart updated successfully: ', response.data);
            })
            .catch(error => console.log(error));
    }

    return (
        <div id="cart">
            <div id="title">
                장바구니
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
                            <Link
                                to={`/classes/${cart.classTime.onedayClass.id}`}>{cart.classTime.onedayClass.className}</Link>
                        </span>

                        {/* 인원 */}
                        <button class="minus" onClick={() => handleDecrease(cart.id)}>-</button>
                        <span className="count">{cart.selectedCount}명</span>
                        <button class="plus" onClick={() => handleIncrease(cart.id)}>+</button>

                        {/* 예약일시 */}
                        <span className="date">{formatDate(cart.classTime.classStartsAt)}</span>

                        {/* 가격 */}
                        <span className="price">{cart.totalPrice}원</span>
                    </div>
                ))}
            </div>
            <div className="button-select">
                <button onClick={() => handleDelete()}>선택 CLASS 삭제</button>
                <button>선택 CLASS 찜</button>
            </div>
            <div className="button-reservation">
                <button onClick={() => handleCheckedReserve()}>선택 CLASS 예약</button>
                <button className="whole" onClick={() => handleAllReserve()}>전체 CLASS 예약</button>
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

    return <>{year}.{month}.{day}<br/>{hours}:{minutes}</>;
}

export default Cart;