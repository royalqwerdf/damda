import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/UserHome.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import axios from "axios";
import ListReservation from "../../components/ListReservation";
import {jwtDecode} from "jwt-decode";
function UserHome() {
    //가장 예약날짜가 가까운 예약 불러오기
    //가장 예약날짜가 가까운 클래스 불러오기
    //클래스 대표 이미지 가져오기(진행중)

    const navigate = useNavigate();
    const [member, setMember] = useState([]);
    const [reservationList,setReservationList] =useState([]);
    const [classList,setClassList] = useState([]);

    useEffect(() => {

        if(localStorage.getItem('accessToken')===null){
            if(window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?")){
                navigate("/login");
            } else {
                navigate("/");
            }
        }else{

            const token = localStorage.getItem('accessToken');
        const decodedToken = jwtDecode(token);
        const memberEmail = decodedToken.userEmail;
        // 사용자의 Email로 idx값을 가져오고
        // 가져온 Idx로 예약한 클래스 목록과 오픈한 클래스 목록 가져오기
        axios.get(`/api/member/${memberEmail}`)
            .then(response => {
                setMember(response.data);
                axios.get(`/member-class/${response.data.id}`)
                    .then(response => {
                        setClassList(response.data);
                    })
                    .catch(error => console.log(error));
                axios.get(`/member-reservation/${response.data.id}`)
                    .then(response => {
                        setReservationList(response.data);
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }}, []);
        return (
            <div>
                <div className="user-left-menu">
                    <UserLeftMenu/>
                </div>

                <div className="user-home-container">

                    <div className="welcome-user-home">
                        <p className="user-name-on">{member.name}님</p>
                        <p className="user-hello">반갑습니다.</p>
                    </div>
                    {reservationList.length > 0 ? (
                        <div className="user-home-now">
                            <h3 className="userhome-reservation-nowh3">진행중인 예약</h3>

                            {reservationList?.map(reservation => {
                                return (
                                    <div className="userhome-reservation-now">
                                        <div className="userhome-now-circle">
                                            <img src={reservation.mainImage} alt="클래스_이미지"
                                                 className="resrvation-now-circle-image"/>
                                        </div>
                                        <div className="title-user-home">
                                            <p>클래스 이름</p>
                                            <p>예약 날짜</p>
                                            <p>결제 금액</p>
                                        </div>
                                        <div className="data-user-home">
                                            <p>{reservation.className}</p>
                                            <p style={{marginLeft:"40px"}}>{reservation.select_date.substring(0,10)}</p>
                                            <p>{reservation.total_price}</p>
                                        </div>
                                    </div>
                                )})}
                        </div>):

                            (<div className="userhome-none">
                                <h3 className="userhome-reservation-nowh3">진행중인 예약</h3>
                                <div onClick={() => navigate('/')} className="userhome-reservation-none">
                                    <div>
                                        <div>예약한 클래스가 없습니다.</div>
                                        <div>담다의 다양한 클래스들을 만나보세요!</div>
                                    </div>
                                </div>
                            </div>)}
                    {classList.length > 0 ?
                        (
                            <div className="user-home-now">
                                <h3 className="userhome-class-nowh3">진행중인 클래스</h3>
                                {classList?.map(onedayClass=> {

                                    return (
                                        <div className="userhome-class-now">
                                            <div className="userhome-now-circle">
                                                <img src={onedayClass.mainImage} alt="클래스_이미지" className="class-now-circle-image"/>
                                            </div>
                                            <div className="title-user-home">
                                                <p>클래스 이름</p>
                                                <p>난이도</p>
                                                <p>가격</p>
                                            </div>
                                            <div className="data-user-home-class">
                                                <p>{onedayClass.className}</p>
                                                <p style={{marginLeft:"55px"}}>{onedayClass.level}</p>
                                                <p>{onedayClass.price}</p>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        ):
                            (
                                <div className="userhome-none">
                                    <h3 className="userhome-class-nowh3">진행중인 클래스</h3>
                                    <div onClick={() => navigate('/class-open')} className="userhome-class-none">
                                        <div>등록된 클래스가 없습니다.</div>
                                        <div>나만의 클래스를 열어보세요!</div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
        )
}
export default UserHome;
