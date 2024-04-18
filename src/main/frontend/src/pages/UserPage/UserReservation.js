import React, {useEffect, useState} from 'react';
import '../../styles/UserReservation.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import axios from "axios";
import UserHome from "./UserHome";
import UserButton from "../../components/UserButton";
import {Link, useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";


    //예약취소시 예약삭제 필요 + 예약취소 완료 alert
    //예약 데이터 있을때마다 예약 상자 늘어나기
    //클래스 이미지 불러오기(진행중)

function UserReservation() {
    const [reservationList,setReservationList] =useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('accessToken');
        const decodedToken = jwtDecode(token);
        const memberId = decodedToken.memberId;

        axios.get(`/member-reservation/${memberId}`)
            .then(response => {
                setReservationList(response.data)
            })
            .catch(error => console.log(error));

    },[]);

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
                <h3 className="now-reservationh3">진행중인 예약</h3>
                {reservationList.length > 0 ? (
                    <div className="my-now-reservation">
                        <div className="now-reservation">
                            <hr/>
                            {reservationList?.map(reservation => {
                            return (
                                <>
                                    <Link to={`/class-reservation/${reservation.classId}`}>
                                        <div className="reservation-circle">
                                            <img src={reservation.mainImage} alt="클래스_이미지" className="reservation-circle-image"/>
                                        </div>
                                    </Link>
                                    <div className="title-reservation">
                                        <a>클래스 이름</a>
                                        <a>예약 날짜</a>
                                        <a>예약 시간</a>
                                        <a>예약 인원</a>
                                        <a>결제 금액</a>
                                    </div>
                                    <div className="data-reservation">
                                        {reservation.className.length>4 ?
                                            (<a>{reservation.className.substring(0,3)+"..."}</a>)
                                            :
                                            (<a>{reservation.className}</a>)}
                                        <a>{reservation.select_date.substring(0,10)}</a>
                                        <a style={{marginLeft:"-8px"}}>{reservation.startAt}</a>
                                        <a style={{marginLeft:"28px"}}>{reservation.select_person}</a>
                                        <a style={{marginLeft:"40px"}}>{reservation.total_price}</a>
                                    </div>
                                    <div className="reservation-button">
                                        {/*예약변경 화면으로 이동*/}
                                        {/*<Link to="/User-ReservationUpdate">*/}
                                        {/*    <UserButton type="button" variant="reservation-update">예약변경</UserButton>*/}
                                        {/*</Link>*/}
                                        <div>
                                            <UserButton onClick={()=>reservationDeleteClick(reservation.reservation_id)} type="submit"
                                                        variant="reservation-delete">예약취소</UserButton>
                                        </div>
                                    </div>
                                    <hr style={{marginBottom:"20px",marginTop:"40px"}}/>
                            </>
                            )
                        })}
                        </div>
                    </div>
                ) : (
                    //예약이 없을 때
                    <div className="user-reservation-list-none">예약이 없습니다.</div>
                )}
            </div>
        </div>
    )

    function reservationDeleteClick(id) {
        console.log(reservationList);
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.post(`/member-reservation/delete/${id}`)
                .then(response => {
                    console.log(response.data);
                    window.location.replace("/User-Reservation")
                })
                .catch(error => console.log(error));
        } else {
            console.log(id);
        }
    }

}

export default UserReservation;
