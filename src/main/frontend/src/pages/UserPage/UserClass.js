import React from 'react';
import '../../styles/UserClass.css';
import UserLeftMenu from "../../components/UserLeftMenu";

function UserClass() {
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


           </div>

       </div>
   )

}

export default UserClass;