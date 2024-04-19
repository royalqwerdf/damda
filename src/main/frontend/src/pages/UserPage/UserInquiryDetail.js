import {useParams} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import UserLeftMenu from "../../components/UserLeftMenu";


function UserInquiryDetail(){
    const { id } = useParams();
    const [inquiry,setInquiry]= useState([]);
    useEffect(()=>{
        axios.get(`/inquiry/detail/${id}`)
            .then(response=>{
                setInquiry(response.data);
                console.log(inquiry.type);
                console.log(response.data.title);
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
                    <div style={{
                        marginTop: "-50px",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "800px",
                        marginLeft: "400px"
                    }}>
                        <div><span style={{marginLeft: "30px"}}>{inquiry.type}</span></div>
                        <div style={{width: "75%"}}><span style={{marginLeft: "1px"}}>제목:{inquiry.title}</span></div>
                    </div>
                    <hr className="userinformation-line1" style={{marginBottom: "20px"}}/>
                    <div style={{width: "800px", marginLeft: "400px"}}>
                        <span style={{margin: "initial",marginLeft:"30px",fontWeight:"normal",fontSize:"17px"}}>{inquiry.content}</span>
                    </div>
                    <hr className="userinformation-line1" style={{marginBottom: "20px"}}/>
                    <div style={{width: "800px", marginLeft: "400px"}}>
                        <span style={{margin: "initial",marginLeft:"30px",fontWeight:"normal",fontSize:"17px"}}>
                            {inquiry.reply === null ? "답변이 아직 없습니다" : inquiry.reply}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserInquiryDetail;