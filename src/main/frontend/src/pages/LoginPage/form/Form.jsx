import React, {useEffect} from 'react';
import  '../../../global.scss';
import styles from '../../../styles/Form.module.scss';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Checkbox} from "../../../components/Checkbox";
import {login} from "../../../api/AuthAPI";
import {token} from "../../../api/axios";

const Form = ({title}) => {

    const { watch,register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    })
    const navigate = useNavigate();

    const onSubmit = async ({ userEmail, password }) => {
        try {
            const response = await token.post('/login', { userEmail, password });
            console.log("응답 헤더: ", response.headers);

            const accessToken = response.headers['authorization'];
            const refreshToken = response.headers['authorization-refresh'];

            if (accessToken && refreshToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                token.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                console.log('로그인 성공:', accessToken);
                navigate('/'); // 성공적인 로그인 후 리다이렉션
            } else {
                console.error('로그인 실패: 액세스 토큰을 받지 못했습니다.');
            }
        } catch (error) {
            console.error('로그인 실패:', error.response ? error.response.data : error.message);
        }
    };

    const userEmail = {
        required: "필수 필드입니다.",
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '입력하신 이메일 주소가 올바르지 않습니다.'
        }
    }
    const password = {
        required: "필수 필드입니다.",
        minLength: {
            value: 8,
            message: "최소 8자입니다."
        },
        maxLength: {
            value: 13,
            message: "최대 13자입니다."
        },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,13}$/,
            message: '최소 8자, 최대 13자, 영문 및 특수기호 포함'
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            <div>
                <input
                    type="email"
                    placeholder="E-mail"
                    {...register("userEmail", userEmail)}
                />
                {errors?.email &&
                    <div>
                    <span className={styles.form_error}>
                        {errors.email.message}
                    </span>
                    </div>
                }
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", password)}
                />
                {errors?.password &&
                    <div>
                    <span className={styles.form_error}>
                        {errors.password.message}
                    </span>
                    </div>
                }
            </div>


            <button type='submit'>{title}</button>

        </form>

    );
};

export default Form;