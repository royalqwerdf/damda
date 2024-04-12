import React from 'react';
import '../../styles/UserReview.css';
import UserLeftMenu from "../../components/UserLeftMenu";

function UserReview() {
    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>


            <div className="user-review-container">


                <div className="my-review">
                    <p>나의클래스</p>
                    <p className="user-review-menu">리뷰 관리</p>
                </div>


            </div>


        </div>
    )

}

export default UserReview;