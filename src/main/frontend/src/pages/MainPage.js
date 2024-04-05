import '../styles/MainPage.css';
import CategoryClassList from "./CategoryClassList";
import Navigation from "./Navigation";
import Banner from "./Banner";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BestClassList from "./BestClassList";
import Footer from "./Footer";
import NewClassList from "./NewClassList";
import {useEffect, useState} from "react";
import axios from "axios";


function MainPage() {
    const [classes, setClasses] = useState([]);
    const [categories,setCategories] = useState([]);
    useEffect(() => {
        axios.get('/home')
            .then(response=>
            {
                setClasses(response.data.classes);
                setCategories(response.data.categories);
                console.log(classes);
                console.log(categories);
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <div>
            <Banner />
            <CategoryClassList categories={categories} classes={classes}/>
            <BestClassList />
            <NewClassList />
        </div>
    );
}

export default MainPage;