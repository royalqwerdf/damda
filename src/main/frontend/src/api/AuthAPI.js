import { token } from "./axios";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */

/** LOGIN API */
export const login = async ({ userEmail, password }) => {
    try {
        const data = { userEmail, password };
        const response = await token.post(`/login`, data);

        // 토큰을 localStorage에 저장함.
        localStorage.setItem('accessToken', response.data.token);

        // localStorage에서 accessToken을 가져옵니다.
        const accessToken = localStorage.getItem('accessToken');

        // Axios 인스턴스 헤더를 새로운 액세스 토큰으로 업데이트합니다.
        token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        console.log('로그인 성공:', response.data);
    } catch (error) {
        console.error('로그인 실패:', error.response || error.message);
        throw new Error('로그인 실패');
    }
}

/** 회원가입 API */
export const signup = async ({ userEmail, password, name, phone }) => {
    try {
        const data = { userEmail, password, name, phone};
        const response = await token.post(`/signup`, data);

        console.log('회원가입 성공:', response.data);
        return response.data; // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error('회원가입 실패:', error.response || error.message);
        throw new Error('회원가입 실패');
    }
}
