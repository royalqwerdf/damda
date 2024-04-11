import React from 'react';
import '../styles/UserLeftMenu.css';

function UserLeftMenu() {
    return (
        <div className="leftmenu">
            <p id="mypage">My Page</p>
            <hr className="menu-line1" />
            <ul className="vertical-menu1">
                <p id="myclass">나의 클래스</p>
                <li><a href="/User-Reservation">예약 관리</a></li>
                <li><a href="/MainPage">클래스 관리</a></li>
                <li><a href="/MainPage">결제 내역</a></li>
                <li><a href="/MainPage">리뷰 관리</a></li>
            </ul>
            <hr className="menu-line2" />
            <ul className="vertical-menu1">
                <p id="userinformation">회원정보</p>
                <li><a href="/MainPage">개인정보변경</a></li>
                <li><a href="/MainPage">회원탈퇴</a></li>
            </ul>
        </div>
    );
}

export default UserLeftMenu;
