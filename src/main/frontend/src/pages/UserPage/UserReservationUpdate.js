import React from 'react';
import '../../styles/UserReservationUpdate.css';
import UserLeftMenu from "../../components/UserLeftMenu";
function UserReservationUpdate({ onClick, children, variant, type }) {
    return (
       <div>
        <button onClick={onClick} type={type} className={`user-button ${variant}`}>
            {children}
        </button>

        <div className="user-left-menu">
        <UserLeftMenu/>
        </div>

       </div>
);

}

export default UserReservationUpdate;