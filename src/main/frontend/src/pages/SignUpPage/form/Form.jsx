import React, {useEffect} from 'react';
import  '../../../global.scss';
import styles from '../../../styles/Form.module.scss';
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Checkbox} from "../../../components/Checkbox";

const Form = ({title}) => {

    const { watch,register, handleSubmit, formState: {errors}, reset, setValue, getValues,setError, clearErrors} = useForm({
        mode: 'onChange'
    })
    const navigate = useNavigate();

    const onSubmit = ({ email, password, name, phone }) => {
        console.log(email, password, name, phone);
        navigate('./memberSaved'); // 성공적인 폼 제출 후 리다이렉션할 페이지 경로
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
    const passwordCheck = {
        required: "비밀번호 확인",
        validate: {
            matchPassword: (value) => {
                const { password } = getValues();
                return password === value || '비밀번호가 일치하지 않습니다'
            }
        }
    }
    const name = {
        required: "필수 필드입니다.",
        maxLength: {
            value: 10,
            message: "이름은 최대 10자까지 입력 가능합니다."
        }
    }
    const phone = {
        required: "필수 필드입니다.",
        pattern: {
            value: /^\d{3}-\d{3,4}-\d{4}$/,
            message: "핸드폰번호 형식이 올바르지 않습니다. (예: 010-1234-5678)"
        }
    }

    // [비밀번호] value 수정 시 이미 입력된 [비밀번호 확인] value 도 같이 유효성 체크
    useEffect(() => {
        if (watch('password') !== watch('passwordCheck') && watch('passwordCheck')) {
            setError('passwordCheck', {
                type: 'password-mismatch',
                message: '비밀번호가 일치하지 않습니다'
            })
        } else { // 비밀번호 일치시 오류 제거
            clearErrors('passwordCheck');
        }
    }, [watch('password'), watch('passwordCheck')])

    const [service, setService] = React.useState(false);
    const [marketing, setMarketing] = React.useState(false);


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

            <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register("passwordCheck", passwordCheck)}
                />
                {errors?.passwordCheck &&
                    <div>
                    <span className={styles.form_error}>
                        {errors.passwordCheck.message}
                    </span>
                    </div>
                }
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", name)}
                />
                {errors?.name &&
                    <div>
                        <span className={styles.form_error}>
                            {errors.name.message}
                        </span>
                    </div>
                }
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Phone"
                    {...register("phone", phone)}
                />
                {errors?.phoneNumber &&
                    <div>
                        <span className={styles.form_error}>
                            {errors.phone.message}
                        </span>
                    </div>
                }
            </div>
             <div className={styles.ch1} style={{ width: '80%'}}>
                 <Checkbox checked={service} onChange={setService}> (필수)이용약관에 동의 합니다.</Checkbox>
                 <Checkbox checked={marketing} onChange={setMarketing}> (필수)개인정보수집 &#183; 이용에 동의 합니다.</Checkbox>
             </div>
            <button type='submit'>{title}</button>

        </form>
    );
};

export default Form;