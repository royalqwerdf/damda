import React, {useEffect} from 'react';
import '../styles/UserHome.css';
import UserLeftMenu from "../components/UserLeftMenu";
import axios from "axios";
function UserHome() {
    /* 멤버이름 가져오기
        const [memberName, setMemberName>] = useState('');

        useEffect(() => {
            // API 호출
            axios.get('/api/member')
                .then(response => {
                    setMemberName(response.data.memberName);
                })
                .catch(error => {
                    console.error('Error fetching member data:', error);
                });
        }, []); // 컴포넌트가 처음으로 렌더링될 때만 API 호출

        return (
            <div className="welcome-user">
                <a>{memberName}님</a>
                <a>반갑습니다.</a>
            </div>
        );
    }
    */
        return (
            <div>
                <UserLeftMenu /> {}
            </div>


        );




}

export default UserHome;
