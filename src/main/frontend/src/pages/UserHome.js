import React, { useState, useEffect } from 'react';
import '../styles/UserHome.css';
import UserLeftMenu from "../components/UserLeftMenu";
import axios from "axios";

function UserHome() {
    const [memberName, setMemberName] = useState('');

    useEffect(() => {
        // API 호출
        axios.get('/api/member')
            .then(response => {
                setMemberName(response.data.name); // memberName에 응답 데이터의 name 필드를 설정
            })
            .catch(error => {
                console.error('Error fetching member data:', error);
            });
    }, []); // 컴포넌트가 처음으로 렌더링될 때만 API 호출

    return (
        <div className="container">

            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>


            <div className="welcome-user">
                <p>{memberName}님</p>
                <a>반갑습니다.</a>
            </div>


            <h3 className="reservation-now">진행중인 예약</h3>
            <div className="reservation-now">
                <div className="circle"></div>
            </div>

            <h3 className="class-now">진행중인 클래스</h3>
            <div className="class-now">
                <div className="circle"></div>
                <a>클래스 이름</a>
                <a>예약 날짜</a>
                <a>결제 금액</a>
            </div>


        </div>

    );


}

export default UserHome;
