import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ClassList from "./ClassList";

function App() {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        axios.get('/home')
            .then(response=>
            {
                setClasses(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <>
            <ClassList classes = {classes}/>
        </>
    );
}

export default App;