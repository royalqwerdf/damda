import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../../styles/UserReservationUpdate.css';
import UserLeftMenu from "../../components/UserLeftMenu";
//npm install react-select
//import Select from 'react-select';
import axios from "axios";
import UserButton from "../../components/UserButton";

function UserReservationUpdate() {


    const [userReservationList, setUserReservationList] = useState([]);
   // const [userReservationTimeList, setUserReservationTimeList] = useState([]);

    useEffect(() => {
        fetchUserReservationList();
      //  fetchUserReservationTimeList();
    }, []);

    const fetchUserReservationList = async () => {
        try {
            const response = await axios.get('/OrderDetail/listreservation');
            setUserReservationList(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

 /*   const fetchUserReservationTimeList = async () => {
        try {
            const response = await axios.get('/class-reservation/{id}');
            setUserReservationTimeList(response.data);
        } catch (error) {
            console.error('Error fetching reservation times:', error);
        }
    };
*/

    const [reservationDate, setReservationDate] = useState(new Date());
    // const [select_time, setSelect_time] = useState(null);

    /*const options = reservationTimeList.map((time) => ({
        value: time,
        label: time,
    }));
     */
    const userReservationDateChange = (event) => {
        setReservationDate(event.target.value);
    };

  /*  const userReservationSelectTimeChange = (event) => {
        setSelect_time(event.target.value);
    };

   */
    const userReservationUpdateSubmit = async (event) => {
        event.preventDefault();

        // 서버로 데이터를 전송
        try {
            const response = await axios.post('/class-reservation', {
                reservationDate : reservationDate,
                //selectTime : select_time
            });
            console.log('예약이 수정되었습니다.');
        } catch (error) {
            console.error('예약이 수정되지 않았습니다.', error);
        }
    };

    useEffect(() => {
        //validateReservationDate(reservationDate);
        //validateSelectTime(select_time);
    }, [reservationDate /* , select_time*/]);

    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu />
            </div>

            <div className="user-reservationUpdate-container">
                <div className="my-reservation-update">
                    <p className="myclass-1">나의클래스</p>
                    <p className="reservation-2">예약 관리</p>
                </div>
                <div className="user-reservation-update">
                    <h3 className="user-reservation-updateh3">예약 변경</h3>
                    <h4 className="user-reservation-update-notice">예약 후 인원변경은 불가합니다. 취소 후 다시 예약해주세요.</h4>

                    <div className="reservation-Update-box">

                    <div className="reservation-update-now">
                        <div className="title-user-reservationUpdate">
                            <p>클래스 이름</p>
                            <p>예약 날짜</p>
                            <p>예약 시간</p>
                            <p>예약 인원</p>
                            <p>결제 금액</p>
                        </div>
                        <div className="data-user-reservationUpdate-now">
                            <p>{userReservationList.className}</p>
                            <p>{userReservationList.reservationDate}</p>
                            {/* <p>{userReservationTimeList.select_time}</p> */}
                            <p>{userReservationList.totalHeadcount}</p>
                            <p>{userReservationList.totalPrice}</p>
                        </div>
                    </div>

                    <div className="reservation-update-modify">
                        <div className="title-user-reservationModify">
                            <p>클래스 이름</p>
                            <p>예약 날짜</p>
                            <p>예약 시간</p>
                            <p>예약 인원</p>
                            <p>결제 금액</p>
                        </div>
                        <div className="data-user-reservationUpdate-modify">
                            <p>{userReservationList.className}</p>
                            <p>{userReservationList.reservationDate}</p>
                            {/*
                            <div className="setReservationUpdate-date">
                                <DatePicker
                                    selected={reservationDate}
                                    onChange={(date) => setReservationDate(date)}
                                    dateFormat="yy-MM-dd"
                                />
                            </div>
                            <div className="setReservationUpdate-time">
                                <Select
                                    options={reservationTimeList}
                                    value={select_time}
                                    onChange={(selectedOption) => setSelect_time(selectedOption)}
                                />

                                <p>{userReservationList.totalHeadcount}</p>
                                <p>{userReservationList.totalPrice}</p>
                            </div>
            */}

                        </div>
                    </div>
                    </div>
                </div>

                <div className="user-reservation-modify-button">
                    <UserButton onClick={userReservationUpdateSubmit} type="submit" variant="reservation-modify-update">
                        예약수정완료</UserButton>
                </div>

            </div>
        </div>
    );
}

export default UserReservationUpdate;
