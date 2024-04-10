import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});
/** LOGIN API */
export const login = async ({ userEmail, password }) => {
    try {
        const data = { userEmail, password };
        const response = await AuthApi.post(`/pages/LoginPage/form/Form`, data);

        // 토큰을 localStorage에 저장함.
        localStorage.setItem('accessToken', response.data.token);

        // localStorage에서 accessToken을 가져옵니다.
        const accessToken = localStorage.getItem('accessToken');

        // Axios 인스턴스 헤더를 새로운 액세스 토큰으로 업데이트합니다.
        AuthApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        console.log('로그인 성공:', response.data);
    } catch (error) {
        console.error('로그인 실패:', error.response || error.message);
        throw new Error('로그인 실패');
    }
}
