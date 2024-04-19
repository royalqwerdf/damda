import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import '../../styles/AdminHome.css';
import '../../styles/MemberUpdate.css';
import axios from "axios";

import AdminMenu from "./AdminMenu";
import AnnounceManage from "./AnnounceManage";
import CategoryManage from "./CategoryManage";
import ClassManage from "./ClassManage";
import EventManage from "./EventManage";
import InquiryManage from "./InquiryManage";
import MemberManage from "./MemberManage";
import ReservationManage from "./ReservationManage";

function MemberUpdate() {
    // URL에서 memberId 받아오기
    const { id : memberId } = useParams();

    // memberId로 회원정보 받아오기
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loginType, setLoginType] = useState('');

    useEffect(() => {
        axios.get(`/admin/members/${memberId}`)
            .then(response => {
                // 회원 정보 가져오기
                const member = response.data;
                // 가져온 회원 정보를 상태에 설정
                setUserEmail(member.userEmail);
                setPassword(member.password);
                setName(member.name);
                setPhone(member.phone);
                setLoginType(member.loginType);
            })
            .catch(error => {
                console.error('회원 정보를 가져오는 중 오류 발생:', error);
            });
    }, [memberId]); // memberId가 변경될 때마다 useEffect가 다시 실행됨

    //회원 정보 수정
    const updateMember = () => {
        axios.put(`/admin/members/${memberId}`, {
            userEmail,
            password,
            name,
            phone
        })
            .then(response => {
                console.log('회원 정보가 성공적으로 수정되었습니다.');
                navigate('/admin-home');
            })
            .catch(error => {
                console.error('회원 정보 수정 중 오류 발생:', error);
            });
    };

    const navigate = useNavigate();

    // 뒤로 가기 & 메뉴 클릭
    const goBack = () => {
        navigate('/admin-home')
    }

    // 소셜 로그인 회원은 정보를 수정할 수 없음을 알림
    const[isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if(loginType !== 'BASIC') setIsVisible(true);
        else setIsVisible(false);
    }, [loginType])

    return (
        <div ClassName="full-container">
            //사이드 메뉴바 설정
            <div className="container">
                <div className="user-left-menu">
                    <div className="left-menu">
                        <p className="my-page">Admin Page</p>
                        <hr className="menu-line-1"/>
                        <ul className="menu-1">
                            <div className="site-manage">사이트 관리</div>
                            <p className="my-class">관리자 메뉴</p>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>회원 관리</li>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>클래스 관리</li>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>예약 관리
                            </li>
                        </ul>
                        <hr className="menu-line-2"/>
                        <ul className="menu-2">
                            <p className="user-information">홈페이지 관리</p>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>카테고리 관리</li>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>공지 관리</li>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>이벤트 관리</li>
                            <li onClick={() => goBack()} style={{cursor: 'pointer'}}>문의 관리</li>
                        </ul>
                    </div>
                </div>


                <div className="detailed-admin-area">
                    <div className="admin-menu-area" style={{width: '100%'}}>
                        <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0',
                            fontSize: '22px', fontWeight: 'bold', color: '#808000'
                        }}>회원정보 수정
                        </div>

                        <div className="content-area" style={{marginTop: '10px', padding: '10px', width: '100%'}}>
                            {/* 회원 정보 수정 폼 */}
                            <form onSubmit={updateMember}>
                                <div>
                                    <label>이메일</label>
                                    <input type="text" value={userEmail}
                                           onChange={(e) => setUserEmail(e.target.value)}
                                           disabled={loginType !== 'BASIC'}/>
                                    {isVisible && <small style={{color: 'red'}}>소셜 로그인 회원의 정보는 수정할 수 없습니다.</small>}
                                </div>
                                <div>
                                    <label>비밀번호</label>
                                    <input type="password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           disabled={loginType !== 'BASIC'}/>
                                    {/*<button className="initialize">초기화</button>*/}
                                    {isVisible && <small style={{color: 'red'}}>소셜 로그인 회원의 정보는 수정할 수 없습니다.</small>}
                                </div>
                                <div>
                                    <label>회원 이름</label>
                                    <input className="long" type="text" value={name}
                                           onChange={(e) => setName(e.target.value)}
                                           disabled={loginType !== 'BASIC'}/>
                                    {isVisible && <small style={{color: 'red'}}>소셜 로그인 회원의 정보는 수정할 수 없습니다.</small>}
                                </div>
                                <div>
                                    <label>전화번호</label>
                                    <input className="long" type="text" value={phone}
                                           onChange={(e) => setPhone(e.target.value)}/>
                                </div>
                                <div className="buttons">
                                    <button className="cancel" onClick={() => goBack()}>취소</button>
                                    <button type="submit">수정</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );

}

export default MemberUpdate;