import React, {useEffect, useState} from 'react';
import '../global.scss';
import styles from '../styles/Form.module.scss';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import {token} from "../api/axios";


const Oauth2Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const navigate = useNavigate();

    const [loginType, setLoginType] = useState('');
    const [snsId, setSnsId] = useState('');

    useEffect(() => {
        const storedLoginType = localStorage.getItem('loginType');
        const storedSnsId = localStorage.getItem('snsId');
        if (storedLoginType && storedSnsId) {
            setLoginType(storedLoginType);
            setSnsId(storedSnsId);
        } else {
            console.log('No loginType or snsId in localStorage');
        }
    }, []);


    const phone = {
        required: "필수 필드입니다.",
        pattern: {
            value: /^\d{3}-\d{3,4}-\d{4}$/,
            message: "핸드폰번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
        }
    }


    const onSubmit = async ({ phone }) => {
        try {
            const response = await token.post('/Oauth2Signup', { phone, loginType, snsId });
            console.log("서버 응답: ", response.data);
            navigate('/memberSaved');
        } catch (error) {
            console.error('추가 정보 입력 실패:', error);
            console.error('서버 응답 에러:', error.response ? error.response.data : "No server response");
        }
    };

    return (
        <div className="page">
            <div className="form_container">
                <h1 style={{margin: "3rem 0 5rem"}}>추가정보 입력</h1>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div>
                        <input
                            type="text"
                            placeholder="Phone"
                            {...register("phone", phone)}
                        />
                        {errors?.phone && (
                            <div>
                        <span className={styles.form_error}>
                            {errors.phone.message}
                        </span>
                            </div>
                        )}
                    </div>
                    <button type='submit' style={{margin: "5rem 0"}}>제출</button>
                </form>
            </div>
        </div>

    );
};

export default Oauth2Signup;