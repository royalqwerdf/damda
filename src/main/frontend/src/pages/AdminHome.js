import React, { useState, useEffect } from 'react';
import '../styles/AdminHome.css';
import axios from "axios";

import AdminMenu from "../components/admins/AdminMenu";
import AnnounceManage from "../components/admins/AnnounceManage";
import CategoryManage from "../components/admins/CategoryManage";
import ClassManage from "../components/admins/ClassManage";
import EventManage from "../components/admins/EventManage";
import InquiryManage from "../components/admins/InquiryManage";
import MemberManage from "../components/admins/MemberManage";
import ReservationManage from "../components/admins/ReservationManage";

function AdminHome() {

    const [selectedComponent, setSelectedComponent] = useState("MemberManage");

    const handleMenuClick = (component) => {
        setSelectedComponent(component);
    };

    const renderComponent = () => {
        switch (selectedComponent) {
            case "MemberManage":
                return <MemberManage />;
            case "ClassManage":
                return <ClassManage />;
            case "ReservationManage":
                return <ReservationManage />;
            case "CategoryManage":
                return <CategoryManage />;
            case "AnnounceManage":
                return <AnnounceManage />;
            case "EventManage":
                return <EventManage />;
            case "InquiryManage":
                return <InquiryManage />;
            default:
                return null;
        }
    };

    return (
        <div ClassName="full-container">
            //사이드 메뉴바 설정
            <div className="container">
                <div className="user-left-menu">
                    <div className="left-menu">
                        <p className="my-page">Admin Page</p>
                        <hr className="menu-line-1" />
                        <ul className="menu-1">
                            <div className="site-manage">사이트 관리</div>
                            <p className="my-class">관리자 메뉴</p>
                                <li onClick={() => handleMenuClick("MemberManage")} style={{cursor: 'pointer'}}>회원 관리</li>
                                <li onClick={() => handleMenuClick("ClassManage")} style={{cursor: 'pointer'}}>클래스 관리</li>
                                <li onClick={() => handleMenuClick("ReservationManage")} style={{cursor: 'pointer'}}>예약 관리</li>
                        </ul>
                        <hr className="menu-line-2" />
                        <ul className="menu-2">
                            <p className="user-information">홈페이지 관리</p>
                                <li onClick={() => handleMenuClick("CategoryManage")} style={{cursor: 'pointer'}}>카테고리 관리</li>
                                <li onClick={() => handleMenuClick("AnnounceManage")} style={{cursor: 'pointer'}}>공지 관리</li>
                                <li onClick={() => handleMenuClick("EventManage")} style={{cursor: 'pointer'}}>이벤트 관리</li>
                                <li onClick={() => handleMenuClick("InquiryManage")} style={{cursor: 'pointer'}}>문의 관리</li>
                        </ul>
                    </div>
                </div>


                <div className="detailed-admin-area">
                    {renderComponent()}
                </div>
            </div>
        </div>

    );

}

export default AdminHome;