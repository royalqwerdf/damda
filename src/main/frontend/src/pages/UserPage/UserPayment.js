import React, {useEffect, useState} from 'react';
import '../../styles/UserPayment.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import axios from "axios";
import {Link} from "react-router-dom";
import UserButton from "../../components/UserButton";

function UserPayment() {

    //결제내역과 주문상세(orderDetail)내역 불러오기
    //(실제 결제기능 추가하는게 아니고 인원수로 계산되었을 결제금액 데이터값만 불러오기)
    //결제내역이  결제내역상자 늘어나기

    {/* orderdetail controller에서 가져온 내용*/}
    const [userReservationList, setUserReservationList] = useState([]);

    useEffect(() => {
        fetchUserReservationList();
    }, []);

    const fetchUserReservationList = async () => {
        try {
            const response = await axios.get('/OrderDetail/listreservation'); // 예약 데이터를 가져오는 API 호출
            setUserReservationList(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };


    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>

            <div className="user-payment-container">


                <div className="my-payment">
                    <p>나의클래스</p>
                    <p className="user-payment-menu">결제 내역</p>
                </div>
                {/*예약목록이 있으면 예약현황 템플릿 반환, 작업편의를 위해 ===로 변경해두었으나, 실제 로직 완료되면 >로 변경*/}
                {userReservationList.length === 0 ? (
                        <div className="user-payment-list">
                            <div className="user-payment">
                                <div className="payment-circle">
                                    {/* src에는 임시 데이터*/}
                                    <img src="../../logo.svg" alt="클래스_이미지" className="payment-circle-image"/>
                                </div>
                                <div className="title-payment">
                                    <a>클래스 이름</a>
                                    <a>예약 날짜</a>
                                    <a>결제일</a>
                                    <a>예약 인원</a>
                                    <a>결제 금액</a>
                                </div>

                                <div className="data-payment">
                                    <a>{userReservationList.className}</a>
                                    <a>{userReservationList.reservationDate}</a>
                                    <a>{userReservationList.reservationDate}</a>
                                    <a>{userReservationList.totalHeadcount}</a>
                                    <a>{userReservationList.totalPrice}</a>
                                </div>
                            </div>
                        </div>) : (


                    <div className="user-payment-none">결제내역이 없습니다.</div>
                    )}
            </div>


        </div>
    )

}

export default UserPayment;