import React, { useEffect, useState } from 'react';
import '../../styles/UserReview.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import { Link } from "react-router-dom";
import UserButton from "../../components/UserButton";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function UserReview() {
    //리뷰 데이터 값 가져오기
    //리뷰데이터가 있을때마다 리뷰상자 추가 (열)
    //리뷰데이터가 있을때와 없을때 템플릿 변경(이건 제가 합니다!-윤희)

    const [userReviewList, setUserReviewList] = useState([]);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if(token) { // 토큰이 존재할 때만 jwtDecode를 실행
            try {
                const decodedToken = jwtDecode(token);
                const memberId = decodedToken.memberId;
                axios.get(`/review/${memberId}`)
                    .then(response => {
                        setUserReviewList(response.data);
                        console.log(response.data);
                    })
                    .catch(error => console.log(error));
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);




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
                <h3 className="user-review-myh3">내가 쓴 리뷰</h3>
                <div className="user-review-list">
                    {userReviewList.length > 0 ? (
                            userReviewList?.map(review => {
                                return(
                                <div className="user-review-box">
                                    <div className="title-reviewlist">
                                        <a>클래스 이름</a>
                                        <a>제목</a>
                                        <a>내용</a>
                                        <a>별점</a>
                                    </div>
                                    <div className="data-review">
                                        <a>{review.className}</a>
                                        <a>{review.title}</a>
                                        <a>{review.content}</a>
                                        <a>{review.rating}</a>
                                    </div>
                                    <hr className="userReview-line"></hr>
                                </div>
                                )
                            })
                        ) : (
                        <div className="user-review-none">내가 쓴 리뷰가 없습니다.</div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default UserReview;
