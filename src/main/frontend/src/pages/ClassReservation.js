import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../styles/reservation.css';
import moment from "moment";
import MapContent from '../components/MapContent';
import Modal from "react-modal";
import useUploadImage from '../hooks/useUploadImage';
import {jwtDecode} from "jwt-decode";
const ClassReservation = () => {
/*  회원 토큰 관리*/

const [memberData,setMemberData] = useState(null);
const [memberId, setMemberId] = useState(null);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const memberEmail = decodedToken.userEmail;
    console.log(memberEmail);

    useEffect(() => {

        axios.get(`/api/member/${memberEmail}`)
            .then(response => {
                setMemberData(response.data);
                setMemberId(response.data.id);
                console.log("member Id:",memberId);
            })
            .catch(error => console.log(error));
    },[]);
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


    const onChangeImage = (e) => {
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



  /*----------Modal Control*/
     const[isOpen, setIsOpen] = useState(false);
     const[isCartOpen, setIsCartOpen] = useState(false);
     /*reserve*/
     const openModal =() =>{
        if (!selectedTime) {
            alert('예약 날짜와 시간을 선택해주세요');
            return;
        }
        setIsOpen(true);
     }
     const closeModal =() =>{
        setIsOpen(false);
     }
     /*cart*/
     const openCartModal =() =>{
        if (!selectedTime) {
            alert('예약 날짜와 시간을 선택해주세요');
            return;
        }
        setIsCartOpen(true);
     }
     const closeCartModal =() =>{
        setIsCartOpen(false);
     }
     /*review*/
     const[isReviewOpen, setIsReviewOpen] = useState(false);
     const[reviewInfo, setReviewInfo] = useState(false);
         useEffect(() => {
            if (memberId){
                  axios.get(`/class-reservation/${id}/${memberId}/review`)
                             .then(response2 => {
                                 console.log("Review Data:", response2.data);
                                 console.log("Review Data2:", response2.data.total_price);
                                 setReviewInfo(response2.data);
                                 console.log(reviewInfo);
                             })
                             .catch(error => console.log(error));
            }

         },[memberId]);


     const openReviewModal =() =>{
        if(!reviewInfo){
            alert('클래스 이용내역이 있는 회원님만 작성 가능합니다!');
            return;
        }
        setIsReviewOpen(true);

     }
     const closeReviewModal =() =>{
        setIsReviewOpen(false);
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

    const customReviewStyles = {
        content: {
            width: "60%", // 모달의 너비를 화면의 60%로 설정
            height: "auto", // 높이는 자동으로 내용에 맞춤
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: "1px solid #ccc", // 테두리 설정
            background: "#fff", // 배경색 설정
            overflow: "auto", // 내용이 넘치면 스크롤바 생성
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px", // 테두리 둥글게
            outline: "none",
            padding: "20px", // 내부 패딩 설정
        },
    };
  /*----------Class Control ----- GET*/
     const { id } = useParams(); // URL에서 classId가져오기??? -> mainpage에서 클래스 선택시 클래스 아이디 경로로 가야함
     const [classDetails, setClassDetails] = useState(null);
     const [classTimes, setClassTimes] = useState([]);
     const [classImages, setClassImages] = useState([]);
     const [classReviews, setClassReviews] = useState([]);
     const defaultImg = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/damda.png?alt=media&token=2dfa534c-01ba-4eba-a4de-af7fd44d7194";

     useEffect(() => {
       const fetchClassDetails = async () => {
         try {
           const response = await axios.get(`/class-reservation/${id}`);
           console.log(id);
           console.log(response.data);
           const { classDetails, classTimes, classImages, classReviews} = response.data;

           setClassTimes(classTimes);
           setClassDetails(classDetails);
           setClassImages(classImages);
           setClassReviews(classReviews);

           //console.log(classDetails);
         } catch (error) {
           console.error('클래스 정보 가져오기 실패.', error);
         }
       };

       fetchClassDetails();
     }, [id]); // classId가 변경될 때마다 실행
     console.log(classDetails);



/*----------reservation Control ----- POST*/
// 예약 정보를 서버로 전송
const navigate = useNavigate();
const submitReservation = async () => {
  // 여기서 예약에 필요한 정보를 객체로 구성합니다.
  console.log(classDetails.price); //
  console.log(peopleCount);
  console.log(memberData.name);
  const reservationData = {
    id: id, // 현재 페이지의 클래스 ID
    user_id: memberData.id, // 사용자 ID (로그인 구현 시 사용자의 토큰?ID?로 대체)
    select_date: moment(value).format('YYYY-MM-DD'), // 선택된 날짜
    select_time: selectedTime.id, // 선택 시간ID
    select_person: peopleCount, // 인원수
    total_price: classDetails.price * peopleCount, // 총 가격
    classType : classDetails.categoryName,
  };

  try {
    const response = await axios.post(`http://localhost:8080/class-reservation/${id}/reserve`, reservationData);
    if (response.status === 200) {
      // 예약 성공 시 처리 로직
      console.log("예약이 성공적으로 완료되었습니다.");
      closeModal();
      navigate('/carts/reservation-complete');

    }
  } catch (error) {
    // 에러 처리 로직
    console.error("예약에 실패했습니다.", error);
//    window.location.reload();
  }
};


/*----------Cart Control ----- POST*/
const submitCart = async () => {
  // 여기서 예약에 필요한 정보를 객체로 구성합니다.
  console.log(classDetails.price); //
  console.log(peopleCount);

  const CartData = {
    user_id: memberData.id, // 사용자 ID (로그인 구현 시 사용자의 토큰?ID?로 대체)
    select_date: moment(value).format('YYYY-MM-DD'), // 선택된 날짜
    classTimeId: selectedTime.id, // 선택 시간ID
    selectedCount: peopleCount, // 인원수
    totalPrice: classDetails.price * peopleCount, // 총 가격
  };
  if (!selectedTime) {
      alert('예약 날짜와 시간을 선택해주세요');
      return;
  }
  try {
    const response = await axios.post(`http://localhost:8080/class-reservation/${id}/add-to-cart`, CartData);
    if (response.status === 200) {
      // 예약 성공 시 처리 로직
      console.log("담기가 성공적으로 완료되었습니다.");
      alert('장바구니 담았습니다.');
      closeModal();
      window.location.reload();

    }
  } catch (error) {
    // 에러 처리 로직
    console.error("담기에 실패했습니다.", error);
    alert('장바구니 담기에 실패했습니다.');
    window.location.reload();
  }
};

  /*----------Calender Control*/
    // 캘린더 날짜관리 상태
    const [value, onChange] = useState(new Date());
    const [time, setTime] = useState();
    const [selectedDateTime, setSelectedDateTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState();

    //선택 날짜 저장
    const handleTimeSelection = (classTime) => {
      // 이미 선택된 시간이라면 선택 해제, 그렇지 않다면 선택
      if (selectedTime === classTime) {
        setSelectedTime([]); // 선택 해제
      } else {
        setSelectedTime(classTime); // 새 시간 선택
      }
    };

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
      setSelectedDateTime(timesForThisDay); // 상태 업데이트
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


    /*----------reveiw Control*/
    const [reviewTitle, setReviewTitle] = useState(''); // 리뷰 타이틀 상태
    const [reviewText, setReviewText] = useState(''); // 리뷰 텍스트 상태
    const [starClick, setStarClick] = useState(null);  // 현재 클릭 별
    const [preClicked, setPreClicked] = useState(null); // 이전클릭 별
    const goToFetch = (e) => {

      const nowClicked = e.target.id;  // 현재 클릭한 id
      setStarClick(nowClicked);

      console.log(preClicked);
      console.log(starClick);

      if(nowClicked !== null) {  // 별이 클릭한 상태라면
        if(nowClicked > preClicked) {
          for (let i = 1; i <= nowClicked; i++) {
            const star_id = document.getElementById(i);
            star_id.src = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/star.png?alt=media&token=533d0a9d-b1f9-4cf7-9517-4f467e894ecf";
          }
        }
        else if(nowClicked < preClicked){
          for (let i = 1; i <= nowClicked; i++) {
            const star_id = document.getElementById(i);
            star_id.src = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/star.png?alt=media&token=533d0a9d-b1f9-4cf7-9517-4f467e894ecf";
          }
          for(let j = 5; j > nowClicked; j--) {
            const star_id = document.getElementById(j);
            star_id.src = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/empty_start.png?alt=media&token=b2918120-3f5f-4840-8edb-6a09f02708ef";
          }
        }
        else {
          for (let i = 1; i <= nowClicked; i++) {
            const star_id = document.getElementById(i);
            star_id.src = "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/empty_start.png?alt=media&token=b2918120-3f5f-4840-8edb-6a09f02708ef";
          }
        }
        setPreClicked(nowClicked);
      }
    }

    const submitReview = async () => {
      console.log(preClicked);
      console.log(reviewText);

      const reviewData = {
        class_id: id, // 클래스
        user_id: memberId, // 유저ID
        title : reviewTitle,//리뷰 제목
        contents : reviewText, // 리뷰내용
        rating : preClicked, // 평점

      };
      if (!reviewText || !starClick || reviewTitle)   {
          alert('후기(제목/내용)와 평점을 입력해주세요');
          return;
      }
      try {
        const response = await axios.post(`http://localhost:8080/review`, reviewData);
        if (response.status === 200) {
          // 예약 성공 시 처리 로직
          console.log("리뷰작성 완료");
          alert('리뷰를 작성을 완료하였습니다..');
          closeModal();
          window.location.reload();

        }
      } catch (error) {
        // 에러 처리 로직
        console.error("리뷰작성 실패", error);
        alert('리뷰 작성중 오류가 발생했습니다.');
//        window.location.reload();
      }
    };
    // 딜레이 고려
     if (!classDetails) {
        return <div>Loading...</div>;
     }



  return (
    <div className="class-reservation-page">
          <div className = "class-area">
              <div className= "class-info">
                  <div id="class-img-top">
                     <img src={classImages[0] ? classImages[0].imageUrl : defaultImg } alt="클래스 이미지" main />
                  </div>
                  <div id="class-img-top-small">
                      <img src={classImages[1] ? classImages[1].imageUrl : defaultImg }  alt="클래스 이미지2"/>
                      <img src={classImages[2] ? classImages[2].imageUrl : defaultImg }  alt="클래스 이미지3"/>
                      <img src={classImages[3] ? classImages[3].imageUrl : defaultImg }  alt="클래스 이미지4"/>
                  </div>

                  <div id = "class-grade-line">
                    <div id= "red-button">
                    <button onClick={openReviewModal}>후기 작성</button></div>
                    <Modal isOpen={isReviewOpen} onRequestClose={closeReviewModal} style={customReviewStyles}>
                     <div className="review-modal">
                       <div className="review-header">
                         <h2>후기 작성</h2>
                         <button onClick={closeReviewModal} className="close-button">X</button>
                       </div>
                       <div className="review-body">
                         <div className="review-left-area">
                           <h3>체험 클래스 : </h3>&nbsp;<strong>{classDetails.className}</strong>
                           <textarea id="input-review-title"
                                name="reviewtitle"
                                required
                                value={reviewTitle}
                                onChange={e => setReviewTitle(e.target.value)}
                                placeholder="타이틀을 입력해주세요."/>
                           <textarea id="input-review"
                                name="reviewtext"
                                required
                                value={reviewText}
                                onChange={e => setReviewText(e.target.value)}
                                placeholder="체험 후기..."/>
                              <div className="image-upload-url">

                                  <form style={{padding: '20px', marginLeft: '20px'}}>
                                      <label htmlFor="input-file">
                                          <div>
                                              <p>{}</p>
                                          </div>
                                      </label>
                                      <input type="file" onChangeImage={onChangeImage} accept="image/*" style={{ width: '250px'}} multiple/>
                                  </form>
                                  <div className="attached-image-files" style={{ marginLeft: '30px', width: '250px', height: '30px'}}>
                                      {imageFiles.map((file, index) => (
                                          <p key={index} style={{fontSize: '10px', color:'#c0c0c0'}}>{file.name}<div type="button" style={{cursor: 'pointer', size: '5px', marginLeft: '10px'}} onClick={() => removeImage(index)}>x</div></p>
                                      ))}
                                  </div>
                              </div>


                         </div>
                         <div className="review-right-area">
                           <h3>최근 예약정보</h3>
                           <p><strong>참가자 정보</strong> </p>{memberData.name}<br/>{memberData.phone} {/* 'user-id'를 실제 사용자 ID로 대체 */}
                           <p><strong>클래스 날짜 </strong></p> {moment(reviewInfo.select_date).format('YYYY-MM-DD')}
                           <p><strong>예약 인원 </strong></p>{reviewInfo.select_person}명
                           <p><strong>결제 금액 </strong></p>{reviewInfo.total_price}원
                           <p>평점 </p>
                            {[1, 2, 3, 4, 5].map(el => (
                             <img
                             	key={el}
                             	id={el}
                           	src="https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/empty_start.png?alt=media&token=b2918120-3f5f-4840-8edb-6a09f02708ef"
                           	alt=""
                           	style={{ width: '25px', height: '25px'}}
                           	onClick={goToFetch} />
                           ))}
                         </div>
                       </div>
                       <div className="review-footer">
                         <button onClick={closeReviewModal} className="modal-close-btn">취소</button>
                         <button onClick={submitReview} className="modal-confirm-btn">등록하기</button>
                       </div>
                     </div>

                    </Modal>
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
                  <b>카테고리</b> : {classDetails.categoryName}
              </div>
              <div className = "class-info2">

                  <b>클래스 소개글</b><br/>
                  <div id="class-img-bottom">
                    <img src={classImages[0] ? classImages[0].imageUrl : defaultImg } alt="클래스 이미지" />
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
                    {classReviews.length > 0 ? (
                      classReviews.map(review => (
                        <div key={review.user_id} className="review">
                          <h3>{review.title || "제목 없음"}</h3>
                          <p>{review.contents}</p>
                          <div className="rating">
                            {[...Array(5)].map((star, index) => {
                              index += 1;
                              return (
                                <span key={index}>
                                  <img
                                    src={index <= review.rating ?
                                    "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/star.png?alt=media&token=533d0a9d-b1f9-4cf7-9517-4f467e894ecf"
                                    : "https://firebasestorage.googleapis.com/v0/b/damda-30bee.appspot.com/o/empty_start.png?alt=media&token=b2918120-3f5f-4840-8edb-6a09f02708ef"}
                                    alt="star"
                                    style={{ width: '25px', height: '25px' }}
                                  />
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>후기가 없습니다.<br/>직접 체험하고 멋진 후기를 남겨주세요!</p>
                    )}
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
                        const currentDate = moment();
                        const isBeforeToday = moment(date).isBefore(currentDate, 'day');
                        const selectedDate = moment(date).format('YYYY-MM-DD');
                        const isBeforeStart = moment(date).isBefore(moment(classDetails.startDate), 'day');
                        const isAfterEnd = moment(date).isAfter(moment(classDetails.lastDate), 'day');
                        const hasClassTimes = classTimes.some(classTime =>
                                                        moment(classTime.classDate).format('YYYY-MM-DD') === selectedDate && classTime.headcount > 0);

                        return isBeforeToday || isBeforeStart || isAfterEnd || !hasClassTimes;
                      }
                  }}>
             </Calendar></div>


             <div id="calender-notice">
                <span id="highlight-red">예약 가능한 </span>
                 날짜만 선택가능합니다!
             </div>
             <div id="person-price">
                <br/><b>예약 인원</b> &nbsp;
                <button onClick={decreasePeople}>-</button> &nbsp;
                {peopleCount}&nbsp;
                <button onClick={increasePeople} >+</button>
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

                <button onClick={openCartModal}>장바구니에 담기</button>
                    <Modal isOpen={isCartOpen} onRequestClose={closeCartModal} style={customStyles}>
                      <h2>장바구니에 담으시겠습니까?</h2>
                      <div className="modal-buttons">
                        <button onClick={closeCartModal} className="modal-close-btn">아니오</button>
                        <button onClick={submitCart} className="modal-confirm-btn">장바구니 담기</button>
                      </div>
                    </Modal>
             </div>
             <h3>시간 선택</h3>
             <div id = "time-area">
                  {selectedDateTime.map((classTime, index) => (
                    <div key={index}>
                      <button onClick={() => handleTimeSelection(classTime)}
                      className={selectedTime === classTime ? 'on' : ''}
                      type="button">
                        {classTime.classStartsAt} - {classTime.classEndsAt}
                      </button>
                      <div id='remaining-seats'>잔여 자리: {classTime.headcount}</div>
                    </div>
                  ))}
             </div>
           </div>
    </div>





  );
};

export default ClassReservation;