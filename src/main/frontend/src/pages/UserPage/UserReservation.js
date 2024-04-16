import React, {useEffect, useState} from 'react';
import '../../styles/UserReservation.css';
import UserLeftMenu from "../../components/UserLeftMenu";
//import jwt_decode from 'jwt-decode'; // jwt_decode로 수정
import axios from "axios";
import UserHome from "./UserHome";
import UserButton from "../../components/UserButton";
import { Link } from 'react-router-dom';

const baseUrl = "http://localhost:8080/User-Reservation";

function UserReservation() {
    const reservationDeleteClick = () => {
        console.log('예약취소가 완료되었습니다.');
    };

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


    const [userReservationTimeList, setUserReservationTimeList] = useState([]);

    useEffect(() => {
        fetchUserReservationTimeList();
    }, []);

    const fetchUserReservationTimeList = async () => {
        try {
            const response = await axios.get('/class-reservation/{id}'); // 클래스 예약한 데이터를 가져오는 API 호출
            setUserReservationTimeList(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

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

            <h3 className="now-reservationh3">진행중인 예약</h3>
                {userReservationList.length === 0 ? (
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
                    {/*이 부분 등록된 클래스 읽어오는것으로 구현 필요 = 어떻게?*/}
                    <div className="data-reservation">
                        <a>{userReservationList.className}</a>
                        <a>{userReservationList.reservationDate}</a>
                        <a>{userReservationTimeList.select_time}</a>
                        <a>{userReservationList.totalHeadcount}</a>
                        <a>{userReservationList.totalPrice}</a>
                    </div>
                    <div className="reservation-button">
                        {/*예약변경 화면으로 이동*/}
                        <Link to="/User-ReservationUpdate">
                        <UserButton type="button"  variant="reservation-update">예약변경</UserButton>
                        </Link>

                        <div>
                            <UserButton onClick={reservationDeleteClick} type="submit" variant="reservation-delete">예약취소</UserButton>
                        </div>
                        </div>
                </div>
            </div>
                    ):(
                    <div className="user-reservation-list-none">예약이 없습니다.</div>
                )}

            </div>
        </div>
    );
}

export default UserReservation;
