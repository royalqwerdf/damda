import React from 'react';
import '../../styles/UserReservationUpdate.css';
function UserReservationUpdate({ onClick, children, variant, type }) {
    return (
        <button onClick={onClick} type={type} className={`user-button ${variant}`}>
            {children}
        </button>
    );

}

export default UserReservationUpdate;