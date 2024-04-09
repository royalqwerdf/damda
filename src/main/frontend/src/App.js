import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "./pages/Navigation";
import Footer from "./pages/Footer";
import MainPage from "./pages/MainPage";
import ClassOpen from "./pages/ClassOpen";
import Cart from "./pages/Cart";
import CartReservationComplete from "./pages/CartReservationComplete";

function App(){
    return(
        <div>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/" element={<MainPage/>}></Route>
                    <Route path="/class-open" element={<ClassOpen/>}></Route>
                    <Route path="/carts" element={<Cart/>}></Route>
                    <Route path="/carts/reservation-complete" element={<CartReservationComplete/>}></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;