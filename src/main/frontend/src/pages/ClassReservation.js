import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../styles/reservation.css';
import moment from "moment";
import MapContent from '../components/MapContent';
import Modal from "react-modal";
const ClassReservation = () => {




  /*----------Modal Control*/
     const[isOpen, setIsOpen] = useState(false);
     const openModal =() =>{
        setIsOpen(true);
     }
     const closeModal =() =>{
        setIsOpen(false);
     }
     const customStyles = {
         overlay : {
            backgroundColor : "white",
         },
         content:{
         width:"400px",
             height: "200px",
             top: '50%',
             left: '50%',
             right: 'auto',
             bottom: 'auto',
             marginRight: '-50%',
             transform: 'translate(-50%, -50%)',
             borderRadius:"10px",
             boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
             padding:"20px",
             display: 'flex',
             flexDirection: 'column',
             alignItems: 'center',
         },
     };

  /*----------Class Control ----- GET*/
     const { id } = useParams(); // URL에서 classId가져오기??? -> mainpage에서 클래스 선택시 클래스 아이디 경로로 가야함
     const [classDetails, setClassDetails] = useState(null);
     const [classTimes, setClassTimes] = useState([]);
     const [classImages, setClassImages] = useState([]);
     const defaultImg = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/damda.png?alt=media&token=2dfa534c-01ba-4eba-a4de-af7fd44d7194";

     useEffect(() => {
       const fetchClassDetails = async () => {
         try {
           const response = await axios.get(`http://localhost:8080/class-reservation/${id}`);
           console.log(id);
           console.log(response.data);
           const { classDetails, classTimes, classImages } = response.data;

           setClassTimes(classTimes);
           setClassDetails(classDetails);
           setClassImages(classImages);

           //console.log(classDetails);
         } catch (error) {
           console.error('클래스 정보 가져오기 실패.', error);
         }
       };

       fetchClassDetails();
     }, [id]); // classId가 변경될 때마다 실행
     console.log(classDetails);

/*----------reservation Control ----- POST*/
// 예약 정보를 서버로 전송하는 함수
const submitReservation = async () => {
  // 여기서 예약에 필요한 정보를 객체로 구성합니다.
  const reservationData = {
    id: id, // 현재 페이지의 클래스 ID
//    userId: '사용자 ID', // 사용자 ID (로그인 구현 시 사용자의 ID로 대체)
    reservationDate: moment(value).format('YYYY-MM-DD'), // 선택된 날짜
//    startTime: selectedTime.start, // 선택된 시작 시간
//    endTime: selectedTime.end, // 선택된 종료 시간
    select_person: peopleCount, // 인원수
    totalPrice: classDetails.price * peopleCount // 총 가격
  };

  try {
    const response = await axios.post(`http://localhost:8080/class-reservation`, reservationData);
    if (response.status === 200) {
      // 예약 성공 시 처리 로직
      console.log("예약이 성공적으로 완료되었습니다.");
    }
  } catch (error) {
    // 에러 처리 로직
    console.error("예약에 실패했습니다.", error);
  }
};

  /*----------Calender Control*/
    // 캘린더 날짜관리 상태
    const [value, onChange] = useState(new Date());
    const [selectedClassTimes, setSelectedClassTimes] = useState([]);
    const [time, setTime] = useState();

    // 날짜 클릭 이벤트 처리
    const handleDateChange = (value) => {

      onChange(value); //기존의 상태로 업데이트
      const selectedDate = moment(value).format('YYYY-MM-DD');

      // 선택된 날짜에 해당하는 예약 가능한 classTimes 필터링
      const timesForThisDay = classTimes.filter((classTime) => {
        const classDate = moment(classTime.classDate).format('YYYY-MM-DD');
        return classDate === selectedDate && classTime.headcount > 0;
      });
      console.log(timesForThisDay);
      setSelectedClassTimes(timesForThisDay); // 상태 업데이트
    };
  /*----------Person Control*/
    // 인원수 관리 상태
    const [peopleCount, setPeopleCount] = useState(1);
    // 인원수 감소
    const decreasePeople = () => {
      setPeopleCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
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
                     <img src={classDetails.mainImg ? classDetails.mainImg : defaultImg} alt="클래스 이미지" main />
                  </div>
                  <div id="class-img-top-small">
                      <img src={classImages[1] ? classImages[0] : defaultImg }  alt="클래스 이미지2"/>
                      <img src={classImages[2] ? classImages[0] : defaultImg }  alt="클래스 이미지3"/>
                      <img src={classImages[3] ? classImages[0] : defaultImg }  alt="클래스 이미지4"/>
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
                  <b>지역</b> : {classDetails.address}<br/>
                  <b>난이도</b> : {classDetails.level}<br/>
                  <b>소요시간</b> : {classDetails.longtime}<br/>
                  <b>카테고리</b> : 요리
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
                onChange={handleDateChange}
                value={value}
                formatDay={(locale, date) => moment(date).format("DD")}
                tileDisabled={({ date, view }) => {
                    // 클래스가 시작되는 날짜와 끝나는 날짜를 'moment' 객체로 변환
                      if (view === 'month') {
                        // date가 startDate 이전이거나 lastDate 이후이면 비활성화
                        const isBeforeStart = moment(date).isBefore(moment(classDetails.startDate), 'day');
                        const isAfterEnd = moment(date).isAfter(moment(classDetails.lastDate), 'day');
                        return isBeforeStart || isAfterEnd;
                      }
                  }}>
             </Calendar></div>

             <div>
                {moment(value).format("YYYY년 MM월 DD일")}
             </div>
             <div id="calender-notice">
                <span id="highlight-red">예약 가능한 </span>
                 날짜만 선택가능합니다!
             </div>
             <div id="person-price">
                <br/><b>예약 인원</b> &nbsp;
                <button onClick={decreasePeople}>-</button> &nbsp;
                {peopleCount}&nbsp;
                <button onClick={increasePeople}>+</button>
                <br/><b>예약 금액</b> : {classDetails.price*peopleCount}원
             </div>
             <div id = "red-button">
                <button>문의하기</button> <button>선택 CLASS찜</button>
             </div>
             <div id = "red-button2">
                <button onClick={openModal}>클래스 신청하기</button>
                    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                      <h2>결제를 진행하시겠습니까?</h2>
                      <div className="modal-buttons">
                        <button onClick={closeModal} className="modal-close-btn">아니오</button>
                        <button onClick={submitReservation} className="modal-confirm-btn">결제 동의하기</button>
                      </div>
                    </Modal>
                <button>장바구니에 담기</button>
             </div>
             <h3>시간 선택</h3>
             <div id = "time-area">
              {/* 선택된 날짜에 대한 클래스 타임을 렌더링 */}
               {selectedClassTimes.map((classTime, index) => (
                 <div key={index}>
                   <button> {classTime.classStartsAt} - {classTime.classEndsAt}</button>
                    <div id='remaining-seats'> &nbsp;(잔여 자리: {classTime.headcount})</div>
                 </div>
               ))}
             </div>
           </div>
    </div>





  );
};

export default ClassReservation;