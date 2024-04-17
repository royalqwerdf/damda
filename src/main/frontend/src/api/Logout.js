import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Cookies from 'js-cookie';
import { token } from './axios';

export function useLogout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    return () => {
        token.post('/logout')
            .then(() => {
                logout();
            })
            .catch(error => {
                console.error('로그아웃 실패:', error);
            });
    };
}