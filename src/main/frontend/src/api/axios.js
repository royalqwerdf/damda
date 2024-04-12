import axios from 'axios';

// Axios 인스턴스 생성
export const token = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 추가
token.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터 추가
token.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        // 여기서 refreshToken을 사용하여 새 accessToken을 요청하는 로직 구현
        return token.post('/refresh-token', { refreshToken })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    token.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                    return axios(originalRequest);
                }
            });
    }
    return Promise.reject(error);
});
