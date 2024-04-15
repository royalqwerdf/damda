import '../../styles/MemberManage.css'
import {useEffect, useState} from "react";
import moment from "moment";
import axios from "axios";

function MemberManage() {
    // 회원 목록 불러오기
    const [members, setMembers] = useState([]);
    // 회원 검색 결과
    const [filteredMembers, setFilteredMembers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/admin/members')
            .then(response => {
                setMembers(response.data);
                setFilteredMembers(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    // 테스트용 데이터
    // useEffect(() => {
    //     setMembers([
    //         {
    //             userEmail: "email123456@elice.com",
    //             name: "엘리스",
    //             createdAt: new Date(2024, 4, 15)
    //         }
    //     ]);
    //     setFilteredMembers([
    //         {
    //             userEmail: "email123456@elice.com",
    //             name: "엘리스",
    //             createdAt: new Date(2024, 4, 15)
    //         }
    //     ])
    // })

    // 드롭다운
    const [selectedOption, setSelectedOption] = useState('email');
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    }

    // 검색창
    const [searchInput, setSearchInput] = useState('');
    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    }
    const handleSearch = () => {
        if (!searchInput.trim()) {
            // 검색어가 없으면 필터링 되지 않은 기본 목록 반환
            setFilteredMembers(members);
            return;
        }

        axios.get('http://localhost:8080/admin/members/search', {
            params: {
                userEmail: selectedOption === 'email' ? searchInput : null,
                name: selectedOption === 'name' ? searchInput : null
            }
        })
            .then(response => {
                setFilteredMembers(response.data);
            })
            .catch(error => {
                console.error('검색 중 오류 발생:', error);
            });
    };
    
    return(
        <div className="container" style={{padding: '0px'}}>
            <div className="admin-menu-area" style={{width: '100%'}}>
                <div className="top-title-area" style={{marginTop: '20px', padding: '10px', width: '100%', height: '40px', borderBottom: '1px solid #c0c0c0', fontSize: '22px', fontWeight: 'bold', color: '#808000'}}>회원 관리</div>

                <div className="second-title" style={{marginTop: '10px', padding: '20px', width: '100%', height: '40px'}}>
                    <div style={{marginLeft: '30px', fontSize: '20px', fontWeight: 'bold', color: '#808000'}}>회원 검색</div>
                </div>

                <div className="content-area" style={{marginTop: '10px', padding: '10px', width: '100%'}}>
                    <div id="search-tab">
                        검색어
                        <span className="drop-down">
                            <select value={selectedOption} onChange={handleOptionChange}>
                                <option value="email">이메일</option>
                                <option value="name">이름</option>
                            </select>
                        </span>
                        <input type="text" value={searchInput} onChange={handleInputChange}/>
                        <button onClick={handleSearch}>검색</button>
                    </div>
                    <div className="count">
                        검색 <span className="number">{filteredMembers.length !== members.length ? filteredMembers.length : 0}</span>명 / 전체 <span className="number">{members.length}</span>명
                    </div>
                    <div className="column-name">
                        <span className="email">이메일</span>
                        <span>이름</span>
                        <span>가입일자</span>
                        <span>정보수정</span>
                    </div>
                    <ul id="member-list">
                        {filteredMembers.map(member => (
                            <li key={member.id}>
                                <span className="email">{member.userEmail}</span>
                                <span>{member.name}</span>
                                <span>{moment(member.createdAt).format("YY.MM.DD")}</span>
                                <span className="buttons">
                                    <button className="update">수정</button>
                                    <button className="delete">삭제</button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default MemberManage;