import '../styles/Cart.css';
import React, {useEffect, useState} from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Cart = () => {
    // 회원 정보 받아오기
    const [memberId, setMemberId] = useState(null);

    const navigate = useNavigate();
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const decodedToken = token ? jwtDecode(token) : null;
                const memberEmail = decodedToken ? decodedToken.userEmail : null;
                console.log(memberEmail);

                if (memberEmail != null) {
                    const memberResponse = await axios.get(`/api/member/${memberEmail}`);
                    const memberId = memberResponse.data.id;
                    setMemberId(memberId);
                    console.log(memberId);

                    const cartsResponse = await axios.get('/carts', { params: { memberId: memberId } });
                    const carts = Array.isArray(cartsResponse.data) ? cartsResponse.data : [];
                    setCarts(carts);
                    console.log(carts);
                } else {
                    const cartsResponse = await axios.get('/carts', { params: { memberId: null } });
                    const carts = Array.isArray(cartsResponse.data) ? cartsResponse.data : [];
                    setCarts(carts);
                    console.log(carts);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
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
        const deletedCartIds = [];

        const deleteRequests = checkboxes.map((cartId)=> {
            return axios.delete(`/carts/${cartId}`, {cartId})
                .then(response => {
                    console.log(`Cart ${cartId} is deleted successfully`);
                    deletedCartIds.push(cartId);
                })
                .catch(error => {
                    console.log(error);
                })
        });

        Promise.all(deleteRequests)
            .then((deletedCartsIds) => {
                const updatedCarts = carts.filter(cart => !deletedCartsIds.includes(cart.id));
                setCarts(updatedCarts);
            })
            .catch(error => console.log(error));
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

    // 선택 클래스 예약
    const reserveCheckedCarts = () => {
        checkboxes.forEach((cartId) => {
            const cart = carts.find(cart => cart.id === cartId);
            const id = cart.classId;
            const reservationData = {
                id: id,
                user_id: memberId,
                select_date: moment(cart.classDate).format('YYYY-MM-DD'),
                select_time: cart.classTimeId,
                select_person: cart.selectedCount,
                total_price: cart.totalPrice,
                classType: cart.categoryName
            };
            axios.post(`/class-reservation/${id}/reserve`, { reservationData })
                .then(response => {
                    console.log(`Class is reserved successfully`);
                    const updatedCarts = carts.filter(cart => cart.id !== cartId);
                    setCarts(updatedCarts);
                    navigate("/carts/reservation-complete");
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
            const id = cart.classId;
            const reservationData = {
                id: id,
                user_id: memberId,
                select_date: moment(cart.classDate).format('YYYY-MM-DD'),
                select_time: cart.classTimeId,
                select_person: cart.selectedCount,
                total_price: cart.totalPrice,
                classType: cart.categoryName
            };
            axios.post(`/class-reservation/${id}/reserve`, { reservationData })
                .then(response => {
                    console.log(`Class is reserved successfully`);
                    setCarts([]);
                    navigate("/carts/reservation-complete");
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
                const updatedPrice = cart.totalPrice / cart.selectedCount * (cart.selectedCount + 1);
                const updatedCount = cart.selectedCount + 1;
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
                const updatedPrice = cart.totalPrice / cart.selectedCount * (cart.selectedCount - 1);
                const updatedCount = cart.selectedCount - 1;
                return { ...cart, selectedCount: updatedCount, totalPrice: updatedPrice };
            }
            return cart;
        })
        setCarts(updatedCarts);
        const updatedCart = updatedCarts.find(cart => cart.id === cartId);
        updateCart(cartId, updatedCart.selectedCount, updatedCart.totalPrice);
    }
    const updateCart = (cartId, selectedCount, totalPrice) => {
        axios.put(`/carts/${cartId}`, { cartId, selectedCount, totalPrice })
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
                       checked={carts && (checkboxes.length === carts.length)}
                       onClick={toggleAllCheckboxes}/>
                <span className="class">CLASS 명</span><span>인원</span><span>예약 일시</span><span>결제 금액</span>
            </div>
            <div id="cart-list">
                {carts && carts.map((cart) => (
                    <div className="cart-item" key={cart.id}>
                        {/* 체크박스 */}
                        <input type='checkbox' name={`select-${cart.id}`}
                               onChange={(e) => toggleCheckbox(e.target.checked, cart.id)}
                               checked={checkboxes.includes(cart.id)}/>

                        {/* 클래스명 */}
                        <span className="class-name">
                            {/* 클릭하면 해당 클래스 페이지로 이동 */}
                            <Link
                                to={`/classes/${cart.classId}`}>{cart.className}</Link>
                        </span>

                        {/* 인원 */}
                        <button className="minus" onClick={() => handleDecrease(cart.id)}>-</button>
                        <span className="count">{cart.selectedCount}명</span>
                        <button className="plus" onClick={() => handleIncrease(cart.id)}>+</button>

                        {/* 예약일시 */}
                        <span className="date">{formatDate(cart.classDate)}</span>

                        {/* 가격 */}
                        <span className="price">{cart.totalPrice}원</span>
                    </div>
                ))}
            </div>
            <div className="button-select">
                <button onClick={() => handleDelete()}>선택 CLASS 삭제</button>
                {/* <button>선택 CLASS 찜</button> */}
            </div>
            <div className="button-reservation">
                <button onClick={() => handleCheckedReserve()}>선택 CLASS 예약</button>
                <button className="whole" onClick={() => handleAllReserve()}>전체 CLASS 예약</button>
            </div>
        </div>
    )
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return <>{year}.{month}.{day}<br/>{hours}:{minutes}</>;
}

export default Cart;