import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import '../../styles/UserClass.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import {Link} from "react-router-dom";
import UserButton from "../../components/UserButton";

function UserClass() {

    const navigate = useNavigate();
    const [member, setMember] = useState([]);
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('accessToken')===null){
            if(window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?")){
                navigate("/login");
            } else {
                navigate("/");
            }
        }else{
            const token = localStorage.getItem('accessToken');
            const decodedToken = jwtDecode(token);
            const memberEmail = decodedToken.userEmail;

            axios.get(`/api/member/${memberEmail}`)
                .then(response => {
                    setMember(response.data);
                    axios.get(`/member-class/${response.data.id}`)
                        .then(response => {
                            setClassList(response.data);
                            console.log("클래스 리스트 가져오기 성공")
                        })
                        .catch(error => console.log("사용자의 클래스 불러오기 실패! : " + error));
                })
                .catch(error => console.log("사용자 정보 불러오기 실패! : " + error));
        }
    }, []);

    //수정 버튼 눌렀을때 수정 페이지로 이동
    const handleClassUpdate = async (classId) => {
        navigate(`/class-open/update/${classId}`);
    }

    return (
       <div>
           <div className="user-left-menu">
               <UserLeftMenu/>
           </div>

           <div className="user-class-container">


           <div className="my-class">
               <p>나의클래스</p>
               <p className="user-class-menu">클래스 관리</p>
           </div>

               {/*클래스 생길시마다 새로 추가되는 로직 필요*/}
               <h3 className="now-class">진행중인 클래스</h3>
               <h4 className="class-delete-notice">클래스 취소는 '문의하기'를 통해 관리자에게 요청해주세요.</h4>
               <div className="my-now-class">
                    <div className="now-class" style={{width: '800px', marginLeft: '100px', borderBottom: '1px solid #000000'}}>
                        <div className="title-area" style={{width: '100%', display: 'flex'}}>
                            <div style={{flex: '2', color: '#424242', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>클래스 이미지</div>
                            <div style={{flex: '2', color: '#424242', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>클래스 이름</div>
                            <div style={{flex: '1', color: '#424242', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>카테고리</div>
                            <div style={{flex: '2', color: '#424242', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>운영일</div>
                            <div style={{flex: '2', color: '#424242', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>예약현황</div>
                            <div style={{flex: '1', color: '#424242', fontSize: '14px', fontWeight: 'bold', textAlign: 'center'}}>수정</div>
                        </div>

                        {classList.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>등록한 클래스가 없습니다!</div>
                        ) : (
                            classList.map(onedayClass => (
                                <div className="classInfoZone" key={onedayClass.id} style={{ display: 'flex', marginTop: '10px', padding: '5px', height: '80px', border: '1px solid #dcdcdc', borderRadius: '10px' }}>
                                    <div style={{ flex: '2' }}>
                                        <img src={onedayClass.mainImage} style={{ width: '90px', height: '70px' }} alt="클래스_이미지" className="class-now-circle-image" />
                                    </div>
                                    <div style={{ flex: '2', color: '#424242', fontSize: '14px', textAlign: 'center', lineHeight: '60px' }}>{onedayClass.className}</div>
                                    <div style={{ flex: '1', color: '#424242', fontSize: '14px', textAlign: 'center', lineHeight: '60px' }}>{onedayClass.categoryName}</div>
                                    <div style={{ flex: '2', color: '#424242', fontSize: '14px', textAlign: 'center', lineHeight: '60px' }}>{onedayClass.weekdays}</div>
                                    <div style={{ flex: '2', color: '#424242', fontSize: '14px', textAlign: 'center', lineHeight: '60px' }}>{onedayClass.reserveCount}</div>
                                    <div style={{ flex: '1', color: '#424242', fontSize: '14px', textAlign: 'center', lineHeight: '60px' }}>
                                        <button style={{ marginLeft: '10px', fontSize: '10px', width: '60px', height: '70px', color: '#FFFFFF', backgroundColor: '#c0c0c0', border: '2px solid #c8c8c8', borderRadius: '10px' }} onClick={() => handleClassUpdate(onedayClass.id)}>수정</button>
                                    </div>
                                </div>
                            ))
                        )}

                        </div>


              </div>


           </div>

       </div>
   )

}

export default UserClass;