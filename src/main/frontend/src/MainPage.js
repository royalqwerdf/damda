import './MainPage.css';
import ClassList from "./ClassList";
import Navigation from "./Navigation";
import Banner from "./Banner";


function MainPage() {
    return (
        <div>
            <Navigation />
            <Banner />
            <ClassList />
        </div>
    );
}

export default MainPage;