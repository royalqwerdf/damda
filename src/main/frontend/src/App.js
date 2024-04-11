import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MemberSaved from "./pages/MemberSaved";
import SearchPage from "./pages/SearchPage";
import CategoryClassList from "./pages/CategoryClassList";
import CategoryClassList2 from "./pages/CategoryClassList2";
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
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/Oauth2Signup" element={<Oauth2Signup />} />
                    <Route path="/memberSaved" element={<MemberSaved />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;