import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { token } from "./axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthStatus = () => {
            const accessToken = localStorage.getItem('accessToken') || Cookies.get('accessToken');
            setIsLoggedIn(!!accessToken);
        };

        checkAuthStatus();
        window.addEventListener('storage', checkAuthStatus);

        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    const logout = () => {
        const accessToken = localStorage.getItem('accessToken');
        // 클라이언트에서 서버에 로그아웃 요청을 보냄
        token.post('/logout')
            .then(() => {
                // 로그아웃 요청이 성공하면 클라이언트 측의 토큰 삭제
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