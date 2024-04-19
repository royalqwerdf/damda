import React, {useEffect, useState} from 'react';
import axios from "axios";
import ClassList from "./ClassList";

function NewClassList(){
    const [classes, setClasses] = useState([]);
    const [page,setPage] = useState(0);
    let maxPage;

    useEffect(() => {
        axios.get('/new')
            .then(response=>
            {
                setClasses(response.data);
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <div id="new">
            <div id="text">
                <span>
                    DAMDA'S New
                </span>
            </div>
            <div id="class-list">
                <button onClick={() => pageBtnClick("prev")}>{"<"}</button>
                <ClassList class={classToArray(classes)}/>
                <button onClick={() => pageBtnClick("next")}>{">"}</button>
            </div>
        </div>
    );

    function pageBtnClick(str) {
        maxPage = Math.floor(classes.length/4)-1;
        if(str === "prev" && 0 < page){
            setPage(page-1);
        }
        else if(str === "prev" && 0 === page){
            setPage(maxPage)
        }
        else if(str === "next" && maxPage > page){
            setPage(page+1);
        }
        else if(str === "next" && maxPage === page){
            setPage(0);
        }
    }

    function classToArray(classes){
        let classArr = [];
        let i = page*4;
        let j = page*4+4;
        for(i;i<j;i++){
            if(i === classes.length){
                return classArr;
            }
            classArr.push(classes[i]);
        }
        return classArr;
    }
}

export default NewClassList;