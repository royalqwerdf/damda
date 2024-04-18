import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import ClassUpdate from "./pages/ClassUpdate";
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
import MemberUpdate from "./components/admins/MemberUpdate";
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
import RequireAuth from "./api/RequireAuth";
import NotFound from './components/404';

function App(){
    return(
        <BrowserRouter>
            <AuthProvider>
                <Navigation />
                <Routes>
                    <Route path="/search" element={<SearchPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
                    <Route path="/class-open/update/:id" element={<ClassUpdate/>}></Route>
                    <Route path="/carts" element={<Cart/>}></Route>
                    <Route path="/carts/reservation-complete" element={<CartReservationComplete/>}></Route>
                    <Route path="/inquiry" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <Inquiry />
                        </RequireAuth>
                    } />
                    <Route path="/news" element={<NoticeAndEventPage/>}></Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/Oauth2Signup" element={<Oauth2Signup />} />
                    <Route path="/memberSaved" element={<MemberSaved />} />
                    <Route path="/member-update/:id" element={<MemberUpdate/>}></Route>
                    <Route path="/admin-home" element={
                        <RequireAuth allowedRoles={['ADMIN']} redirectToIfUnauthorized="/404" isNotFoundPage={true}>
                            <AdminHome />
                        </RequireAuth>
                    } />
                    <Route path="/inquiry" element={<Inquiry/>}></Route>
                    <Route path="/announce/:id" element={<AnnouncePage/>}></Route>
                    <Route path="/event/:id" element={<EventPage/>}></Route>


                    <Route path="/User-Home" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserHome />
                        </RequireAuth>
                    } />
                    <Route path="/User-Delete" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserDelete />
                        </RequireAuth>
                    } />
                    <Route path="/User-Class" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserClass />
                        </RequireAuth>
                    } />
                    <Route path="/User-Information" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserInformation />
                        </RequireAuth>
                    } />
                    <Route path="/User-Payment" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserPayment />
                        </RequireAuth>
                    } />
                    <Route path="/User-Reservation" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserReservation />
                        </RequireAuth>
                    } />
                    <Route path="/User-ReservationUpdate" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserReservationUpdate />
                        </RequireAuth>
                    } />
                    <Route path="/User-Review" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserReview />
                        </RequireAuth>
                    } />
                    <Route path="/user-inquiry" element={
                        <RequireAuth allowedRoles={['USER', 'ADMIN']} redirectToIfUnauthorized="/login">
                            <UserInquiry />
                        </RequireAuth>
                    } />
                    <Route path="*" element={<NotFound />} />
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
