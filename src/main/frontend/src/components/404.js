import React from 'react';

function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <img src="img/404.jpg" alt="Not Found" style={{ maxWidth: '100%', height: 'auto' }} />
            <p><a href="/">Go Home</a></p> {/* 홈페이지로 돌아가는 링크 */}
        </div>
    );
}

export default NotFound;