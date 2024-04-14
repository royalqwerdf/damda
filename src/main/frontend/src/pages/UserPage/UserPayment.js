import React from 'react';
import '../../styles/UserPayment.css';
import UserLeftMenu from "../../components/UserLeftMenu";

function UserPayment() {
    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>

            <div className="user-payment-container">


                <div className="my-payment">
                    <p>나의클래스</p>
                    <p className="user-payment-menu">결제 내역</p>
                </div>

                <div className="user-payment-list">

                </div>


                <div className="user-payment-none">결제내역이 없습니다.</div>


            </div>


        </div>
    )

}

export default UserPayment;