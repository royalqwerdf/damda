import React, {useEffect, useState} from 'react';
import Form from "../../LoginPage/form/Form";
import axios from "../../../api/axios";
import {useNavigate} from "react-router-dom";
import {login} from "../../../api/AuthAPI";

const SignIn = () => {
    const navigate = useNavigate();
    const [] = useState("");

    const [values, setValues] = useState({
        userEmail: " ",
        password: " ",
    });

    const handleChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        login(values)
            .then((response) => {
                localStorage.clear();
                localStorage.setItem('refreshToken', response.refreshToken);
                localStorage.setItem('accessType', response.accessToken);
                window.local.href = '/home';
            }).catch((error) => {
                console.log(error);
        });
    }
    return (
        <Form
            title={"로그인"}
        />
    )
}

export default SignIn;