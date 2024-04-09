import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MemberSaved from "./pages/MemberSaved";
import SearchPage from "./pages/SearchPage";
import CategoryClassList from "./pages/CategoryClassList";
import CategoryClassList2 from "./pages/CategoryClassList2";

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
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/memberSaved" element={<MemberSaved />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;