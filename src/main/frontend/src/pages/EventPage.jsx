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
        <div style={{textAlign:"center",marginTop:"200px"}}>
            <img src={data.image} alt="이미지"/>
            <span>{data.id}</span>
            <span>{data.title}</span>
            <span>{data.content}</span>
        </div>
    )
}

export default EventPage;