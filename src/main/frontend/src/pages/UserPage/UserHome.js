import React, { useState, useEffect } from 'react';
import '../../styles/UserHome.css';
import UserLeftMenu from "../../components/UserLeftMenu";
// npm jwt-decode install 필요
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
const baseUrl = "http://localhost:8080/UserHome";
function UserHome() {
    /* 토큰이 유효하지 않다는 오류가 뜸, 나중에 님 앞에 {memberName} 삽입
    const [memberName, setMemberName] = useState('');

    useEffect(() => {
        // 토큰 가져오기
        const token = localStorage.getItem('accessToken');

        // 토큰 디코딩하여 사용자의 ID 추출
        const decodedToken = jwtDecode(token);
        const memberId = decodedToken.memberId;

        // 사용자의 ID를 사용하여 서버에 요청을 보내 사용자의 이름 가져오기
        const fetchMemberName = async () => {
            try {
                const response = await axios.get(`/api/member/${memberId}`);
                setMemberName(response.data.name);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchMemberName();

    }, []);
*/

    return (
        <div className="container">

            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>


            <div className="welcome-user">
                <p>님</p>
                <a>반갑습니다.</a>
            </div>

            <div className="now">
                <h3 className="reservation-now">진행중인 예약</h3>
                <div className="reservation-now">
                    <div className="circle"></div>
                    <div className="title">
                        <a>클래스 이름</a>
                        <a>예약 날짜</a>
                        <a>결제 금액</a>
                    </div>
                </div>

                <h3 className="class-now">진행중인 클래스</h3>
                <div className="class-now">
                    <div className="circle"></div>
                    <div className="title">
                    <a>클래스 이름</a>
                    <a>예약 날짜</a>
                    <a>결제 금액</a>
                    </div>
                </div>
            </div>

        </div>

    );

}
/*
function ReservationData() {
    const [orderDetail, setOrderDetail] = useState({
        class_name: '',
        reservation_date: '',
        total_price: ''
    });
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        // 이 곳에서 초기 데이터 가져오기 등의 작업을 수행합니다.
    }, []);

    const handleChangeOrderId = (e) => {
        setOrderId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${baseUrl}/orderdetail/${orderId}`);
            const data = response.data;
            setOrderDetail({
                class_name: data.class_name,
                reservation_date: data.reservation_date,
                total_price: data.total_price
            });
        } catch (error) {
            console.error('Error fetching order detail:', error);
        }
    };

    return (
        <div>
            <p>Date: {orderDetail.class_name}</p>
            <p>Class: {orderDetail.reservation_date}</p>
            <p>Class: {orderDetail.total_price}</p>
        </div>
    );
}
*/
export default UserHome;
