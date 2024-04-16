import { token } from "./axios";
import {useNavigate} from "react-router-dom";


/** 로그인 API */
export const login = async ({ userEmail, password }, navigate) => {
    try {
        const response = await token.post('/login', { userEmail, password });
        const accessToken = response.headers['authorization'];
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            navigate('/'); // 성공적인 로그인 후 리다이렉션
        } else {
            console.error('로그인 실패: 액세스 토큰을 받지 못했습니다.');
        }
    } catch (error) {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
    }
}

export const Oauth2Signup = async ({ phone,userEmail }) => {
    try {
        const response = await token.post('/', { phone, userEmail });

        // 올바른 헤더 이름으로 토큰을 추출합니다.
        const accessToken = response.headers['Authorization']; // 이 부분을 정확히 서버 설정에 맞게 수정
        const refreshToken = response.headers['Authorization-refresh']; // 이 부분을 정확히 서버 설정에 맞게 수정

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken.replace('Beare', ' '));
            localStorage.setItem('refreshToken', refreshToken);
            token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            console.log('로그인 성공:', response.data);
        } else {
            console.error('로그인 실패: 액세스 토큰을 받지 못했습니다.');
        }
    } catch (error) {
        console.error('로그인 실패:', error.response ? error.response.data : error.message);
        throw new Error('로그인 실패');
    }
}

/** 회원가입 API */
export const signup = async ({ userEmail, password, name, phone }) => {
    try {
        const data = { userEmail, password, name, phone };
        const response = await token.post(`/signup`, data);
        console.log('회원가입 성공:', response.data);
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('회원가입 실패:', error.response || error.message);
        throw new Error('회원가입 실패');
    }
}

export const snslogin = async (snsData) => {
    try {
        const response = await token.post(`/signup`, snsData);

        const accessToken = response.headers['authorization'];
        const refreshToken = response.headers['authorization-refresh'];

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            console.log('소셜 로그인 성공:', response.data);
        } else {
            console.error('소셜 로그인 실패: 액세스 토큰을 받지 못했습니다.');
        }
    } catch (error) {
        console.error('소셜 로그인 실패:', error.response ? error.response.data : error.message);
        throw new Error('소셜 로그인 실패');
    }
};


