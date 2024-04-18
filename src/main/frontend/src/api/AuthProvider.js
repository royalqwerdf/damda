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