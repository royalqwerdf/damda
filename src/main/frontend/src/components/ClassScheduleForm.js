import React, { useRef, useState } from 'react';
import useDetectClose from '../hooks/useDetectClose';
import {ClassStartDropDown} from "../components/dropdown/ClassStartDropDown";
import {ClassEndDropDown} from "../components/dropdown/ClassEndDropDown";
import {HeadcountDropDown} from "../components/dropdown/HeadcountDropDown";


const ClassScheduleForm = ({ index, handleRemoveFields, handleFieldChange}) => {
    const [field, setField] = useState({ start: '', end: '', count: '' });

    //field의 start, end, count를 각각 name에 대입해 setField하는 함수
    const handleInputChange = (name, value) => {
            setField(prevState => ({ ...prevState, [name]: value }));
            console.log(index + "의 선택값 :" + value);
            handleFieldChange(index, name, value);
    };

    //수업시작 시간 드롭박스 설정
    const classStartRef = useRef();
    const [classStartIdentify, setClassStartIdentify] = useState('');
    const classStartList = ['오전 09:00', '오전 10:00', '오전 11:00', '오후 12:00', '오후 01:00', '오후 02:00', '오후 03:00', '오후 04:00', '오후 05:00', '오후 06:00', '오후 07:00']
    const [isOpenClassStart, setIsOpenClassStart] = useDetectClose(classStartRef, false);

    //수업종료 시간 드롭박스 설정
    const classEndRef = useRef();
    const [classEndIdentify, setClassEndIdentify] = useState('');
    const classEndList = ['오전 10:00', '오전 11:00', '오후 12:00', '오후 01:00', '오후 02:00', '오후 03:00', '오후 04:00', '오후 05:00', '오후 06:00', '오후 07:00', '오후 08:00']
    const [isOpenClassEnd, setIsOpenClassEnd] = useDetectClose(classEndRef, false);

    //인원수 드롭다운 박스 설정
    const headcountRef = useRef();
    const [headcountIdentify, setHeadcountIdentify] = useState('');
    const headcountList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [isOpenHeadcount, setIsOpenHeadcount] = useDetectClose(headcountRef, false);

    return (
        <div className="schedule-group" style={{ width: '100%', height: '60px' }}>
            <div className="class-start-time-space">
                <div className="start-time-bottom" style={{padding: '15px' }}>
                    <div ref={classStartRef} style={{ position: 'relative'}}>

                        <input
                            onClick={() => setIsOpenClassStart(!isOpenClassStart)}
                            type='button'
                            name='start'
                            value={classStartIdentify || '시작 시간'}
                            onChange={handleInputChange}
                            style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                        />
                        {isOpenClassStart && (
                            <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                {classStartList.map((value, index) => (
                                    <ClassStartDropDown
                                        key={index}
                                        value={value}
                                        setClassStartIdentify={setClassStartIdentify}
                                        setIsOpen={setIsOpenClassStart}
                                        isOpen={isOpenClassStart}
                                        handleInputChange={handleInputChange}/>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
            <div className="class-end-time-space">
                <div className="end-time-bottom" style={{padding: '15px' }}>
                    <div ref={classEndRef} name='end' value={field.end} onChange={(e) => handleInputChange(index, e)} style={{ position: 'relative', zIndex: 1}}>
                        <input
                            onClick={() => setIsOpenClassEnd(!isOpenClassEnd)}
                            type='button'
                            name='end'
                            value={classEndIdentify || '종료 시간'}
                            onChange={handleInputChange}
                            style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                        />
                        {isOpenClassEnd && (
                            <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                {classEndList.map((value, index) => (
                                    <ClassEndDropDown
                                        key={index}
                                        value={value}
                                        setClassEndIdentify={setClassEndIdentify}
                                        setIsOpen={setIsOpenClassEnd}
                                        isOpen={isOpenClassEnd}
                                        handleInputChange={handleInputChange}/>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
            <div className="class-headcount-max-space">
                <div className="headcount-max-bottom" style={{padding: '15px' }}>
                    <div ref={headcountRef} name='count' value={field.count} onChange={(e) => handleInputChange(index, e)} style={{ position: 'relative', zIndex: 1}}>

                        <input
                            onClick={() => setIsOpenHeadcount(!isOpenHeadcount)}
                            type='button'
                            name='count'
                            value={headcountIdentify || '인원수'}
                            onChange={handleInputChange}
                            style={{ width: '100%', height: '40px', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px' }}
                        />

                        {isOpenHeadcount && (
                            <ul style={{ cursor: 'pointer', position: 'absolute', top: '100%', left: 0, zIndex: 2, listStyleType: 'none', padding: '10px', width: '90%', backgroundColor: '#FFFFFF', border: '2px solid #dcdcdc', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                {headcountList.map((value, index) => (
                                    <HeadcountDropDown
                                        key={index}
                                        value={value}
                                        setHeadcountIdentify={setHeadcountIdentify}
                                        setIsOpen={setIsOpenHeadcount}
                                        isOpen={isOpenHeadcount}
                                        handleInputChange={handleInputChange}/>
                                ))}
                            </ul>
                        )}
                    </div>

                </div>
            </div>
            <div className="class-schedule-delete-space">
                <div className="schedule-delete-bottom" style={{padding: '15px' }}>
                    <button
                        className="class-schedule-delete-btn"
                        type="button"
                        onClick={() => handleRemoveFields(index)}
                        style={{ width: '100%', height: '40px', color: '#cd5c5c', backgroundColor: '#FFFFFF', border: '2px solid #e9967a', borderRadius: '10px' }}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassScheduleForm;
