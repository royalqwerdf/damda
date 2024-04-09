import React, {useEffect, useState} from 'react';
import SignUp from "./sign-up/SignUp";
import {Link} from "react-router-dom";


const SignUpPage = () => {


    return (
        <div className="page">
            <div className="form_container">
                <h1 style={{margin: "3rem 0 5rem"}}>SignUp</h1>
                <SignUp/>
                <br/>
                <p>
                    이미 계정이 있으신가요?
                    <Link to={"/login"}>로그인</Link>
                </p>
                <div style={{width: '80%', marginBottom: '3rem'}}>
                    <h5 style={{marginBottom: "3rem"}}> 간편로그인 </h5>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <a href="" style={{width:'75px'}}><img src="img/kakao.png" alt="카카오로그인"/></a>
                        <a href="" style={{width:'75px%'}}><img src="img/naver.png" alt="네이버로그인"/></a>
                        <a href="" style={{width:'75px%'}}><img src="img/google.png" alt="구글로그인"/></a>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SignUpPage;