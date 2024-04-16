import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { token } from "./axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, loginType }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = () => {
            const accessToken = localStorage.getItem('accessToken') || Cookies.get('accessToken');
            setIsLoggedIn(!!accessToken);
        };

        checkAuthStatus();
        window.addEventListener('storage', checkAuthStatus);

        // 주기적으로 AccessToken의 만료 여부를 확인하는 요청을 보냅니다.
        const checkAccessTokenExpiration = () => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                token.post('/checkAccess_tokenExpiration', { accessToken, loginType })
                    .then(response => {
                        if (response.data === "AccessToken이 만료되었습니다.") {
                            logout();
                        }
                    })
                    .catch(error => {
                        console.error('AccessToken 만료 여부 확인 중 오류 발생:', error);
                    });
            }
        };
        const intervalId = setInterval(checkAccessTokenExpiration, 600000); // 10분마다 요청을 보냅니다.

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            clearInterval(intervalId);
        };
    }, []);

    const logout = () => {
        const accessToken = localStorage.getItem('accessToken');
        token.post('/logout', { loginType })
            .then(() => {
                localStorage.removeItem('accessToken');
                Cookies.remove('accessToken');
                setIsLoggedIn(false);
                navigate('/');
            })
            .catch(error => {
                console.error('로그아웃 실패:', error);
            });
    };

    const login = (token) => {
        localStorage.setItem('accessToken', token);
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
