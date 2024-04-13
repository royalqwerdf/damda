import React from 'react';
import '../../styles/UserReservation.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import jwt_decode from 'jwt-decode'; // jwt_decode로 수정
import axios from "axios";
import UserHome from "./UserHome";
import UserButton from "../../components/UserButton";
import { Link } from 'react-router-dom';

const baseUrl = "http://localhost:8080/User-Reservation";

function UserReservation() {
    const reservationDeleteClick = () => {
        // 여기에 탈퇴하기 버튼이 클릭되었을 때 수행할 동작을 구현합니다.
        console.log('예약취소가 완료되었습니다.');
    };
    {/*임시 기능, 빈동작. 추후에 수정*/}
    const emptyFunction = () => {};


    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>

            <div className="user-reservation-container">

            <div className="my-reservation-menu">
                <p className="myclass-1">나의클래스</p>
                <p className="reservation-2">예약 관리</p>
            </div>

            {/*예약 생길시마다 새로 추가되는 로직 필요*/}
            <h3 className="now-reservation">진행중인 예약</h3>
            <div className="my-now-reservation">
                <div className="now-reservation">
                    <div className="reservation-circle"></div>
                    <div className="title-reservation">
                        <a>클래스 이름</a>
                        <a>예약 날짜</a>
                        <a>예약 시간</a>
                        <a>예약 인원</a>
                        <a>결제 금액</a>
                    </div>
                    <div className="reservation-button">
                        {/*예약변경 화면으로 이동*/}
                        <Link to="/User-ReservationUpdate">
                            <UserButton onClick={emptyFunction} type="button"  variant="reservation-update">예약변경</UserButton>
                        </Link>

                        <div>
                            <UserButton onClick={reservationDeleteClick} type="submit" variant="reservation-delete">예약취소</UserButton>
                        </div>
                        </div>
                </div>
            </div>

            </div>
        </div>
    );
}

export default UserReservation;
