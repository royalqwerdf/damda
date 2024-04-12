import React from 'react';
import '../styles/UserButton.css';
function UserButton({ onClick, children, variant, type }) {
    return (
        <button onClick={onClick} type={type} className={`user-button ${variant}`}>
            {children}
        </button>
    );

}

export default UserButton;