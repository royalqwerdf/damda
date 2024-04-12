import React from 'react';
import '../../styles/UserInformation.css';
import UserLeftMenu from "../../components/UserLeftMenu";

function UserInformation() {
    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>

            <div className="user-userinformation-container">


                <div className="my-userinformation">
                    <p>회원정보</p>
                    <p className="user-information-menu">개인정보변경</p>
                </div>


            </div>


        </div>
    )

}

export default UserInformation;