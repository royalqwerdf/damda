import React, {useEffect} from 'react';
import  '../../../global.scss';
import styles from '../../../styles/Form.module.scss';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Checkbox} from "../../../components/Checkbox";
import {login} from "../../../api/AuthAPI";

const Form = ({title}) => {

    const { watch,register, handleSubmit, formState: {errors}} = useForm({
        mode: 'onChange'
    })
    const navigate = useNavigate();

    const onSubmit = async ({ email, password }) => {
        try {
            await login(email, password);
            navigate('/'); // 성공적인 폼 제출 후 리다이렉션할 페이지 경로
        } catch (error) {
            console.error('로그인 실패:', error);
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
                    {...register("email", userEmail)}
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