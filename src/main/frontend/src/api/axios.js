import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://localhost3000/api',
});

// 요청 인터셉터 추가
api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터 추가
api.interceptors.response.use(response => {
    return response;
}, error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        // 여기서 refreshToken을 사용하여 새 accessToken을 요청하는 로직 구현
        return axios.post('/refresh-token', { refreshToken })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                    return axios(originalRequest);
                }
            });
    }
    return Promise.reject(error);
});
