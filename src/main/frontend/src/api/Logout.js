import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import Cookies from 'js-cookie';
import { token } from './axios';


export function useLogout(loginType) { // loginType을 추가합니다.
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    return () => {
        token.post('/logout', { loginType }) // loginType을 서버로 전달합니다.
            .then(() => {
                logout();
            })
            .catch(error => {
                console.error('로그아웃 실패:', error);
            });
    };
}
