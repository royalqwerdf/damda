import axios from "axios";
import {useEffect, useState} from "react";
import AnnouceOrEvent from "../components/AnnouceOrEvent";


function NoticeAndEventPage(){
    const[data,setData] = useState([]);
    const [view,setView] = useState(true);
    let btnAnnounce = document.getElementById("btnAnnounce");
    let btnEvent = document.getElementById("btnEvent");

    useEffect(() => {
        axios.get("/announce")
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return(
        <div id="newsPage-container">
            <div id="news-left">
                <span>담다소식</span>
                <p>
                    <button id="btnAnnounce" style={{fontWeight:"bold"}} onClick={()=>announceList()}>공지사항</button>
                </p>
                <p>
                    <button id="btnEvent" onClick={()=>eventList()}>이벤트</button>
                </p>
            </div>
            <AnnouceOrEvent view={view} data={data}/>
        </div>
    );

    function announceList(){
        btnAnnounce.style.fontWeight = "bold";
        btnEvent.style.fontWeight = "normal";
        axios.get("/announce")
            .then(response =>
            {
                setView(true);
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }

    function eventList(){
        btnAnnounce.style.fontWeight = "normal";
        btnEvent.style.fontWeight = "bold";
        axios.get("/event")
            .then(response =>
            {
                setView(false);
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }
}


export default NoticeAndEventPage;