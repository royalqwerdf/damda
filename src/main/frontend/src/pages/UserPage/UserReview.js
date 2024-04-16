import React, { useEffect, useState } from 'react';
import '../../styles/UserReview.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import { Link } from "react-router-dom";
import UserButton from "../../components/UserButton";
import axios from "axios";

function UserReview() {
    {/* 리뷰리스트 가져오면 주석 모두 해제*/}
    const [userReviewList, setUserReviewList] = useState([]);

    useEffect(() => {
        fetchUserReviewList();
    }, []);

    const fetchUserReviewList = async () => {
        try {
            const response = await axios.get('/ClassReview/contents'); // 예약 데이터를 가져오는 API 호출
            setUserReviewList(response.data);
        } catch (error) {
            console.error('Error fetching review:', error);
        }
    };


    const [userReservationList, setUserReservationList] = useState([]);

    useEffect(() => {
        fetchUserReservationList();
    }, []);

    {/* orderdetail controller에서 가져온 내용*/}
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
                <UserLeftMenu />
            </div>

            <div className="user-review-container">
                <div className="my-review">
                    <p>나의클래스</p>
                    <p className="user-review-menu">리뷰 관리</p>
                </div>
                {/*{userReviewList.length > 0 ? ( */}
                <h3 className="user-review-myh3">내가 쓴 리뷰</h3>

                <div className="user-review-list">
                    <div className="user-review-box">
                        <div className="title-reviewlist">
                            <a>클래스 이름</a>
                            <a>예약 날짜</a>
                            <a>예약 인원</a>
                            <a>리뷰 내용 미리보기?</a>
                        </div>
                        <div className="data-review">
                            <a>{userReviewList.className}</a>
                            <a>{userReservationList.reservationDate}</a>
                            <a>{userReservationList.totalHeadcount}</a>
                            <a>{userReviewList.reviewContent}</a>
                        </div>

                        <hr className="userReview-line"></hr>
                    </div>
                    {/* ) : ( */}

                    <div className="user-review-none">내가 쓴 리뷰가 없습니다.</div>
                    {/* )} */}
                </div>
            </div>
        </div>
    );
}

export default UserReview;
