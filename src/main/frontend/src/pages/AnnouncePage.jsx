import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";


function AnnouncePage(){

    const { id } = useParams();
    const [data,setData] = useState([]);

    useEffect(() => {
        axios.get(`/announce/${id}`)
            .then(response =>
            {
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, [id]);

    return (
        <div style={{display: "grid", gridTemplateColumns: "1fr", margin: "200px 20%", gap: "20px"}}>
            <hr style={{width: "100%"}}/>
            <div style={{textAlign: "center"}}>{data?.title}</div>
            <hr style={{width: "100%"}}/>
            <div style={{padding:"10%"}}>{data?.content}</div>
            <hr style={{width: "100%"}}/>
        </div>
    )

}

export default AnnouncePage;