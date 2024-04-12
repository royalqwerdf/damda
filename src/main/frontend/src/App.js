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
import UserHome from "./pages/UserPage/UserHome";
import UserReservation from "./pages/UserPage/UserReservation";
import UserClass from "./pages/UserPage/UserClass";
import UserPayment from "./pages/UserPage/UserPayment";
import UserReview from "./pages/UserPage/UserReview";
import UserInformation from "./pages/UserPage/UserInformation";
import UserDelete from "./pages/UserPage/UserDelete";
import UserReservationUpdate from "./pages/UserPage/UserReservationUpdate";

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
                    <Route path="/User-Home" element={<UserHome />}></Route>
                    <Route path="/User-Reservation" element={<UserReservation />}></Route>
                    <Route path="/User-Class" element={<UserClass />}></Route>
                    <Route path="/User-Payment" element={<UserPayment />}></Route>
                    <Route path="/User-Review" element={<UserReview />}></Route>
                    <Route path="/User-Information" element={<UserInformation />}></Route>
                    <Route path="/User-Delete" element={<UserDelete />}></Route>
                    <Route path="/User-ReservationUpdate" element={<UserReservationUpdate />}></Route>

                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;