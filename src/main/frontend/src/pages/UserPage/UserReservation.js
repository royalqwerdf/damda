import React from 'react';
import '../../styles/UserReservation.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import jwt_decode from 'jwt-decode'; // jwt_decode로 수정
import axios from "axios";
import UserHome from "./UserHome";

const baseUrl = "http://localhost:8080/UserReservation";

function UserReservation() {
    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>

            <div className="my-reservation">
                <p>나의클래스</p>
                <a>예약 관리</a>
            </div>

            {/*예약 생길시마다 새로 추가되는 로직 필요*/}
            <h3 className="now-reservation">진행중인 예약</h3>
            <div className="my-now-reservation">
                <div className="now-reservation">
                    <div className="circle"></div>
                    <div className="title">
                        <a>클래스 이름</a>
                        <a>예약 날짜</a>
                        <a>예약 시간</a>
                        <a>예약 인원</a>
                        <a>결제 금액</a>
                    </div>
                    <div className="reservation-update">
                        <button className="modify">예약변경</button>
                        <button className="delete">예약삭제</button>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default UserReservation;
