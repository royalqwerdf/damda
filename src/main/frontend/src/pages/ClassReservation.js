import React, { useState } from 'react';

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

const ClassReservation = () => {

  // 캘린더 날짜관리 상태
  const [value, onChange] = useState(new Date());
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

  return (
    <div className="class-reservation-page" style={{ height: "2048px" }}>
          <div className = "class-area">
              <div class= "class-info">
                  <div id="class-img-top">
                    <img src="damda.png"/>
                  </div>
                  <div id="class-img-top-small">
                      <img src="damda.png"/><img src="damda.png"/><img src="damda.png"/>
                  </div>

                  <div id = "class-grade-line">
                    <div id= "red-button"><button>후기 작성</button></div>
                    <div id="class-grade">
                        <img src="heart.png"/>777
                        <img src="star.png"/>4.5
                    </div>
                  </div>
                  <div>
                  <h3> 클래스 이름</h3>
                  </div>
                  지역 : 서초구
                  난이도 : 중급<br/>
                  소요시간 : 1시간
                  카테고리 : 요리
              </div>
              <div class = "class-info2">

                  <b>클래스 소개글</b><br/>
                  <div id="class-img-bottom">
                    <img src="damda.png"/>
                  </div>

                  <b>커리큘럼</b><br/>
                  <div id='curriculum-area'>
                    커리큘럼 소개글이 없습니다.<br/>
                    자세한 사항은 클래스에 문의해주세요.
                  </div>

                  <b>위치</b><br/>
                  <div id='location-area'>
                    <img src="damda.png"/>
                  </div>
                  <b>후기</b><br/>
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
                <br/>예약 금액 : 450000원
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