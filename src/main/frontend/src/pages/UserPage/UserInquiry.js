import UserLeftMenu from "../../components/UserLeftMenu";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";


function UserInquiry(){

    const [data,setData] = useState([]);
    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const memberEmail = decodedToken.userEmail;
    //const [member,setMember] = useState([]);
    let memberId;

    useEffect(() => {

        axios.get(`/api/member/${memberEmail}`)
            .then(response => {
                memberId = response.data.id;
                axios.get(`/inquiry/${memberId}`)
                    .then(response => {
                        setData(response.data);
                    })
                    .catch(error=>console.log(error));
            })
            .catch(error => console.log(error));
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
                    <div>
                        {data?.map(inquiry => {
                            return(
                                <div>
                                <Link to={`/inquiry/${inquiry.id}`}>
                                    <span>{inquiry.id}{" "}
                                    {inquiry.title}{" "}
                                        {inquiry.updatedAt}</span>
                                </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInquiry;