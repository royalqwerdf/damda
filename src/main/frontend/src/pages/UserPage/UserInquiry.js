import UserLeftMenu from "../../components/UserLeftMenu";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";


function UserInquiry(){

    const [data,setData] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const memberId = decodedToken.memberId;
    let createdAt;

        useEffect(() => {
        axios.get(`/inquiry/${memberId}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error=>console.log(error));
    },[]);

    return(
        <div>
            <div className="user-left-menu">
                <UserLeftMenu/>
            </div>
            <div className="user-userinformation-container">
                <div className="my-userinformation">
                    <p>회원정보</p>
                    <p className="user-information-menu">내 문의</p>
                    <hr className="userinformation-line1"/>
                    <div style={{
                        marginTop: "-50px",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "800px",
                        marginLeft: "400px"
                    }}>
                        <span style={{marginLeft: "60px"}}>분류</span>
                        <span style={{marginLeft: "1px"}}>제목</span>
                        <span style={{marginLeft: "1px",marginRight:"45px"}}>작성일</span>
                    </div>
                    <hr className="userinformation-line1" style={{marginBottom:"20px"}}/>
                    <div>
                        {data?.map(inquiry => {
                            return (
                                <>
                                    <div className="inquiry-container">
                                        <Link to={`/inquiry/${inquiry.id}`}>
                                            <span className="inquiry-content">{inquiry.type}</span>
                                        </Link>
                                        <Link to={`/inquiry/${inquiry.id}`}>
                                            <span className="inquiry-content">
                                                {inquiry.title.length>13 ? inquiry.title.substring(0,13)+"..." : inquiry.title}
                                            </span>
                                        </Link>
                                        <Link to={`/inquiry/${inquiry.id}`}>
                                            <span className="inquiry-content">{inquiry.createdAt.substring(0, 10)}</span>
                                        </Link>
                                    </div>
                                    <hr className="userinformation-line1" style={{marginTop: "1px",marginBottom:"10px",border:"1px solid #cfcfcf",borderWidth:"1px 0 0 0"}}/>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInquiry;