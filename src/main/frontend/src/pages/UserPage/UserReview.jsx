import React, { useEffect, useState } from 'react';
import '../../styles/UserReview.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import {Link, useNavigate} from "react-router-dom";
import UserButton from "../../components/UserButton";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function UserReview() {
    //리뷰 데이터 값 가져오기
    //리뷰데이터가 있을때마다 리뷰상자 추가 (열)
    //리뷰데이터가 있을때와 없을때 템플릿 변경(이건 제가 합니다!-윤희)

    const [userReviewList, setUserReviewList] = useState([]);
    const navigate = useNavigate();

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
                                        <hr style={{width:"850px",marginLeft:"250px",marginTop:"1px",marginBottom:"100px"}}></hr>
                                        <div className="title-reviewlist">
                                            <div style={{width: "25%", textAlign: "center"}}></div>
                                            <div style={{width: "15%", textAlign: "center"}}>클래스
                                                이름
                                            </div>
                                            <div style={{width: "15%", textAlign: "center"}}>제목
                                            </div>
                                            <div style={{width: "30%", textAlign: "center",paddingRight:"20px"}}>내용
                                            </div>
                                            <div style={{width: "20%", textAlign: "center",paddingRight:"80px"}}>평점
                                            </div>
                                        </div>
                                        <div className="data-review">
                                            <Link to={`/class-reservation/${review.class_id}`}>
                                                <div className="userhome-now-circle" style={{marginTop:"-10px"}}>
                                                    <img src={review.classImage} alt="클래스_이미지"
                                                         className="class-now-circle-image"/>
                                                </div>
                                            </Link>
                                            <div style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center"
                                            }}>
                                                <div
                                                    style={{width: "20%", textAlign: "center"}}>{review.className}</div>
                                                <div style={{width: "20%", textAlign: "center"}}>{review.title}</div>
                                                <div style={{width: "38%", textAlign: "center"}}>{review.contents}</div>
                                                <div style={{width: "22%", textAlign: "center",paddingRight:"10px"}}>{starImage(review.rating)}</div>
                                            </div>
                                            <div style={{marginRight:"-10px",width:"80px",marginTop:"30px"}}><button className="review-delBtn" onClick={()=>deleteReview(review.review_id)}>삭제</button></div>
                                        </div>
                                        <hr className="userReview-line"></hr>
                                    </div>
                                )
                            })
                        ) : (
                        <div className="user-review-none">작성하신 리뷰가 없습니다.</div>
                        )}
                </div>
            </div>

        </div>
    );

    function starImage(rating){
        let startImage = [];
        for(let i=0;i<5;i++) {
            if(i<rating){
                startImage.push(<img
                    style={{width:"24px"}} src="https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/star.png?alt=media&token=533d0a9d-b1f9-4cf7-9517-4f467e894ecf"/>);

            }
            else{
                startImage.push(<img
                    style={{width:"24px"}} src="https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/empty_start.png?alt=media&token=b2918120-3f5f-4840-8edb-6a09f02708ef"/>)
            }
        }
        return startImage;
    }

    function deleteReview(id){
        if(window.confirm("정말 삭제하시겠습니까?")){
            axios.post(`/review/delete/${id}`)
                .catch(error=>console.log(error))
                .then(
                    window.location.reload("/User-Review")
                );
        } else {
        }
    }
}

export default UserReview;
