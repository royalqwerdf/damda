import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import SearchPage from "./pages/SearchPage";
import CategoryList from "./pages/CategoryList";
import CategoryClassList from "./pages/CategoryClassList";
<<<<<<< HEAD
import CategoryClassList2 from "./pages/CategoryClassList2";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
=======
import Inquiry from "./pages/Inquiry";
import NoticeAndEventPage from "./pages/NoticeAndEventPage";
>>>>>>> 6fd5b42d87c6488291c2bbfdd39050a442eb193c

function App(){
    return(
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/search" element={<SearchPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
<<<<<<< HEAD
                    <Route path="/user-home" element={<UserHome/>}></Route>
                    <Route path="/admin-home" element={<AdminHome/>}></Route>
=======
                    <Route path="/inquiry" element={<Inquiry/>}></Route>
                    <Route path="/news" element={<NoticeAndEventPage/>}></Route>
>>>>>>> 6fd5b42d87c6488291c2bbfdd39050a442eb193c
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;