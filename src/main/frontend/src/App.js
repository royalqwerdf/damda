import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import SearchPage from "./pages/SearchPage";
import CategoryClassList from "./pages/CategoryClassList";
import CategoryClassList2 from "./pages/CategoryClassList2";
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