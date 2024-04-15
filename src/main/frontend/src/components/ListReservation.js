import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ListReservation.css';
import { Link } from 'react-router-dom';
import UserButton from "./UserButton";

function ListReservation(){
    /*
    const [orderDetail, setOrderDetail] = useState(null);

    useEffect(() => {
        // 백엔드에서 orderdetail 엔티티를 읽어오는 API 호출
        axios.get('/listreservation')
            .then(response => {
                // API 응답에서 필요한 데이터를 추출하여 상태에 설정
                setOrderDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching order detail:', error);
            });
    }, []);
    */

    /* 올라가면 색상변환 및 클릭 시 해당 링크 이동
    css에는 .hovered{}
        const [hovered, setHovered] = useState(false);

        const handleMouseEnterNow = () => {
            setHovered(true);
        };


        const handleMouseLeaveNow = () => {
            setHovered(false);
        };

        const navigate = useNavigate();
        const userhomeReservationClick = () => {
            // 클릭 이벤트 처리 로직
            navigate('/main-page');
        }

    */

    return (
        <div>
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
                    <div className="Reservation-data-list">
                        <a></a>
                        <a></a>
                        <a></a>
                        <a></a>
                    </div>
                    <div className="reservation-button">
                        {/*예약변경 화면으로 이동하는 로직 필요*
                        <Link to="/User-ReservationUpdate">
                            <UserButton onClick={emptyFunction} type="button"  variant="reservation-update">예약변경</UserButton>
                        </Link>

                        <div>
                            <UserButton onClick={reservationDeleteClick} type="submit" variant="reservation-delete">예약취소</UserButton>
                        </div>
                        */}
                    </div>
                </div>
        </div>
    </div>

    )
        }
export default ListReservation;
