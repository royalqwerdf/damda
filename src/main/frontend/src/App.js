import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./Navigation";
import Banner from "./Banner";
import CategoryClassList from "./CategoryClassList";
import BestClassList from "./BestClassList";
import NewClassList from "./NewClassList";
import Footer from "./Footer";
import MainPage from "./MainPage";
import ClassOpen from "./pages/ClassOpen";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;