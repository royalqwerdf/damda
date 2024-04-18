import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


function AnnouceOrEvent(props) {
    const [test,setTest]=useState(false);
    let totalPage = Math.ceil(props.data.length/10);
    console.log(props);

    if (props.view) {
        return (
            <div>
                <div id="news-flex">
                    <span>번호</span>
                    <span>제목</span>
                    <span>등록일</span>
                </div>
                <hr/>
                {props.data?.map(announce =>
                    <Link to={`/announce/${announce.id}`}>
                    <ul className="news-ul" key={announce.id} style={{margin: "10px 0"}}>
                        <ol className="news-id">{announce.id}</ol>
                        <ol className="news-title">{announce.title}</ol>
                        <ol className="news-date">{announce.createdAt.substring(0, 10)}</ol>
                    </ul>
                    </Link>
                )}
                <div style={{marginTop:"30px"}}>
                    {page(totalPage)}
                </div>
            </div>
        )
    }
    else{
        return (
            <div id="event-container">
            {props.data?.map(event =>
                <div>
                    <Link to={`/event/${event.id}`}>
                        <img src={event.image} style={{width:"200px",height:"200px"}}/>
                        <div>
                            {event.title}
                        </div>
                    </Link>
                </div>
            )}
            </div>
        )
    }

    function page(totalPage){
        let page = [];
        for(let i=1;i<=totalPage;i++){
             page.push(<a style={{marginRight:"8px",fontSize:"20px"}}>{i}</a>);
        }
        console.log(page);
        return page;
    }
}



export default AnnouceOrEvent;
