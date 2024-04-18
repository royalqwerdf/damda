import React, { createContext, useContext, useState, useEffect } from 'react';
import { token } from "./axios";
import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();
//
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children, loginType }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         console.log("AuthProvider useEffect is triggered");
//         const checkAuthStatus = () => {
//             const accessToken = localStorage.getItem('accessToken');
//             setIsLoggedIn(!!accessToken);
//         };
//
//         checkAuthStatus();
//         window.addEventListener('storage', checkAuthStatus);
//
//         // 주기적으로 AccessToken의 만료 여부를 확인하는 요청을 보냅니다.
//         const checkAccessTokenExpiration = () => {
//             const accessToken = localStorage.getItem('accessToken');
//             if (accessToken) {
//                 token.post('/checkAccess_tokenExpiration', { accessToken, loginType })
//                     .then(response => {
//                         if (response.data === "AccessToken이 만료되었습니다.") {
//                             logout();
//                         }
//                     })
//                     .catch(error => {
//                         console.error('AccessToken 만료 여부 확인 중 오류 발생:', error);
//                     });
//             }
//         };
//         const intervalId = setInterval(checkAccessTokenExpiration, 600000); // 10분마다 요청을 보냅니다.
//
//         return () => {
//             window.removeEventListener('storage', checkAuthStatus);
//             clearInterval(intervalId);
//         };
//     }, [loginType]);
//
//     const logout = () => {
//         localStorage.removeItem('accessToken'); // 쿠키 대신 로컬 스토리지에서 토큰 삭제
//         setIsLoggedIn(false);
//         navigate('/');
//     };
//
//     const login = (token) => {
//         localStorage.setItem('accessToken', token);
//         setIsLoggedIn(true);
//     };
//
//     return (
//         <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!accessToken);
    }, []);

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
    };

    const logout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (response.ok) {
                localStorage.removeItem('accessToken');
                setIsLoggedIn(false);
                navigate('/');
            } else {
                throw new Error('Failed to logout on the server');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};