import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom';
import Pagination from '../Pagination';
import DatePicker from "react-datepicker";
import useDetectClose from '../../hooks/useDetectClose';
import InquiryDropDown from '../dropdown/InquiryDropDown';
import UserIdDropDown from '../dropdown/UserIdDropDown';

import "react-datepicker/dist/react-datepicker.css";

function InquiryManage() {

    const [showDetail, setShowDetail] = useState(false);
    const [selectedInquiryId, setSelectedInquiryId] = useState(null);
    const handleButtonClick = (inquiryId) => {
        // 버튼 클릭 시 InquiryDetail을 export하도록 설정
        setSelectedInquiryId(inquiryId);
        setShowDetail(true);
    };

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


    //회원 설정 드롭다운 박스 설정
    const inquiryRef = useRef();
    const [inquiryIdentify, setInquiryIdentify] = useState('');
    const classifyList = ["클래스", "수강", "예약", "결제/환불", "이벤트", "기타"];
    const [isOpenInquiry, setIsOpenInquiry] = useDetectClose(inquiryRef, false);

    const userIdRef = useRef();
    const [userIdIdentify, setUserIdIdentify] = useState('아이디');
    const userIdList = ["아이디", "제목"];
    const [isOpenUserId, setIsOpenUserId] = useDetectClose(userIdRef, false);

    const[classify, setClassify] = useState('');
    const[userId, setUserId] = useState('아이디');

    const handleSelectChange = (name, value) => {
        switch(name) {
            case 'classify':
                setClassify(value);
                break;
            case 'userId':
                setUserId(value);
                break;
            default:
                console.error('Invalid name:', name);
        }
        console.log(name + "의 선택값 :" + value);
    };

    //라디오박스 설정
    const [selectedUser, setSelectedUser] = useState("전체");
    const users = ["전체", "일반", "호스트"];

    const handleRadioBoxChange = (user) => {
        setSelectedUser(user);
        console.log("라디오박스 선택 : " + user);
    };

    //검색 입력값
    const [searchContent, setSearchContent] = useState('');
    useEffect(() => {
        console.log("검색 입력 : " + searchContent);
    }, [searchContent]);

    //날짜 기간 설정
    const [startDay, setStartDay] = useState(new Date());
    const [endDay, setEndDay] = useState(new Date());

    useEffect(() => {
        console.log("기간 시작 날짜 : " + startDay)
    }, [startDay]);

    useEffect(() => {
        console.log("기간 종료 날짜 : " + endDay)
    }, [endDay]);


    //문의 검색조건 설정 후 해당하는 데이터만 불러오기
    const handleInquirySubmit = async () => {
        console.log("분류 : " + classify);
        console.log("검색값 : " + userId);
        console.log("작성자 분류 : " + selectedUser);
        console.log("검색내용 : " + searchContent);
        console.log("시작일 : " + startDay);
        console.log("종료일 : " + endDay);

        try {
            const data = {
                classify: classify,
                userId: userId,
                selectedUser: selectedUser,
                searchContent: searchContent,
                startDay: startDay,
                endDay: endDay
            };

            const response = await axios.post('/admin-home', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("문의 검색 설정 조건 요청완료");
            const {inquiryList, totalPages} = response.data;
            setInquiryList(inquiryList);
            setTotalPages(totalPages);

        } catch (error) {
            console.error("요청 오류 :" + error);
        }
    };

    return (
    <div>
        {showDetail ? (
            <InquiryDetail inquiryId={selectedInquiryId}/>
        ):(

        <div className="container" style={{padding: '0px'}}>
            <div className="admin-menu-area" style={{width: '100%'}}>
                <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0', fontSize: '22px', fontWeight: 'bold', color: '#808000'}}>문의 관리</div>

                <div className="second-title" style={{marginTop: '10px', padding: '20px', width: '100%', height: '40px'}}>
                    <div style={{marginLeft: '30px', fontSize: '20px', fontWeight: 'bold', color: '#808000'}}>문의 검색</div>
                </div>

                <div className="content-area" style={{marginTop: '10px', padding: '10px', width: '100%'}}>
                    <div className="inquiry-search-area" style={{marginTop: '10px', width: '100%', borderBottom: '2px solid #c0c0c0'}}>


                        <div className="inquiry-category-area" style={{padding: '5px', display: 'flex'}}>
                            <div className="inquiry-category" style={{textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>분류</div>
                            <div ref={inquiryRef} style={{ position: 'relative'}} className="dropdown-inquiry-category">
                                <input
                                    onClick={() => setIsOpenInquiry(!isOpenInquiry)}
                                    type='button'
                                    value={inquiryIdentify || '분류 ▼'}
                                    onChange={handleSelectChange}
                                    style={{cursor: 'pointer', marginLeft: '20px', width: '100px', height: '30px', backgroundColor: '#FFFFFF', border: '1px solid #dcdcdc', borderRadius: '10px'}}
                                />

                                {isOpenInquiry &&
                                    <ul style={{ zIndex: 1, cursor: 'pointer', position: 'absolute', top: '100%', left: 0, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                        {classifyList.map((value, index) => (
                                            <InquiryDropDown
                                                key={index}
                                                value={value}
                                                setInquiryIdentify={setInquiryIdentify}
                                                setIsOpen={setIsOpenInquiry}
                                                isOpen={isOpenInquiry}
                                                handleSelectChange={handleSelectChange}
                                            />
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>


                        <div className="member-classify-area" style={{padding: '5px', display: 'flex'}}>
                            <div className="classify-setting" style={{ display: 'flex'}} >
                                <div className="member-classify" style={{textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>회원 구분</div>
                                <div style={{ textAlign: 'center', lineHeight: '30px', marginLeft: '10px', display: 'flex', flexDirection: 'row' }}>
                                    {users.map((user, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                name="selectedUser"
                                                id={user}
                                                value={user}
                                                checked={selectedUser.includes(user)}
                                                onChange={() => handleRadioBoxChange(user)}
                                            />
                                            <label htmlFor={user}>{user}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="text-searching" style={{marginLeft: '20px', display: 'flex'}}>
                                <div style={{textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>검색어</div>
                                <div ref={userIdRef} style={{ position: 'relative'}}>
                                    <input
                                        onClick={() => setIsOpenUserId(!isOpenUserId)}
                                        type='button'
                                        value={userIdIdentify + ' ▼'}
                                        onChange={handleSelectChange}
                                        style={{cursor: 'pointer', marginLeft: '10px', width: '100px', height: '30px', backgroundColor: '#FFFFFF', border: '1px solid #dcdcdc', borderRadius: '10px'}}
                                    />

                                    {isOpenUserId &&
                                        <ul style={{ zIndex: 1, cursor: 'pointer', position: 'absolute', top: '100%', left: 0, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            {userIdList.map((value, index) => (
                                                <UserIdDropDown
                                                    key={index}
                                                    value={value}
                                                    setUserIdIdentify={setUserIdIdentify}
                                                    setIsOpen={setIsOpenUserId}
                                                    isOpen={isOpenUserId}
                                                    handleSelectChange={handleSelectChange}/>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                <div>
                                    <input
                                        type='text'
                                        value={searchContent}
                                        onChange={e => setSearchContent(e.target.value)}
                                        style={{marginLeft: '10px', width: '200px', height: '30px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px'}}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="inquiry-date-area" style={{padding: '5px', display: 'flex', marginBottom: '40px'}}>
                            <div className="inquiry-date" style={{ marginRight: '20px', textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>문의 일시</div>
                            <DatePicker selected={startDay} onChange={date => setStartDay(date)} selectsStart startDate={startDay} endDate={endDay} />
                            <div> ~ </div>
                            <DatePicker selected={endDay} onChange={date => setEndDay(date)} selectsEnd startDate={startDay} endDate={endDay} minDate={startDay} />
                            <button style={{marginLeft: '10px', width: '60px', color: '#FFFFFF', height: '30px', backgroundColor: '#cd5c5c', border: '2px solid #e9967a', borderRadius: '10px'}} onClick={handleInquirySubmit}>검색</button>
                        </div>
                    </div>

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
                        {inquiryList.length > 0 && inquiryList.map((inquiry, idx) => {
                            return (
                                <tr key={inquiry.id}>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.type}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.user_role}</td>
                                    <td style={{ cursor: 'pointer', flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}} onClick={() => handleButtonClick(inquiry.id)}>{inquiry.title}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.userEmail}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.createdAt}</td>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{inquiry.comment_yn}</td>
                                </tr>
                            );
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

    )}
    </div>
    );
}

function InquiryDetail({inquiryId}) {

    const [inquiryItem, setInquiryItem] = useState({});

    useEffect(() => {
        axios.get(`/admin-home/inquiry/${inquiryId}`)
            .then(res => {
                setInquiryItem(res.data);

            })
            .catch(error => console.log("에러! :" + error))
    }, []);

    const [adminReply, setAdminReply] = useState('');
    useEffect(() => { //입력내용 확인용
        console.log('클래스 이름 입력:', adminReply);
    }, [adminReply]);

    const handleReply = async () => {
        console.log("답변 입력 내용 : " + adminReply);
        try {
            const data = { reply: adminReply };

            const response = await axios.put(`/admin-home/inquiry/${inquiryId}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload();
            console.log("답변 저장 완료");
        } catch (error) {
            console.error("답변 저장 오류 :" + error);
        }
    }


    return(
        <div className="container" style={{padding: '0px'}}>
            <div className="admin-menu-area" style={{width: '100%'}}>
                <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0', fontSize: '22px', fontWeight: 'bold', color: '#808000'}}>문의내용</div>

                <div className="second-title" style={{marginTop: '10px', padding: '20px', width: '100%', height: '40px'}}>
                    <div style={{marginLeft: '30px', fontSize: '20px', fontWeight: 'bold', color: '#808000'}}>문의</div>
                </div>

                <div className="content-area" style={{marginTop: '30px',padding: '10px', width: '100%'}}>
                    <div style={{display: 'flex'}}>
                        <div style={{marginLeft: '20px', fontWeight: 'bold', color: '#424242', padding: '10px', width: '10%', border: '1px solid #c0c0c0'}}>제목</div>
                        <div style={{fontWeight: 'bold', color: '#424242', padding: '10px', width: '90%', border: '1px solid #c0c0c0'}}>{inquiryItem.title}</div>
                    </div>
                    <div style={{marginLeft: '20px', marginTop: '5px', height: '200px', padding: '20px', border: '1px solid #c0c0c0'}}>
                        {inquiryItem.content}
                    </div>
                    <div style={{display : 'flex', marginLeft: '20px', marginTop: '5px', height: '50px', padding: '10px', border: '1px solid #c0c0c0'}}>
                        <div style={{marginLeft: '10px'}}>RE.</div>
                        <div style={{marginLeft: '10px'}}>{inquiryItem.reply}</div>
                    </div>
                    <div className="input-area" style={{marginLeft: '20px', marginTop: '10px', display: 'flex'}}>
                        <div style={{fontSize: '14px', textAlign: 'center', fontWeight: 'bold', color: '#424242', padding: '5px', width: '90px', border: '1px solid #c0c0c0'}}>답변 작성</div>
                        <div>
                            <input
                                type="text"
                                value={adminReply}
                                placeholder="답글을 작성하세요"
                                onChange={e => setAdminReply(e.target.value)}
                                style={{fontWeight: 'bold', color: '#424242', height: '30px' , width: '300px', border: '1px solid #c0c0c0'}}
                            />
                        </div>
                        <button style={{marginTop: '5px', width: '60px', color: '#FFFFFF', height: '30px', backgroundColor: '#cd5c5c', border: '2px solid #e9967a', borderRadius: '10px'}} onClick={handleReply}>등록</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InquiryManage;