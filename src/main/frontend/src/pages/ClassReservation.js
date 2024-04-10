import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useDetectClose from '../hooks/useDetectClose';
import {LevelDropDown} from "../components/dropdown/LevelDropDown";
import {CategoryDropDown} from "../components/dropdown/CategoryDropDown";
import {LongtimeDropDown} from "../components/dropdown/LongtimeDropDown";
import ClassScheduleForm from '../components/ClassScheduleForm';
import { v4 as uuidv4 } from 'uuid';
import PopupDom from '../components/PopupDom';
import PopupPostCode from '../components/PopupPostCode';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../styles/reservation.css';
import moment from "moment";
import MapContent from '../components/MapContent';

const ClassReservation = () => {

  /*----------Class Control*/
     const { id } = useParams(); // URL에서 classId가져오기???
     const [classDetails, setClassDetails] = useState(null);
     const defaultImg = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/damda.png?alt=media&token=2dfa534c-01ba-4eba-a4de-af7fd44d7194";
     useEffect(() => {
       const fetchClassDetails = async () => {
         try {
           const response = await axios.get(`http://localhost:8080/class-reservation/${id}`);
           console.log(id);
           console.log(response.data);
           const data = response.data;
           setClassDetails(data);

           //console.log(classDetails);
         } catch (error) {
           console.error('클래스 정보 가져오기 실패.', error);
         }
       };

       fetchClassDetails();
     }, [id]); // classId가 변경될 때마다 실행
     console.log(classDetails);

  /*----------Calender Control*/
    // 캘린더 날짜관리 상태
    const [value, onChange] = useState(new Date());

  /*----------Person Control*/
    // 인원수 관리 상태
    const [peopleCount, setPeopleCount] = useState(1);
    // 인원수 감소
    const decreasePeople = () => {
      setPeopleCount(prevCount => prevCount > 0 ? prevCount - 1 : 0); // 인원수가 0보다 작아지지 않도록 합니다.
    };
    // 인원수 증가
    const increasePeople = () => {
      setPeopleCount(prevCount => prevCount + 1);
    };

    // 딜레이 고려
     if (!classDetails) {
        return <div>Loading...</div>;
     }



  return (
    <div className="class-reservation-page" style={{ height: "2048px" }}>
          <div className = "class-area">
              <div className= "class-info">
                  <div id="class-img-top">
                     <img src={classDetails.mainImg ? classDetails.mainImg : defaultImg} alt="클래스 이미지" />
                  </div>
                  <div id="class-img-top-small">
                      <img src={defaultImg}/><img src={defaultImg}/><img src={defaultImg}/>
                  </div>

                  <div id = "class-grade-line">
                    <div id= "red-button"><button>후기 작성</button></div>
                    <div id="class-grade">
                        <img src="https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/heart.png?alt=media&token=66742275-d842-4849-b41e-7c49a0de8799"/>{classDetails.totalLike}
                        <img src="https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/star.png?alt=media&token=533d0a9d-b1f9-4cf7-9517-4f467e894ecf"/>{classDetails.totalRating}
                    </div>
                  </div>
                  <div>
                  <h3>{classDetails.className}</h3>
                  </div>
                  지역 : {classDetails.address}<br/>
                  난이도 : 중급<br/>
                  소요시간 : 1시간<br/>
                  카테고리 : 요리
              </div>
              <div className = "class-info2">

                  <b>클래스 소개글</b><br/>
                  <div id="class-img-bottom">
                    <img src={classDetails.mainImg ? classDetails.mainImg : defaultImg} alt="클래스 이미지" />
                  </div>

                  <br/><b>커리큘럼</b><br/>
                  <div id='curriculum-area'>
                    {classDetails.curriculum}
                  </div>

                  <br/><b>위치</b><br/>
                  <div id='location-area'>
                       <MapContent address={classDetails.address}/>
                  </div>
                  <br/><b>후기</b><br/>
                  <div id='review-area'>
                    후기가 없습니다.<br/>
                    직접 체험하고 멋진 후기를 남겨주세요!
                  </div>
              </div>
          </div>
          <div className="calender-area">
             <h3>클래스 일정</h3>
             <div><Calendar
                onChange={onChange}
                value={value}
                formatDay={(locale, date) => moment(date).format("DD")}>
             </Calendar></div>
             <div>
                {moment(value).format("YYYY년 MM월 DD일")}
             </div>
             <div id="calender-notice">
                <span id="highlight-red">예약 가능한 </span>
                 날짜만 선택가능합니다!
             </div>
             <div id="person-price">
                <br/>예약 인원 &nbsp;
                <button onClick={decreasePeople}>-</button> &nbsp;
                {peopleCount}&nbsp;
                <button onClick={increasePeople}>+</button>
                <br/>예약 금액 : {classDetails.price*peopleCount}원
             </div>
             <div id = "red-button">
                <button>문의하기</button> <button>선택 CLASS찜</button>
             </div>
             <div id = "red-button2">
                <button>클래스 신청하기</button> <button>장바구니에 담기</button>
             </div>
             <h3>시간 선택</h3>
          </div>
    </div>





  );
};

export default ClassReservation;