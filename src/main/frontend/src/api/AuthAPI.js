import axios from "axios";

const ACCESS_TOKEN = localStorage.getItem("accessToken");

/** CREATE CUSTOM AXIOS INSTANCE */
export const AuthApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${ACCESS_TOKEN}`,
    },
});
/** LOGIN API */
export const login = async ({ userEmail, password }) => {
    const data = { userEmail, password };
    const response = await AuthApi.post(`/pages/LoginPage/form/Form`, data);
    return response.data;
}
