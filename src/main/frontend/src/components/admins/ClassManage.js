import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom';
import Pagination from '../Pagination';
import DatePicker from "react-datepicker";
import useDetectClose from '../../hooks/useDetectClose';
import ClaCateDropDown from '../dropdown/ClaCateDropDown';
import ClassIdDropDown from '../dropdown/ClassIdDropDown';

import "react-datepicker/dist/react-datepicker.css";

function ClassManage() {

    const [classList, setClassList] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        console.log("현재 페이지네이션 페이지", currentPage);
    }, [setCurrentPage]);


    useEffect(() => {
        axios.get(`/admin-home/class?page=${currentPage}`)
            .then(res => {
                setClassList(res.data.classList);
                setTotalPages(res.data.totalPages);
            })
            .catch(error => console.log("에러! :" + error))
    }, [currentPage]);



    //클래스 설정 관련 드롭다운 박스 설정
    const categoryRef = useRef();
    const [categoryIdentify, setCategoryIdentify] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [isOpenCategory, setIsOpenCategory] = useDetectClose(categoryRef, false);

    useEffect(() => {
        // 백엔드에서 카테고리 이름 목록을 가져옴
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/class-open');
                const data = response.data;
                setCategoryList(data);
                console.log('Fetched categories:', data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const classIdRef = useRef();
    const [classIdIdentify, setClassIdIdentify] = useState('아이디');
    const classIdList = ["아이디", "클래스"];
    const [isOpenClassId, setIsOpenClassId] = useDetectClose(classIdRef, false);

    const[category, setCategory] = useState('');
    const[classId, setClassId] = useState('아이디');

    const handleSelectChange = (name, value) => {
        switch(name) {
            case 'category':
                setCategory(value);
                break;
            case 'classId':
                setClassId(value);
                break;
            default:
                console.error('Invalid name:', name);
        }
        console.log(name + "의 선택값 :" + value);
    };


    //검색 입력값
    const [content, setContent] = useState('');
    useEffect(() => {
        console.log("검색 입력 : " + content);
    }, [content]);

    //날짜 기간 설정
    const [startDay, setStartDay] = useState(new Date());
    const [endDay, setEndDay] = useState(new Date());

    useEffect(() => {
        console.log("기간 시작 날짜 : " + startDay)
    }, [startDay]);

    useEffect(() => {
        console.log("기간 종료 날짜 : " + endDay)
    }, [endDay]);

    //클래스 검색 설정 후 검색
    const handleClassSubmit = async () => {
        console.log("카테고리 : " + category);
        console.log("검색값 : " + classId);
        console.log("검색내용 : " + content);
        console.log("시작일 : " + startDay);
        console.log("종료일 : " + endDay);

        try {
            const data = {
                category: category,
                classId: classId,
                searching: content,
                startDay: startDay,
                endDay: endDay
            };

            const response = await axios.post('/admin-home/class', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("문의 검색 설정 조건 요청완료");
            const {classList, totalPages} = response.data;
            setClassList(classList);
            setTotalPages(totalPages);

        } catch (error) {
            console.error("요청 오류 :" + error);
        }
    };

    //클래스 삭제 기능
    const handleClassDelete = async (classId) => {
        // 경고창을 통해 사용자에게 확인 메시지를 표시
        const confirmDelete = window.confirm("클래스를 정말 삭제하시겠습니까?");

        // 사용자가 '확인'을 눌렀을 때만 삭제 작업을 진행
        if (confirmDelete) {
            try {
                await axios.delete(`/admin-home/class_delete/${classId}`);
                console.log("클래스 삭제 완료");
                window.location.reload();
            } catch(error) {
                console.error("클래스 삭제 실패 :" + error);
            }
        } else {
            // 사용자가 '취소'를 눌렀을 때
            console.log("클래스 삭제가 취소되었습니다.");
        }
    }


    return(
        <div className="container" style={{padding: '0px'}}>
            <div className="admin-menu-area" style={{width: '100%'}}>
                <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0', fontSize: '22px', fontWeight: 'bold', color: '#808000'}}>클래스 관리</div>

                <div className="second-title" style={{marginTop: '10px', padding: '20px', width: '100%', height: '40px'}}>
                    <div style={{marginLeft: '30px', fontSize: '20px', fontWeight: 'bold', color: '#808000'}}>클래스 검색</div>
                </div>

                <div className="content-area" style={{marginTop: '10px', padding: '10px', width: '100%'}}>
                    <div className="class-search-area" style={{marginTop: '10px', width: '100%', borderBottom: '2px solid #c0c0c0'}}>
                        <div className="class-classify-area" style={{padding: '5px', display: 'flex'}}>
                            <div className="category-setting" style={{ display: 'flex'}}>
                                <div className="class-category" style={{textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>분류</div>
                                <div ref={categoryRef} style={{ position: 'relative'}}>
                                    <input
                                        onClick={() => setIsOpenCategory(!isOpenCategory)}
                                        type='button'
                                        value={categoryIdentify || '분류 ▼'}
                                        onChange={handleSelectChange}
                                        style={{cursor: 'pointer', marginLeft: '20px', width: '100px', height: '30px', backgroundColor: '#FFFFFF', border: '1px solid #dcdcdc', borderRadius: '10px'}}
                                    />

                                    {isOpenCategory &&
                                        <ul style={{ zIndex: 1, cursor: 'pointer', position: 'absolute', top: '100%', left: 0, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            {categoryList.map((value, index) => (
                                                <ClaCateDropDown
                                                    key={index}
                                                    value={value}
                                                    setCategoryIdentify={setCategoryIdentify}
                                                    setIsOpen={setIsOpenCategory}
                                                    isOpen={isOpenCategory}
                                                    handleSelectChange={handleSelectChange}
                                                />
                                            ))}
                                        </ul>
                                    }
                                </div>
                            </div>

                            <div className="text-searching" style={{marginLeft: '20px', display: 'flex'}}>
                                <div style={{textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>검색어</div>
                                <div ref={classIdRef} style={{ position: 'relative'}}>
                                    <input
                                        onClick={() => setIsOpenClassId(!isOpenClassId)}
                                        type='button'
                                        value={classIdIdentify + ' ▼'}
                                        onChange={handleSelectChange}
                                        style={{cursor: 'pointer', marginLeft: '10px', width: '100px', height: '30px', backgroundColor: '#FFFFFF', border: '1px solid #dcdcdc', borderRadius: '10px'}}
                                    />

                                    {isOpenClassId &&
                                        <ul style={{ zIndex: 1, cursor: 'pointer', position: 'absolute', top: '100%', left: 0, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                            {classIdList.map((value, index) => (
                                                <ClassIdDropDown
                                                    key={index}
                                                    value={value}
                                                    setClassIdIdentify={setClassIdIdentify}
                                                    setIsOpen={setIsOpenClassId}
                                                    isOpen={isOpenClassId}
                                                    handleSelectChange={handleSelectChange}/>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                <div>
                                    <input
                                        type='text'
                                        value={content}
                                        onChange={e => setContent(e.target.value)}
                                        style={{marginLeft: '10px', width: '200px', height: '30px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px'}}
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="class-date-area" style={{padding: '5px', display: 'flex', marginBottom: '40px'}}>
                            <div className="class-date" style={{ marginRight: '20px', textAlign: 'center', lineHeight: '30px', height: '30px', fontSize: '15px', fontWeight: 'bold', color: '#424242'}}>문의 일시</div>
                            <DatePicker selected={startDay} onChange={date => setStartDay(date)} selectsStart startDate={startDay} endDate={endDay} />
                            <div> ~ </div>
                            <DatePicker selected={endDay} onChange={date => setEndDay(date)} selectsEnd startDate={startDay} endDate={endDay} minDate={startDay} />
                            <button style={{marginLeft: '10px', width: '60px', color: '#FFFFFF', height: '30px', backgroundColor: '#cd5c5c', border: '2px solid #e9967a', borderRadius: '10px'}} onClick={handleClassSubmit} >검색</button>
                        </div>
                    </div>

                    {classList.length === 0 ? (
                        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '16px' }}>클래스를 검색하세요!</div>
                    ) : (
                    <table className="inquiry-area" style={{width: '100%', borderBottom: '1px solid #000000'}}>
                        <thead style={{padding: '10px', width: '100%'}}>
                        <tr className="column-title-area" >
                            <th className="member-title" style={{marginLeft: '10px', flex: '2', color: '#424242', fontSize: '14px'}}>아이디</th>
                            <th className="category-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>호스트</th>
                            <th className="writer-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>클래스명</th>
                            <th className="writer-title" style={{marginLeft: '10px',flex: '1', color: '#424242', fontSize: '14px'}}>카테고리</th>
                            <th className="content-title" style={{marginLeft: '10px',flex: '2', color: '#424242', fontSize: '14px'}}>예약수</th>
                            <th className="content-title" style={{marginLeft: '10px',flex: '1', color: '#424242', fontSize: '14px'}}>삭제</th>
                        </tr>
                        </thead>

                        <tbody>
                        {classList.map((classes, idx) => {
                            return (
                                <tr key={classes.id}>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{classes.managerEmail}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{classes.managerName}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>
                                        <Link to={`/class-reservation/${classes.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                            {classes.className}
                                        </Link>
                                    </td>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{classes.categoryName}</td>
                                    <td style={{flex: '2', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>{classes.reserveCount}</td>
                                    <td style={{flex: '1', color: '#424242', fontSize: '14px', borderTop: '1px solid #D8D8D8', textAlign: 'center'}}>
                                        <button style={{marginLeft: '10px', fontSize: '10px', width: '60px', color: '#cd5c5c', height: '20px', backgroundColor: '#FFFFFF', border: '2px solid #e9967a', borderRadius: '10px'}} onClick={() => handleClassDelete(classes.id)} >삭제</button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    )}
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

export default ClassManage;