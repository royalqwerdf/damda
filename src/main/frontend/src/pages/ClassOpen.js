import { useRef, useEffect, useState } from 'react';
import '../styles/manageClass.css';
import useDetectClose from '../hooks/useDetectClose';
import {LevelDropDown} from "../components/dropdown/LevelDropDown";
import {CategoryDropDown} from "../components/dropdown/CategoryDropDown";
import {LongtimeDropDown} from "../components/dropdown/LongtimeDropDown";
import ClassScheduleForm from '../components/ClassScheduleForm';
import { v4 as uuidv4 } from 'uuid';
import PopupDom from '../components/PopupDom';
import PopupPostCode from '../components/PopupPostCode';

import 'bootstrap/dist/js/bootstrap.bundle';

const ClassOpen = () => {

    //입력값 관리
    const [classname, setClassname] = useState('');
    useEffect(() => { //입력내용 확인용
        console.log('클래스 이름 입력:', classname);
    }, [classname]);

    const [classExplanation, setClassExplanation] = useState('');

    const [detailaddress, setDetailaddress] = useState('');
    useEffect(() => { //입력내용 확인용
        console.log('상세주소 입력:', detailaddress);
    }, [detailaddress]);

    const [curriculum, setCurriculum] = useState('');
    useEffect(() => {
        console.log('커리큘럼 입력:', curriculum);
    }, [curriculum]);



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

    //클래스 일정 등록 폼들을 저장할 리스트
    const [formList, setFormList] = useState([]);


    //클래스 일정 등록 동적 생성
    const [formFields, setFormFields] = useState([]);

        const handleAddFields = () => {
            const newField = { id: uuidv4(), start: '', end: '', count: '' };
            setFormList(prevList => [...prevList, newField]); // formList 상태를 업데이트
            setFormFields(prevFields => [...prevFields, newField]); // formFields 상태를 업데이트
            console.log("이건가?" + formList.map(item => `start: ${item.start}, end: ${item.end}, count: ${item.count}`).join(', '));
        };


        const handleRemoveFields = (index) => {
            setFormFields(prevState => {
                const updatedFields = prevState.filter((_, i) => i !== index);
                // 인덱스 재조정
                const updatedFormList = updatedFields.map((field, idx) => ({ ...field, index: idx }));
                // formList 업데이트
                setFormList(updatedFormList);
                console.log("삭제됐나?" + formList.map(item => `start: ${item.start}, end: ${item.end}, count: ${item.count}`).join(', '));
                return updatedFields;
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(formList);
    };

    const handleFieldChange = (index, fieldName, value) => {
            // 해당 인덱스의 폼에 대한 값 변경
            const updatedFormFields = [...formFields];
            updatedFormFields[index][fieldName] = value;
            setFormFields(updatedFormFields);

            // 전체 폼 리스트 업데이트
            const updatedFormList = [...formList];
            updatedFormList[index][fieldName] = value;
            setFormList(updatedFormList);

    };

    //주소 검색 관련 코드
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    //주소 검색 팝업창 열기 함수
    const openPostCode = () => {
        setIsPopupOpen(true)
    }

    //주소 검색 팝업창 닫기 함수
    const closePostCode = () => {
        setIsPopupOpen(false)
    }

    //주소 검색 결과 주소 얻어오기 위한 부분
    const [fullAddress, setFullAddress] = useState('');

    const handleAddressSearch = (address) => {
        setFullAddress(address);
    }



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
                                        <input className="form-control"
                                        name="classname"
                                        type="text"
                                        required
                                        value={classname}
                                        onChange={e => setClassname(e.target.value)}
                                        placeholder="클래스 이름을 입력하세요" />
                                    </div>
                                </form>
                            </div>

                            <div className="class-explain-input-area">
                                 <div className="class-explain" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            클래스 설명
                                 </div>
                                 <form className="class-explain-input-group" method="get" action="/">
                                       <div className="explain-group">
                                            <input className="form-control"
                                                   name="classexplain"
                                                   type="text"
                                                   required
                                                   value={classExplanation}
                                                   onChange={e => setClassExplanation(e.target.value)}
                                                   placeholder="클래스 설명을 적어주세요"
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
                                        <div className="schedule-classify" style={{ width: '100%', height: '30px' }}>
                                            <div className="start-time-top" style={{ fontWeight: 'bold'}}>수업 시작 시간</div>
                                            <div className="end-time-top" style={{ fontWeight: 'bold'}}>수업 종료 시간</div>
                                            <div className="headcount-max-top" style={{ fontWeight: 'bold'}}>최대 수강 인원</div>
                                            <div className="schedule-delete-top" style={{ fontWeight: 'bold' }}>삭제</div>
                                        </div>
                                        <form className="detail-setting-zone" onSubmit={handleSubmit} style={{marginRight: '10px', width: '100%' }}>
                                            {formFields.map((field, index) => (
                                                <ClassScheduleForm
                                                    key={index}
                                                    index={index}
                                                    handleRemoveFields={handleRemoveFields}
                                                    handleFieldChange={handleFieldChange}
                                                />
                                            ))}

                                        </form>
                                        <div className="schedule-add-button-zone" style={{ width: '100%', height: '40px' }}>
                                            <button className="schedule-add-btn"
                                                    type="button"
                                                    onClick={() => handleAddFields()}
                                                    style={{ width: '30%', height: '40px', color: '#FFFFFF', backgroundColor: '#cd5c5c', border: '2px solid #e9967a', borderRadius: '10px', marginTop: '20px'}}>
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
                                            <div className="address-search-zone" style={{height: '50px' }}>
                                                <div className="address-name" style={{ fontWeight: 'bold' }}>주  소</div>
                                                <form className="class-address-search-group" method="get" action="/">
                                                    <div className="input-group">
                                                        <input className="form-control"
                                                               name="address"
                                                               value={fullAddress}
                                                               placeholder="주소를 검색하세요"
                                                               readOnly // 사용자의 직접 입력 금지
                                                        />
                                                    </div>
                                                </form>
                                                <button className="address-search-button"
                                                        type="button"
                                                        onClick={openPostCode}
                                                        style={{fontWeight: 'bold', color: '#FFFFFF', height: '40px', backgroundColor: '#c0c0c0', border: '2px solid #808080', borderRadius: '10px', marginLeft: '20px' }}>
                                                        주소찾기
                                                </button>
                                                <div id='popupDom'>
                                                    {isPopupOpen && (
                                                        <PopupDom>
                                                            <PopupPostCode onClose={closePostCode} onSaveAddress={handleAddressSearch}/>
                                                        </PopupDom>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="detail-address-input-zone">
                                                <form className="detail-address-input-group" method="get" action="/">
                                                    <div className="input-group">
                                                        <input className="form-control"
                                                               name="detailaddress"
                                                               type="text"
                                                               required
                                                               value={detailaddress}
                                                               onChange={e => setDetailaddress(e.target.value)}
                                                               placeholder="상세 주소를 검색하세요"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                            </div>

                            <div className="curriculum-input-area" style={{ width: '100%', marginTop: '50px' }}>
                                <div className="curriculum-name" style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '70px' }}>커리큘럼</div>
                                <div className="curriculum-input" style={{width: '100%', height: '400px' }}>
                                    <form className="class-curriculum-input-group" method="get" action="/">
                                        <div className="input-group">
                                            <textarea className="cur-form-control"
                                                   name="curriculum"
                                                   value={curriculum}
                                                   rows="10"
                                                   cols="40"
                                                   onChange={e => setCurriculum(e.target.value)}
                                                   placeholder="상세한 커리큘럼을 입력하세요"
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