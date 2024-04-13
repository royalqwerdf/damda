import React from 'react';
import '../../styles/UserClass.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import {Link} from "react-router-dom";
import UserButton from "../../components/UserButton";

function UserClass() {
    {/*임시 기능, 빈동작. 추후에 수정*/}
    const emptyFunction = () => {};



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
                   <div className="now-class">
                       <div className="class-circle"></div>
                       <div className="title-class">
                           <a>클래스 운영자</a>
                           <a>클래스 이름</a>
                           <a>예약 날짜</a>
                           <a>예약 시간</a>
                           <a>예약 인원</a>
                       </div>
                       <div className="class-button">
                           {/*예약변경 화면으로 이동*/}
                           <Link to="/User-ReservationUpdate">
                               <UserButton onClick={emptyFunction} type="button"  variant="class-update">클래스 수정</UserButton>
                           </Link>
                       </div>
                   </div>
                   </div>


           </div>

       </div>
   )

}

export default UserClass;