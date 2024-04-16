import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


function EventPage(){
    const {id} = useParams();
    const [data,setData] = useState([]);

    useEffect(() => {
        axios.get(`/event/${id}`)
            .then(response=>{
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    return(
        <div style={{margin: "200px 20%", display: "grid", gridTemplateColumns: "1fr",gap:"20px"}}>
            <hr style={{width: "100%"}}/>
            <div style={{textAlign:"center"}}>{data.title}</div>
            <hr style={{width: "100%"}}/>
            <img style={{width: "100%"}} src={data.image} alt="이미지"/>
            <div>{data.content}</div>
            <hr style={{width: "100%"}}/>
        </div>
    )
}

export default EventPage;