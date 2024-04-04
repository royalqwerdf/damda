import { useRef, useEffect, useState } from 'react';
import '../manageClass.css';
import useDetectClose from '../hooks/useDetectClose';
import {LevelDropDown} from "../components/LevelDropDown";
import {CategoryDropDown} from "../components/CategoryDropDown";
import {LongtimeDropDown} from "../components/LongtimeDropDown";

//import 'bootstrap/dist/js/bootstrap.bundle';

const ClassOpen = () => {
    //난이도 드롭다운 박스 설정
    const dropDownRef = useRef();
    const [levelIdentify, setLevelIdentify] = useState('');
    const levelList = ['초급', '중급', '고급']
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

    //카테고리 드롭다운 박스 설정
    const categoryRef = useRef();
    const [categoryIdentify, setCategoryIdentify] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [isOpenCategory, setIsOpenCategory] = useDetectClose(categoryRef, false);

    //쇼요시간 드롭다운 박스 설정
    const longtimeRef = useRef();
    const [longtimeIdentify, setLongtimeIdentify] = useState('');
    const longtimeList = ['1시간', '1시간 30분', '2시간']
    const [isOpenLongtime, setIsOpenLongtime] = useDetectClose(longtimeRef, false);

    useEffect(() => {
        //백엔드에서 카테고리 이름 목록을 가져옴
        const fetchCategories = async() => {
            try {
                const response = await fetch('/classes');
                const data = await response.json();
                setCategoryList(data);
                console.log('Fetched categories:', data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);


    return (
        <div className="class-open-page" style={{ height: "2048px" }}>
                    <div className="class-information-input-area">
                        <div className="input-area">
                            <div className="class-registration" style={{ fontFamily: "arial", fontWeight: "bold", fontSize: "28px" }}>
                                Class 등록
                            </div>

                            <div className="class-name-input-area">
                                <div className="class-name" style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    클래스 명
                                </div>
                                <form className="class-name-input-group" method="get" action="">
                                    <div className="input-group">
                                        <input className="form-control" name="classname" placeholder="클래스 이름을 입력하세요" />
                                    </div>
                                </form>
                            </div>

                            <div className="class-explain-input-area">
                                 <div className="class-explain" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            클래스 설명
                                 </div>
                                 <form className="class-explain-input-group" method="get" action="/frontend/public">
                                       <div className="explain-group">
                                            <input className="form-control"
                                                   name="classexplain"
                                                   placeholder="클래스 설명을 적어주세요"
                                                   value={"" /* 여기에 클라이언트 상태로부터 값을 가져와야 함 */}
                                            />
                                       </div>
                                 </form>
                            </div>

                            <div className="class-detail-information-area" style={{ width: '100%', height: '200px' }}>
                                        <div className="level-area" style={{ height: '100%', width: '33.3%' }}>
                                            <div className="class-level" style={{ height: '50px', fontSize: '16px', fontWeight: 'bold' }}>클래스 난이도</div>
                                            <div className="level-select-box" style={{ height: '80px', marginTop: '30px' }}>

                                                <div ref={dropDownRef} style={{ position: 'relative', zIndex: 1}}>
                                                    <input
                                                        onClick={() => setIsOpen(!isOpen)}
                                                        type='button'
                                                        value={levelIdentify || '난이도'}
                                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                                                    />

                                                    {isOpen &&
                                                        <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                            {levelList.map((value, index) => (
                                                                <LevelDropDown key={index} value={value} setIsOpen={setIsOpen} setLevelIdentify={setLevelIdentify} isOpen={isOpen}/>
                                                            ))}
                                                        </ul>
                                                    }

                                                </div>

                                            </div>
                                        </div>
                                        <div className="category-area" style={{ height: '100%', width: '33.3%' }}>
                                            <div className="class-category" style={{ height: '50px', fontSize: '16px', fontWeight: 'bold' }}>카테고리</div>
                                            <div className="category-select-box" style={{ height: '80px', marginTop: '30px' }}>

                                                <div ref={categoryRef} style={{ position: 'relative', zIndex: 1}}>
                                                    <input
                                                        onClick={() => setIsOpenCategory(!isOpenCategory)}
                                                        type='button'
                                                        value={categoryIdentify || '카테고리'}
                                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                                                    />

                                                    {isOpenCategory && (
                                                        <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                            {categoryList.map((value, index) => (
                                                                <CategoryDropDown key={index} value={value} setCategoryIdentify={setCategoryIdentify} setIsOpen={setIsOpenCategory} isOpen={isOpenCategory}/>
                                                            ))}
                                                        </ul>
                                                    )}

                                                </div>

                                            </div>
                                        </div>
                                        <div className="longtime-area" style={{ height: '100%', width: '33.3%' }}>
                                            <div className="class-longtime" style={{ height: '50px', fontSize: '16px', fontWeight: 'bold' }}>소요시간</div>
                                            <div className="longtime-select-box" style={{ height: '80px', marginTop: '30px' }}>

                                                <div ref={longtimeRef} style={{ position: 'relative', zIndex: 1}}>
                                                    <input
                                                        onClick={() => setIsOpenLongtime(!isOpenLongtime)}
                                                        type='button'
                                                        value={longtimeIdentify || '시간'}
                                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                                                    />

                                                    {isOpenLongtime && (
                                                        <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                            {longtimeList.map((value, index) => (
                                                                <LongtimeDropDown key={index} value={value} setLongtimeIdentify={setLongtimeIdentify} setIsOpen={setIsOpenLongtime} isOpen={isOpenLongtime}/>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                            </div>


                            <div className="class-schedule-setting-area" style={{ width: '100%', marginTop: '20px' }}>
                                        <div className="class-schedule-setting" style={{ width: '100%', height: '30px', fontSize: '18px', fontWeight: 'bold', marginLeft: '80px' }}>
                                            클래스 일정 등록
                                        </div>
                                        <div className="detail-setting-zone" style={{ width: '100%' }}>
                                            <div className="schedule-group" style={{ width: '100%', height: '150px' }}>
                                                <div className="class-start-time-space">
                                                    <div className="start-time-top" style={{ fontWeight: 'bold', marginLeft: '20px' }}>수업 시작 시간</div>
                                                    <div className="start-time-bottom" style={{ marginTop: '10px', padding: '15px' }}>
                                                        <button className="btn btn-light lh-1 p-0 px-2 dropdown-toggle"
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}>
                                                            <span className="level-drop-button" style={{ color: '#696969' }}>시작 시간 설정</span>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <button className="dropdown-item d-flex align-items-center gap-2"
                                                                        onClick={() => console.log("오전 09:00 선택")}
                                                                        style={{ width: '100%' }}>
                                                                    오전 09:00
                                                                </button>
                                                            </li>
                                                            {/* 다른 시작 시간 항목들 추가 */}
                                                            <li>
                                                                <button className="dropdown-item d-flex align-items-center gap-2"
                                                                        onClick={() => console.log("오전 10:00 선택")}
                                                                        style={{ width: '100%' }}>
                                                                    오전 10:00
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="class-end-time-space">
                                                    <div className="end-time-top" style={{ fontWeight: 'bold', marginLeft: '20px' }}>수업 종료 시간</div>
                                                    <div className="end-time-bottom" style={{ marginTop: '10px', padding: '15px' }}>
                                                        <button className="btn btn-light lh-1 p-0 px-2 dropdown-toggle"
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}>
                                                            <span className="level-drop-button" style={{ color: '#696969' }}>종료 시간 설정</span>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <button className="dropdown-item d-flex align-items-center gap-2"
                                                                        onClick={() => console.log("오전 10:00 선택")}
                                                                        style={{ width: '100%' }}>
                                                                    오전 10:00
                                                                </button>
                                                            </li>
                                                            {/* 다른 종료 시간 항목들 추가 */}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="class-headcount-max-space">
                                                    <div className="headcount-max-top" style={{ fontWeight: 'bold', marginLeft: '20px' }}>최대 수강 인원</div>
                                                    <div className="headcount-max-bottom" style={{ marginTop: '10px', padding: '15px' }}>
                                                        <button className="btn btn-light lh-1 p-0 px-2 dropdown-toggle"
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                                style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}>
                                                            <span className="level-drop-button" style={{ color: '#696969' }}>인원수 설정</span>
                                                        </button>
                                                        <ul className="dropdown-menu dropdown-menu-end">
                                                            <li>
                                                                <button className="dropdown-item d-flex align-items-center gap-2"
                                                                        onClick={() => console.log("1명 선택")}
                                                                        style={{ width: '100%' }}>
                                                                    1명
                                                                </button>
                                                            </li>
                                                            {/* 다른 인원수 항목들 추가 */}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="class-schedule-delete-space">
                                                    <div className="schedule-delete-top" style={{ fontWeight: 'bold', marginLeft: '40px' }}>삭제</div>
                                                    <div className="schedule-delete-bottom" style={{ marginTop: '10px', padding: '15px' }}>
                                                        <button className="class-schedule-delete-btn"
                                                                type="button"
                                                                style={{ width: '100%', height: '40px', color: '#cd5c5c', backgroundColor: '#FFFFFF', border: '2px solid #e9967a', borderRadius: '10px' }}>
                                                            삭제
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="schedule-add-button-zone" style={{ width: '100%', height: '40px' }}>
                                            <button className="schedule-add-btn"
                                                    type="button"
                                                    style={{ width: '30%', height: '40px', color: '#FFFFFF', backgroundColor: '#cd5c5c', border: '2px solid #e9967a', borderRadius: '10px' }}>
                                                클래스 일정 추가
                                            </button>
                                        </div>
                            </div>

                            <div className="class-open-date-info-area" style={{ width: '100%', marginTop: '50px' }}>
                                        <div className="class-open-info" style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '80px' }}>운영 정보</div>
                                        <div className="close-date-setting-space" style={{ padding: '30px' }}>
                                            <div className="close-setting" style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '60px' }}>휴무일 지정</div>
                                            <button className="schedule-add-btn"
                                                    type="button"
                                                    style={{ width: '200px', height: '30px', backgroundColor: '#c0c0c0', border: '2px solid #808080', borderRadius: '10px', marginLeft: '20px' }}>
                                                캘린더
                                            </button>
                                        </div>
                            </div>

                            <div className="class-shop-address-area" style={{ marginTop: '50px' }}>
                                            <div className="address-search-zone" style={{ marginLeft: '50px', height: '50px' }}>
                                                <div className="adress-name" style={{ fontWeight: 'bold' }}>주  소</div>
                                                <form className="class-address-search-group" method="get" action="/frontend/public">
                                                    <div className="input-group">
                                                        <input className="form-control"
                                                               name="address"
                                                               placeholder="주소를 검색하세요"
                                                               value={"" /* 여기에 클라이언트 상태로부터 값을 가져와야 함 */}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="detail-address-input-zone">
                                                <form className="detail-address-input-group" method="get" action="/frontend/public">
                                                    <div className="input-group">
                                                        <input className="form-control"
                                                               name="detailaddress"
                                                               placeholder="상세 주소를 검색하세요"
                                                               value={"" /* 여기에 클라이언트 상태로부터 값을 가져와야 함 */}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                            </div>

                            <div className="curriculum-input-area" style={{ width: '100%', marginTop: '50px' }}>
                                <div className="curriculum-name" style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '70px' }}>커리큘럼</div>
                                <div className="curriculum-input" style={{ padding: '30px', width: '100%', height: '400px' }}>
                                    <form className="class-curriculum-input-group" method="get" action="/frontend/public">
                                        <div className="input-group">
                                            <input className="form-control"
                                                   name="curriculum"
                                                   placeholder="상세한 커리큘럼을 입력하세요"
                                                   value={"" /* 여기에 클라이언트 상태로부터 값을 가져와야 함 */}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
    );
};

export default ClassOpen;