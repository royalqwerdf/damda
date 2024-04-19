import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import './global.scss';
import {token} from "./api/axios";

// 클라이언트 측 JavaScript
const url = new URL(window.location.href);
let accessToken = url.searchParams.get("accessToken");

if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    url.searchParams.delete("accessToken");
    window.history.pushState(null, "", url.toString());
}


// Axios 기본 헤더 설정
accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
