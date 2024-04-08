import '../styles/MainPage.css';
import CategoryList from "./CategoryList";
import Banner from "../components/Banner";
import BestClassList from "./BestClassList";
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
            <CategoryList categories={categories} classes={classes}/>
            <BestClassList />
            <NewClassList />
        </div>
    );
}

export default MainPage;