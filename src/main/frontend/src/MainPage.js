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
            <BrowserRouter>
                <Navigation />
                <Banner />
                <Routes>
                    <Route path="/" element={<CategoryClassList />}></Route>
                    <Route path="/category/*" element={<CategoryClassList />}></Route>
                </Routes>
                <BestClassList />
                <NewClassList />
                <Footer />
            </BrowserRouter>



        </div>
    );
}

export default MainPage;