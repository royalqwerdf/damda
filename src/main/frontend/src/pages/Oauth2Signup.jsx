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
            navigate('/Oauth2Saved', {state: { name: result.name } });
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
