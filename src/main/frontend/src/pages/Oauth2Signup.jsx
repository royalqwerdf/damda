import React from 'react';
import '../global.scss';
import styles from '../styles/Form.module.scss';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Oauth2Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });
    const navigate = useNavigate();

    const phone = {
        required: "필수 필드입니다.",
        pattern: {
            value: /^\d{3}-\d{3,4}-\d{4}$/,
            message: "핸드폰번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
        }
    }

    const onSubmit = ({ phone }) => {
        console.log(phone);
        // 휴대폰 번호 제출 로직 구현
        // 예: axios.post('/api/phone', { phone })...
        navigate('../memberSaved'); // 제출 후 리다이렉션할 페이지 경로
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