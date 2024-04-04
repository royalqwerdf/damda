import './MainPage.css';
import CategoryClassList from "./CategoryClassList";
import Navigation from "./Navigation";
import Banner from "./Banner";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BestClassList from "./BestClassList";
import Footer from "./Footer";
import NewClassList from "./NewClassList";


function MainPage() {
    return (
        <div>
            <Banner />
            <CategoryClassList />
            <BestClassList />
            <NewClassList />
        </div>
    );
}

export default MainPage;