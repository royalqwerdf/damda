import React, {useEffect, useState} from 'react';
import '../../styles/UserInformation.css';
import UserLeftMenu from "../../components/UserLeftMenu";
import axios from "axios";
import UserButton from "../../components/UserButton";

function UserInformation() {
    //현재 비밀번호와 실제 비밀번호가 맞는지 비교 - 동일하지않으면 안내 또는 수정불가 로직 필요
    //변경하려는 비밀번호와 확인하려는 비밀번호가 맞는지 확인 필요 - 동일하지않으면 안내 또는 수정불가 로직 필요
    //input이 입력되지 않은 칸의 데이터는 유지되는 로직, 입력한 부분만 변경

    const [userInformation, setUserInformation] = useState([]);

    useEffect(() => {
        fetchUserInformation();
    }, []);

    const fetchUserInformation = async () => {
        try {
            const response = await axios.get('/Member/get-userinformation'); // 예약 데이터를 가져오는 API 호출
            setUserInformation(response.data);
        } catch (error) {
            console.error('개인정보 가져오기에 실패했습니다.', error);
        }
    };


    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const userinformationNameChange = (event) => {
        setName(event.target.value);
    };

    const userinformationPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const userinformationPhoneChange = (event) => {
        setPhone(event.target.value);
    };


    const userinformationSubmit = async (event) => {
        event.preventDefault();

        // 서버로 데이터를 전송
        try {
            const response = await axios.post('/member/modify-userinformation', {
                name: name,
                password: password,
                phone: phone
            });
            console.log('개인정보가 수정되었습니다.');
        } catch (error) {
            console.error('개인정보가 수정되지 않았습니다.', error);
        }
    };


    useEffect(() => {
        validatePassword(password);
        validatePhone(phone);
    }, [password, phone]);

    /*비밀번호 입력양식, 현재 작동안함*/
    const userinformationPassworOption = (event) => {
        setPassword(event.target.value);
    };


    //에러메세지
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [phoneErrorMessage, setPhoneErrorMessage] = useState('');


    const validatePassword = (value) => {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,}$/;
        if (value && !regex.test(value)) {
            setPasswordErrorMessage('영문, 숫자, 특수문자 조합 8자 이상이어야 합니다.');
        } else {
            setPasswordErrorMessage('');
        }
    };

    /*핸드폰번호 입력양식*/
    const userinformationPhoneOption = (event) => {
        setPhone(event.target.value);
    };

    const validatePhone = (value) => {
        const regex = /^\d{3}-\d{3,4}-\d{4}$/;
        if (value && !regex.test(value)) {
            setPhoneErrorMessage('올바른 전화번호 형식이 아닙니다. (000-0000-0000)');
        } else {
            setPhoneErrorMessage('');
        }
    };


    return (
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>

            <div className="user-userinformation-container">


                <div className="my-userinformation">
                    <p>회원정보</p>
                    <p className="user-information-menu">개인정보변경</p>
                </div>

                {/*1은 상단선, 2는하단선*/}
                <hr className="userinformation-line1"></hr>


                <div className="user-information-email">
                    <div className='input-information-email'>
                        <span>이메일</span>
                        <p>{userInformation.email}</p>
                    </div>
                </div>

                <div className="user-information-nowpassword">
                    <span>현재 비밀번호</span>
                    <input type="password" placeholder="현재 비밀번호"/>
                    <p className="userinformation-notice">영문, 숫자, 특수문자 조합 8자 이상 입력해주세요.</p>
                    {passwordErrorMessage && <p className="error-input" style={{ color: 'red' }}>{passwordErrorMessage}</p>}

                </div>


                <div className="user-information-modifypassword">
                    <span>비밀번호 변경</span>
                    <input type="password" value={password} onChange={userinformationPasswordChange}
                           placeholder="비밀번호 변경"/>
                    <p className="userinformation-notice">영문, 숫자, 특수문자 조합 8자 이상 입력해주세요.</p>
                    {passwordErrorMessage && <p className="error-input" style={{ color: 'red' }}>{passwordErrorMessage}</p>}

                </div>

                <div className="user-information-checkpassword">
                    <span>비밀번호 확인</span>
                    <input type="password" placeholder="비밀번호 확인"/>
                    <p className="userinformation-notice">영문, 숫자, 특수문자 조합 8자 이상 입력해주세요.</p>
                    {passwordErrorMessage && <p className="error-input" style={{ color: 'red' }}>{passwordErrorMessage}</p>}

                </div>

                <div className="user-information-name">
                    <span>이름 변경</span>
                    <input type="text" value={name} onChange={userinformationNameChange}
                           placeholder={userInformation.name}/>
                </div>

                <div className="user-information-phone">
                    <span>휴대폰번호변경</span>
                    <input type="number" value={phone} onChange={userinformationPhoneChange}
                           placeholder={userInformation.phone}/>
                    {phoneErrorMessage && <p className="error-input-phone" style={{ color: 'red' }}>{phoneErrorMessage}</p>}

                </div>

                <div className="userinformation-modify-button">
                    <UserButton onClick={userinformationSubmit} type="submit" variant="userinformation-update">
                        개인정보변경</UserButton>
                </div>


                <hr className="userinformation-line2"></hr>
            </div>


        </div>
    )

}

export default UserInformation;