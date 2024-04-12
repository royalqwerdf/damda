import React from 'react';
import '../styles/UserLeftMenu.css';
import { Link } from 'react-router-dom';


function UserLeftMenu() {
    return (
        <div className="leftmenu">
            <p className="mypage">
                <Link to="/User-Home">My Page</Link>
                </p>
            <hr className="menu-line1" />
            <ul className="vertical-menu1">
                <p className="mypage-category1">나의 클래스</p>
                <li><Link to="/User-Reservation">예약 관리</Link></li>
                <li><Link to="/User-Class">클래스 관리</Link></li>
                <li><Link to="/User-Payment">결제 내역</Link></li>
                <li><Link to="/User-Review">리뷰 관리</Link></li>
            </ul>
            <hr className="menu-line2"/>
            <ul className="vertical-menu1">
                <p className="mypage-category2">회원정보</p>
                <li><Link to="/User-Information">개인정보변경</Link></li>
                <li><Link to="/User-Delete">회원탈퇴</Link></li>
            </ul>
        </div>
    );
}

export default UserLeftMenu;
