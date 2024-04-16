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
import UserHome from "./pages/UserPage/UserHome";
import AdminHome from "./pages/AdminHome";
import Inquiry from "./pages/Inquiry";
import NoticeAndEventPage from "./pages/NoticeAndEventPage";
import Oauth2Signup from "./pages/Oauth2Signup";
import UserDelete from "./pages/UserPage/UserDelete";
import UserInformation from "./pages/UserPage/UserInformation";
import UserReview from "./pages/UserPage/UserReview";
import UserReservationUpdate from "./pages/UserPage/UserReservationUpdate";
import UserReservation from "./pages/UserPage/UserReservation";
import UserPayment from "./pages/UserPage/UserPayment";
import UserClass from "./pages/UserPage/UserClass";
import Oauth2Saved from "./pages/OauthSaved";
import { AuthProvider } from './api/AuthProvider';
import AnnouncePage from "./pages/AnnouncePage";
import EventPage from "./pages/EventPage";
import UserInquiry from "./pages/UserPage/UserInquiry";

function App(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/search" element={<SearchPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
                    <Route path="/carts" element={<Cart/>}></Route>
                    <Route path="/carts/reservation-complete" element={<CartReservationComplete/>}></Route>
                    <Route path="/admin-home" element={<AdminHome/>}></Route>
                    <Route path="/inquiry" element={<Inquiry/>}></Route>
                    <Route path="/news" element={<NoticeAndEventPage/>}></Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/Oauth2Signup" element={<Oauth2Signup />} />
                    <Route path="/memberSaved" element={<MemberSaved />} />
                    <Route path="/admin-home" element={<AdminHome/>}></Route>
                    <Route path="/inquiry" element={<Inquiry/>}></Route>
                    <Route path="/announce/:id" element={<AnnouncePage/>}></Route>
                    <Route path="/event/:id" element={<EventPage/>}></Route>


                    <Route path="/User-Home" element={<UserHome/>}></Route>
                    <Route path="/User-Delete" element={<UserDelete/>}></Route>
                    <Route path="/User-Class" element={<UserClass/>}></Route>
                    <Route path="/User-Information" element={<UserInformation/>}></Route>
                    <Route path="/User-Payment" element={<UserPayment/>}></Route>
                    <Route path="/User-Reservation" element={<UserReservation/>}></Route>
                    <Route path="/User-ReservationUpdate" element={<UserReservationUpdate/>}></Route>
                    <Route path="/User-Review" element={<UserReview/>}></Route>
                    <Route path="/user-inquiry" element={<UserInquiry/>}></Route>
                    <Route path="/" element={<MainPage/>}></Route>

                    <Route path="/class-reservation/:id" element={<ClassReservation/>}></Route>
                    <Route path="/Oauth2Saved" element={<Oauth2Saved/>}></Route>
                </Routes>
                <Footer />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
