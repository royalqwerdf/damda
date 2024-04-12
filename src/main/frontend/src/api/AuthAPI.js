import { token } from "./axios";

/** 로그인 API */
export const login = async ({ userEmail, password }) => {
    try {
        const response = await token.post('/login', { userEmail, password });

        // 올바른 헤더 이름으로 토큰을 추출합니다.
        const accessToken = response.headers['authorization']; // 이 부분을 정확히 서버 설정에 맞게 수정
        const refreshToken = response.headers['authorization-refresh']; // 이 부분을 정확히 서버 설정에 맞게 수정

        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
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

/** 소셜 로그인 API */
// export const socialLogin = async (socialData) => {
//     try {
//         const response = await token.post(`/signup`, socialData);
//
//         // 올바른 헤더 이름으로 토큰을 추출합니다.
//         const accessToken = response.headers['authorization']; // 이 부분을 정확히 서버 설정에 맞게 수정
//         const refreshToken = response.headers['authorization-refresh'];
//
//         // 소셜 로그인 토큰과 사용자 정보 저장
//         localStorage.setItem('accessToken', response.data.token);
//         localStorage.setItem('loginType', response.data.loginType);
//         localStorage.setItem('snsId', response.data.snsId);
//         token.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//
//         console.log('소셜 로그인 성공:', response.data);
//     } catch (error) {
//         console.error('소셜 로그인 실패:', error.response || error.message);
//         throw new Error('소셜 로그인 실패');
//     }
// }
// /** 소셜 로그인 API */
// export const socialLogin = async (socialData) => {
//     try {
//         const response = await token.post(`/signup`, socialData); // URL을 서버 설정에 맞춰 조정해야 할 수 있습니다.
//
//         // 올바른 헤더 이름으로 토큰을 추출합니다.
//         const accessToken = response.headers['authorization'];
//         const refreshToken = response.headers['authorization-refresh'];
//
//         if (accessToken && refreshToken) {
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);
//             token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//             console.log('소셜 로그인 성공:', response.data);
//         } else {
//             console.error('소셜 로그인 실패: 액세스 토큰을 받지 못했습니다.');
//         }
//     } catch (error) {
//         console.error('소셜 로그인 실패:', error.response ? error.response.data : error.message);
//         throw new Error('소셜 로그인 실패');
//     }
// }
export const socialLogin = async (socialData) => {
    try {
        const response = await token.post(`/signup`, socialData); // URL 확인 필요
        const data = await response.json(); // 응답 데이터를 JSON으로 변환

        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;

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
}

