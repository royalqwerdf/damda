import React, {useEffect, useState} from 'react';
import Signup from "./sign-up/Signup";
import {Link} from "react-router-dom";


const SignupPage = () => {


    return (
        <div className="page">
            <div className="form_container">
                <h1 style={{margin: "3rem 0 5rem"}}>Signup</h1>
                <Signup/>
                <br/>
                <p>
                    이미 계정이 있으신가요?
                    <Link to={"/login"}>로그인</Link>
                </p>
                <div style={{width: '80%', marginBottom: '3rem'}}>
                    <h5 style={{marginBottom: "3rem"}}> 간편로그인 </h5>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <a href="http://localhost:8080/oauth2/authorization/kakao" style={{width:'75px'}}><img src="img/kakao.png" alt="카카오로그인"/></a>
                        <a href="http://localhost:8080/oauth2/authorization/naver" style={{width:'75px%'}}><img src="img/naver.png" alt="네이버로그인"/></a>
                        <a href="http://localhost:8080/oauth2/authorization/google" style={{width:'75px%'}}><img src="img/google.png" alt="구글로그인"/></a>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SignupPage;