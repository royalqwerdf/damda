import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom';

function InquiryManage() {

    const [inquiryList, setInquiryList] = useState([{
        id: '',
        title: '',
        content: '',
        reply: '',
        comment_yn: '',
        createdAt: ''
    }]);

    useEffect(() => {
        axios.get("http://localhost:8080/admin-home")
            .then(res => setInquiryList(res.data.inquiryList))
            .catch(error => console.log("에러! :" + error))
    }, []);

    return (
        <div className="container" style={{padding: '0px'}}>
            <div className="admin-menu-area" style={{width: '100%'}}>
                <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0', fontSize: '22px', fontWeight: 'bold', color: '#808000'}}>문의 관리</div>

                <div className="second-title" style={{marginTop: '10px', padding: '20px', width: '100%', height: '40px'}}>
                    <div style={{marginLeft: '30px', fontSize: '20px', fontWeight: 'bold', color: '#808000'}}>문의 검색</div>
                </div>

                <div className="content-area" style={{marginTop: '10px', padding: '10px', width: '100%'}}>
                    <table className="inquiry-area" style={{width: '100%', borderBottom: '1px solid #000000'}}>
                        <thead style={{padding: '10px', width: '100%'}}>
                        <tr className="column-title-area" >
                            <th className="member-title" style={{marginLeft: '10px', flex: '1', color: '#424242', fontSize: '14px'}}>분류</th>
                            <th className="category-title" style={{marginLeft: '10px',flex: '1', color: '#424242', fontSize: '14px'}}>회원</th>
                            <th className="writer-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>제목</th>
                            <th className="writer-title" style={{marginLeft: '10px',flex: '3', color: '#424242', fontSize: '14px'}}>아이디</th>
                            <th className="content-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>작성일시</th>
                            <th className="content-title" style={{marginLeft: '10px',flex: '1', color: '#424242', fontSize: '14px'}}>답변</th>
                        </tr>
                        </thead>

                        <tbody>
                        {inquiryList.map((inquiry, idx) => {

                            return(

                                <tr key={inquiry.id} style={{marginTop: '10px', borderTop: '1px solid #000000'}}>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px'}}>임시</td>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px'}}>임시</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px'}}>{inquiry.title}</td>
                                    <td style={{flex: '3', color: '#424242', fontSize: '14px'}}>임시</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px'}}>{inquiry.createdAt}</td>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px'}}>임시</td>
                                </tr>
                            )

                        })}
                        </tbody>
                    </table>
                    <div className="pagination-area" style={{padding: '10px', width: '100%', height: '30px'}}></div>
                </div>

            </div>
        </div>
    );

}

export default InquiryManage;