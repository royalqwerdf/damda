import React, {useEffect, useState} from 'react';
import axios from "axios";
import SignIn from "./sign-in/SignIn";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return(
        <div className="page">
            <div className="form_container">
                <h1 style={{margin: "3rem 0 5rem"}}>Login</h1>
                <SignIn/>
                <p style={{marginTop: "3rem"}}>
                    회원이 아니신가요?
                    <Link to={"/signUp"}>가입하기</Link>
                </p>
                <div style={{width: '80%', marginBottom: '3rem'}}>
                    <h5 style={{marginBottom: "3rem"}}> 간편로그인 </h5>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <a href="" style={{width: '75px'}}><img src="img/kakao.png" alt="카카오로그인"/></a>
                        <a href="" style={{width: '75px%'}}><img src="img/naver.png" alt="네이버로그인"/></a>
                        <a href="" style={{width: '75px%'}}><img src="img/google.png" alt="구글로그인"/></a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LoginPage;