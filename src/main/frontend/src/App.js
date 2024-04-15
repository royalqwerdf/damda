import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import Cart from "./pages/Cart";
import CartReservationComplete from "./pages/CartReservationComplete";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberSaved from "./pages/MemberSaved";
import SearchPage from "./pages/SearchPage";
import ClassReservation from "./pages/ClassReservation";
import UserHome from "./pages/UserHome";
import AdminHome from "./pages/AdminHome";
import Inquiry from "./pages/Inquiry";
import NoticeAndEventPage from "./pages/NoticeAndEventPage";
import Oauth2Signup from "./pages/Oauth2Signup";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/search" element={<SearchPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
                    <Route path="/carts" element={<Cart/>}></Route>
                    <Route path="/carts/reservation-complete" element={<CartReservationComplete/>}></Route>
                    <Route path="/user-home" element={<UserHome/>}></Route>
                    <Route path="/admin-home" element={<AdminHome/>}></Route>
                    <Route path="/inquiry" element={<Inquiry/>}></Route>
                    <Route path="/news" element={<NoticeAndEventPage/>}></Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/Oauth2Signup" element={<Oauth2Signup />} />
                    <Route path="/memberSaved" element={<MemberSaved />} />
                    <Route path="/user-home" element={<UserHome/>}></Route>
                    <Route path="/admin-home" element={<AdminHome/>}></Route>
                    <Route path="/inquiry" element={<Inquiry/>}></Route>
                    <Route path="/news" element={<NoticeAndEventPage/>}></Route>
                    <Route path="/class-reservation/:id" element={<ClassReservation/>}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
