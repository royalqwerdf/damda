import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import UserHome from "./pages/UserHome";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
                    <Route path="/user-home" element={<UserHome />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;