// import React, {useEffect, useState} from 'react';
// import '../global.scss';
// import styles from '../styles/Form.module.scss';
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
// import {token} from "../api/axios";
//
//
// const Oauth2Signup = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         mode: 'onChange'
//     });
//     const navigate = useNavigate();
//
//
//
//     const phone = {
//         required: "필수 필드입니다.",
//         pattern: {
//             value: /^\d{3}-\d{3,4}-\d{4}$/,
//             message: "핸드폰번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
//         }
//     }
//
//
//     const onSubmit = async ({ phone }) => {
//         try {
//             const response = await token.post('/Oauth2Signup', { phone });
//             console.log("서버 응답: ", response.data);
//             navigate('/memberSaved');
//         } catch (error) {
//             console.error('추가 정보 입력 실패:', error);
//             console.error('서버 응답 에러:', error.response ? error.response.data : "No server response");
//         }
//     };
//
//     return (
//         <div className="page">
//             <div className="form_container">
//                 <h1 style={{margin: "3rem 0 5rem"}}>추가정보 입력</h1>
//                 <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Phone"
//                             {...register("phone", phone)}
//                         />
//                         {errors?.phone && (
//                             <div>
//                         <span className={styles.form_error}>
//                             {errors.phone.message}
//                         </span>
//                             </div>
//                         )}
//                     </div>
//                     <button type='submit' style={{margin: "5rem 0"}}>제출</button>
//                 </form>
//             </div>
//         </div>
//
//     );
// };
//
// export default Oauth2Signup;

// import React, {useEffect, useState} from 'react';
// import '../global.scss';
// import styles from '../styles/Form.module.scss';
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
// import {token} from "../api/axios";

// const Oauth2Signup = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         mode: 'onChange'
//     });
//     const navigate = useNavigate();
//
//     const [userEmail, setUserEmail] = useState('');
//
//     useEffect(() => {
//         const storedEmail = localStorage.getItem('userEmail');
//         if (storedEmail) {
//             setUserEmail(storedEmail);
//         }
//     }, []);
//
//     const phone = {
//         required: "필수 필드입니다.",
//         pattern: {
//             value: /^\d{3}-\d{3,4}-\d{4}$/,
//             message: "핸드폰번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
//         }
//     }
//
//     const onSubmit = async (data) => {
//         try {
//             const { phone } = data;
//             const response = await token.post('http://localhost:8080/api/auth/token', { userEmail, phone });
//             const accessToken = response.headers['AccessToken']; // 헤더 키 이름 대소문자 주의
//             const refreshToken = response.headers['RefreshToken']; // 헤더 키 이름 대소문자 주의
//
//             if (accessToken && refreshToken) {
//                 localStorage.setItem('accessToken', accessToken);
//                 localStorage.setItem('refreshToken', refreshToken);
//                 token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//                 console.log('업로드 성공:', response.data);
//                 navigate('/memberSaved');
//             } else {
//                 console.error('업로드 실패: 액세스 토큰을 받지 못했습니다.');
//             }
//         } catch (error) {
//             console.error('업로드 실패:', error.response ? error.response.data : error.message);
//         }
//     };
//
//     return (
//         <div className="page">
//             <div className="form_container">
//                 <h1 style={{margin: "3rem 0 5rem"}}>추가정보 입력</h1>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <input
//                             type="text"
//                             placeholder="Phone"
//                             {...register("phone", phone)}
//                         />
//                         {errors.phone && (
//                             <span className="form_error">
//                                 {errors.phone.message}
//                             </span>
//                         )}
//                     </div>
//                     <button type='submit' style={{margin: "5rem 0"}}>제출</button>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default Oauth2Signup;


import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Oauth2Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
    const navigate = useNavigate();

    const phone = {
        required: "필수 필드입니다.",
        pattern: {
            value: /^\d{3}-\d{3,4}-\d{4}$/,
            message: "핸드폰번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
        }
    };

    // const onSubmit = async (data) => {
    //     try {
    //         const { phone } = data;
    //         // 쿠키에서 자동으로 토큰 사용, 별도 저장 로직 제거
    //         await axios.post('http://localhost:8080/api/Oauth2Signup', { phone });
    //         console.log('업로드 성공');
    //         navigate('/memberSaved');
    //     } catch (error) {
    //         console.error('업로드 실패:', error.response ? error.response.data : error.message);
    //     }
    // };

    const onSubmit = async (data) => {
        try {
            const { phone } = data;
            const response = await fetch('http://localhost:8080/api/Oauth2Signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // 쿠키를 포함시키기 위해 credentials 옵션 유지
                body: JSON.stringify({ phone })
            });

            if (!response.ok) throw new Error('서버 통신 문제');
            const result = await response.json();
            console.log('업로드 성공:', result);
            navigate('/Oauth2Saved');
        } catch (error) {
            console.error('업로드 실패:', error);
        }
    };



    return (
        <div className="page">
            <div className="form_container">
                <h1 style={{margin: "3rem 0 5rem"}}>추가정보 입력</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone"
                            {...register("phone", phone)}
                        />
                        {errors.phone && (
                            <span className="form_error">{errors.phone.message}</span>
                        )}
                    </div>
                    <button type='submit' style={{margin: "5rem 0"}}>제출</button>
                </form>
            </div>
        </div>
    );
};

export default Oauth2Signup;
