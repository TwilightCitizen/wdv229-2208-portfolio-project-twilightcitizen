import {
    Navigate,
    Routes,
    Route
} from "react-router-dom";

import Header from "../components/header";
import Footer from "../components/footer";

import Dashboard from "../pages/dashboard";
import Detail from "../pages/detail";
import User from "../pages/user"
import Search from "../pages/search"

const App = () => {
    return (
        <div className="App">
            <Header/>

            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/detail" element={<Detail/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>

            <Footer/>
        </div>
    );
}

export default App;
