import React, {useEffect, useState} from 'react';
import  '../global.scss';
import styles from '../styles/Form.module.scss';

const MemberSaved = () => {
    return (
        <div className="page">
            <div className="form_container">
                <div className={styles.member_save}>
                    <img src="img/saved.png" alt=""/>
                    <h1 style={{margin: "3rem 0 5rem"}}>회원가입 완료</h1>
                    <div className="text-c">
                        <p>홍길동님의 회원가입이 완료되었습니다.</p>
                        <p>다양한 클래스를 감상해보세요!</p>
                    </div>
                    <div className="link-box">
                        <div className={styles.link_a}>
                            <a href="/">메인페이지</a>
                        </div>
                        <div className={styles.link_al}>
                            <a href="/login">로그인</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MemberSaved;