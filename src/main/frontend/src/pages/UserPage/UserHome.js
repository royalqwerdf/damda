import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UserHome.css';
import UserLeftMenu from "../../components/UserLeftMenu";
// npm jwt-decode install 필요
//import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import ListReservation from "../../components/ListReservation";
const baseUrl = "http://localhost:8080/User-Home";
function UserHome() {

    const navigate = useNavigate();
    /* 토큰이 유효하지 않다는 오류가 뜸, 나중에 "님"글자 앞에 {memberName} 삽입
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
    {/* 오픈한 클래스 내용을 불러와야하는데 로직을 모르겠음
    const [userClassList, setUserClassList] = useState([]);

    useEffect(() => {
        fetchUserClassList();
    }, []);

    const fetchUserClassList = async () => {
        try {
            const response = await axios.get('/OrderDetail/listreservation'); // 예약 데이터를 가져오는 API 호출
            setUserClassList(response.data);
        } catch (error) {
            console.error('Error fetching Class:', error);
        }
    };
*/

    }


        return (
            <div>

                <div className="user-left-menu">
                    <UserLeftMenu/>
                </div>

                <div className="user-home-container">

                    <div className="welcome-user-home">
                        <p className="user-name-on">님</p>
                        <p className="user-hello">반갑습니다.</p>
                    </div>
                    {/*예약목록이 있으면 예약현황 템플릿 반환*/}
                    {userReservationList.length > 0 ? (
                        <div className="user-home-now">
                            <h3 className="userhome-reservation-nowh3">진행중인 예약</h3>
                            <div className="userhome-reservation-now">
                                <div className="userhome-now-circle"></div>
                                <div className="title-user-home">
                                    <p>클래스 이름</p>
                                    <p>예약 날짜</p>
                                    <p>결제 금액</p>
                                </div>
                                <div className="data-user-home">
                                    <p>{userReservationList.className}</p>
                                    <p>{userReservationList.reservationDate}</p>
                                    <p>{userReservationList.totalPrice}</p>
                                </div>
                            </div>

                            <h3 className="userhome-class-nowh3">진행중인 클래스</h3>
                            <div className="userhome-class-now">
                                <div className="userhome-now-circle"></div>
                                <div className="title-user-home">
                                    <p>클래스 이름</p>
                                    <p>예약 날짜</p>
                                    <p>결제 금액</p>
                                </div>
                            </div>
                        </div>) : ( /*예약이 없으면 없을때 템플릿 반환*/
                        <div className="userhome-none">

                            <h3 className="userhome-reservation-nowh3">진행중인 예약</h3>
                            <div onClick={() => navigate('/')} className="userhome-reservation-none">
                                <div>
                                <div>예약한 클래스가 없습니다.</div>
                                <div>담다의 다양한 클래스들을 만나보세요!</div>
                                </div>

                            </div>

                            <h3 className="userhome-class-nowh3">진행중인 클래스</h3>
                            <div onClick={() => navigate('/class-open')} className="userhome-class-none">

                                <div>등록된 클래스가 없습니다.</div>
                                <div>나만의 클래스를 열어보세요!</div>

                            </div>

                        </div>
                    )}


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
