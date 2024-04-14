import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom';
import Pagination from '../Pagination';

function InquiryManage() {

    const [inquiryList, setInquiryList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        console.log("현재 페이지네이션 페이지", currentPage);
    }, [setCurrentPage]);

    useEffect(() => {
        axios.get(`/admin-home?page=${currentPage}`)
            .then(res => {
                setInquiryList(res.data.inquiryList);
                setTotalPages(res.data.totalPages);
            })
            .catch(error => console.log("에러! :" + error))
    }, [currentPage]);

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
                            <th className="category-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>회원</th>
                            <th className="writer-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>제목</th>
                            <th className="writer-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>아이디</th>
                            <th className="content-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>작성일시</th>
                            <th className="content-title" style={{marginLeft: '10px',flex: '1', color: '#424242', fontSize: '14px'}}>답변</th>
                        </tr>
                        </thead>

                        <tbody>
                        {inquiryList.map((inquiry, idx) => {

                            return(

                                <tr key={inquiry.id}>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.type}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.memberRole}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.title}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.emailId}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.createdAt}</td>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.comment_yn}</td>
                                </tr>
                            )

                        })}
                        </tbody>
                    </table>
                    <div style={{padding: '10px', display: 'flex', justifyContent: 'center'}}>
                        <div style={{marginRight: '10px'}}>{'<<'}</div>
                        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                        <div style={{marginLeft: '10px'}}>{'>>'}</div>
                    </div>
                </div>

            </div>
        </div>
    );

}

export default InquiryManage;