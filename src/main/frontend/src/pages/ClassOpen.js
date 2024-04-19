import React, { useRef, useEffect, useState } from 'react';
import '../styles/manageClass.css';
import useDetectClose from '../hooks/useDetectClose';
import {LevelDropDown} from "../components/dropdown/LevelDropDown";
import {CategoryDropDown} from "../components/dropdown/CategoryDropDown";
import {LongtimeDropDown} from "../components/dropdown/LongtimeDropDown";
import ClassScheduleForm from '../components/ClassScheduleForm';
import PopupDom from '../components/PopupDom';
import PopupPostCode from '../components/PopupPostCode';
import useUploadImage from '../hooks/useUploadImage';
import axios from 'axios';
import DatePicker from "react-datepicker";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

import "react-datepicker/dist/react-datepicker.css";
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

    const [price, setPrice] = useState('');
    useEffect(() => {
        console.log('가격 입력:', price);
    }, [price]);

    const [level, setLevel] = useState('');
    const [category, setCategory] = useState('');
    const [longtime, setLongtime] = useState('');

    const handleSelectChange = (name, value) => {
        switch(name) {
            case 'level':
                setLevel(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'longtime':
                setLongtime(value);
                break;
            default:
                console.error('Invalid name:', name);
        }
         console.log(name + "의 선택값 :" + value);
    };


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



    //클래스 일정 등록 동적 생성
    const [formFields, setFormFields] = useState([]);

    useEffect(() => {
        console.log("formFields:", formFields);
    }, [formFields]);

        const handleAddFields = () => {
            const newField = { start: '', end: '', count: '' };
            setFormFields(prevFields => [...prevFields, newField]); // formFields 상태를 업데이트
        };

        const handleFieldChange = (index, fieldName, value) => {
            const updatedFormFields = [...formFields];
            updatedFormFields[index][fieldName] = value;
            setFormFields(updatedFormFields);
        };


        const handleRemoveFields = (index) => {
            setFormFields(prevFormFields => prevFormFields.filter((_, i) => i !== index));
            console.log("동적생성폼 삭제:", formFields);
        };


        const handleSubmit = (e) => {
            e.preventDefault();
    };

    //날짜 기간 설정 관련
    const [startDate, setStartDate] = useState(new Date());
    const [lastDate, setLastDate] = useState(new Date());

    useEffect(() => {
        console.log("시작 날짜 선택", startDate);
    }, [startDate]);

    //요일 체크박스
    const [selectedWeekdays, setSelectedWeekdays] = useState([]);

    const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

    const handleCheckboxChange = (weekday) => {
      if (selectedWeekdays.includes(weekday)) {
        setSelectedWeekdays(selectedWeekdays.filter(day => day !== weekday));
      } else {
        setSelectedWeekdays([...selectedWeekdays, weekday]);
      }
    };

    useEffect(() => {
        console.log("체크박스 선택 목록", selectedWeekdays);
    }, [selectedWeekdays]);


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

    useEffect(() => {
        console.log("진짜 풀 주소: " + fullAddress + " " + detailaddress);
    }, [detailaddress]);


    //이미지 업로드 함수
    const uploadedUrls = [];
    const [imageFiles, setImageFiles] = useState([]);
    const [lastIdx, setLastIdx] = useState(0);

    const uploadImage = useUploadImage(); // 이미지 업로드 훅 사용

    const onUpload = async () => {

        try {
                if (lastIdx === 0) {
                    // 이미지 파일이 없는 경우
                    alert("이미지를 업로드하지 않았습니다.")
                    return;
                }

                for (let i = 0; i < lastIdx; i++) {
                    if (imageFiles[i] != null) {
                        console.log("원본 이미지:", imageFiles[i]);
                        const downloadUrl = await uploadImage(imageFiles[i]);
                        console.log("업로드된 이미지의 다운로드 URL:", downloadUrl);
                        uploadedUrls.push(downloadUrl);
                        console.log("URL모음 배열:", uploadedUrls);
                        setImageFiles[i] = null;
                    }
                }

                console.log("All files uploaded successfully");
            } catch (error) {
                console.error("Error uploading files:", error);
            }
    };


    const onChange = (e) => {
        const files = e.target.files;
        if (!files) return null;
        const selectedFiles = Array.from(files).slice(0, 5 - imageFiles.length);
        if(selectedFiles.length === 0) {
            alert("파일은 5개까지 첨부 가능합니다.")
            return;
        }

        setImageFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        setLastIdx(prevLastIdx => prevLastIdx + 1);
        console.log("Selected Image Files:", imageFiles);
        console.log("인덱스:", lastIdx);
    };

    const removeImage = (indexToRemove) => {
        setImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
        console.log("delete after Image Files:", imageFiles);
    };

    //로그인 시에만 등록 기능을 이용할 수 있게 제한
    const navigate = useNavigate();
    const [member, setMember] = useState([]); //


    useEffect(() => {
        if(localStorage.getItem('accessToken') === null) {
            if(window.confirm("로그인이 필요합니다.\n로그인 하시겠습니까?")) {
                navigate("/login");
            } else {
                navigate("/");
            }
        } else {
            const token = localStorage.getItem('accessToken');
            const decodedToken = jwtDecode(token);
            const memberEmail = decodedToken.userEmail;

            axios.get(`/api/member/${memberEmail}`)
                .then(response => {
                    setMember(response.data);
                })
                .catch(error => console.log(error))
        }
    }, []);


    const handleClassSubmit = async (e) => {
        e.preventDefault();

        if (!classname || !classExplanation || !fullAddress || !detailaddress || !price || !curriculum || !startDate || !lastDate) {
            alert('필요한 모든 내용을 입력하세요');
            return;
        }

        try {
            const selectedWeekdaysString = selectedWeekdays.join(' ');
            console.log(selectedWeekdaysString);
            await onUpload();

            const classDto = {
                className: classname,
                classExplanation: classExplanation,
                level: level,
                longtime: longtime,
                startDate: startDate,
                lastDate: lastDate,
                weekdays: selectedWeekdaysString,
                address: fullAddress,
                detailAddress: detailaddress,
                curriculum: curriculum,
                price: price,
                categoryName: category
            };

            const classTimeDtos = formFields.map(time => ({
                classStartsAt: time.start,
                classEndsAt: time.end,
                headcount: time.count,
                // 다른 필드 값들 설정
            }));

            const classImageDtos = uploadedUrls.map((url, index) => ({
                imageUrl: url,
                main_yn: index === 0 ? 'y' : 'n'
            }));

            const requestData = {
                classDto : classDto,
                classTimeDtos : classTimeDtos,
                classImageDtos : classImageDtos
            };

            const response = await axios.post(`/class-open/${member.id}`, requestData);
            console.log('클래스 생성 성공:', response.data);

        } catch (error) {
            console.error('클래스 생성 오류:', error);
        }
        navigate("/");

    };



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
                                                        onChange={handleSelectChange}
                                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                                                    />

                                                    {isOpen &&
                                                        <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                            {levelList.map((value, index) => (
                                                                <LevelDropDown
                                                                    key={index}
                                                                    value={value}
                                                                    setIsOpen={setIsOpen}
                                                                    setLevelIdentify={setLevelIdentify}
                                                                    isOpen={isOpen}
                                                                    handleSelectChange={handleSelectChange}/>
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
                                                        onChange={handleSelectChange}
                                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                                                    />

                                                    {isOpenCategory && (
                                                        <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                            {categoryList.map((value, index) => (
                                                                <CategoryDropDown
                                                                    key={index}
                                                                    value={value}
                                                                    setCategoryIdentify={setCategoryIdentify}
                                                                    setIsOpen={setIsOpenCategory}
                                                                    isOpen={isOpenCategory}
                                                                    handleSelectChange={handleSelectChange}/>
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
                                                        onChange={handleSelectChange}
                                                        style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                                                    />

                                                    {isOpenLongtime && (
                                                        <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                                            {longtimeList.map((value, index) => (
                                                                <LongtimeDropDown
                                                                    key={index}
                                                                    value={value}
                                                                    setLongtimeIdentify={setLongtimeIdentify}
                                                                    setIsOpen={setIsOpenLongtime}
                                                                    isOpen={isOpenLongtime}
                                                                    handleSelectChange={handleSelectChange}/>
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
                                            <div className="close-setting" style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '60px' }}>클래스 가격</div>
                                            <form className="class-name-input-group" method="get" action="">
                                                <div className="input-group">
                                                    <input className="price-form-control"
                                                        name="price"
                                                        type="text"
                                                        required
                                                        value={price}
                                                        onChange={e => setPrice(e.target.value)}
                                                        placeholder="1인 기준 가격을 입력하세요" />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="date-start-setting" style={{ display: 'flex', alignItems: 'center', height: '40px'}}>
                                            <div className="term-setting" style={{ marginRight: '20px', fontSize: '14px', fontWeight: 'bold',marginLeft: '80px' }}>운영 기간 설정</div>
                                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} selectsStart startDate={startDate} endDate={lastDate}/>
                                            <div>~</div>
                                            <DatePicker selected={lastDate} onChange={date => setLastDate(date)} selectsEnd startDate={startDate} endDate={lastDate} minDate={startDate}/>
                                        </div>
                                        <div className="week-select-setting" style={{ display: 'flex'}}>
                                            <div className="week-select" style={{ marginRight: '20px', fontSize: '14px', fontWeight: 'bold',marginLeft: '80px' }}>운영 요일 선택</div>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                              {weekdays.map((weekday, index) => (
                                                <div key={index}>
                                                  <input
                                                    type="checkbox"
                                                    id={weekday}
                                                    value={weekday}
                                                    checked={selectedWeekdays.includes(weekday)}
                                                    onChange={() => handleCheckboxChange(weekday)}
                                                  />
                                                  <label htmlFor={weekday}>{weekday}</label>
                                                </div>
                                              ))}
                                            </div>

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

                            <div className="image-upload-url">

                                <form style={{padding: '20px', marginLeft: '20px'}}>
                                    <label htmlFor="input-file">
                                        <div>
                                            <p>{}</p>
                                        </div>
                                    </label>
                                    <input type="file" onChange={onChange} accept="image/*" style={{ width: '250px'}} multiple/>

                                </form>
                                <div className="attached-image-files" style={{ marginLeft: '30px', width: '250px', height: '30px'}}>
                                    {imageFiles.map((file, index) => (
                                        <p key={index} style={{fontSize: '10px', color:'#c0c0c0'}}>{file.name}<div type="button" style={{cursor: 'pointer', size: '5px', marginLeft: '10px'}} onClick={() => removeImage(index)}>x</div></p>
                                    ))}
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="cancel-submit-button-area">
                        <button className="cancel-button"
                                type="button"
                                style={{cursor: 'pointer', fontWeight: 'bold', color: '#FFFFFF', width: '120px', height: '40px', backgroundColor: '#c0c0c0', border: '2px solid #808080', borderRadius: '10px', marginLeft: '780px'}}>
                                취  소
                         </button>

                         <button className="submit-button"
                                 type="button"
                                 onClick={handleClassSubmit}
                                 style={{cursor: 'pointer', fontWeight: 'bold', color: '#FFFFFF', width: '120px', height: '40px', backgroundColor: '#cd5c5c', border: '2px solid #e9967a', borderRadius: '10px', marginLeft: '20px' }}>
                                 등  록
                         </button>
                    </div>

                </div>
    );
};

export default ClassOpen;