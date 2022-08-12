import {
    Navigate,
    Routes,
    Route
} from "react-router-dom";

import { createContext } from "react";

import Header from "../components/header";
import Footer from "../components/footer";

import Dashboard from "../pages/dashboard";
import Detail from "../pages/detail";
import User from "../pages/user"
import Search from "../pages/search"

const LayoutContext = createContext({});

const App = () => {
    return (
        <div className="App" style={styles.app}>
            <LayoutContext.Provider value={layout}>
                <Header/>

                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/detail" element={<Detail/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/search" element={<Search/>}/>
                    </Routes>
                </div>

                <Footer/>
            </LayoutContext.Provider>
        </div>
    );
}

export default App;

export { LayoutContext };

const layout = {
    app: {
        minHeight: "100vh"
    },

    header: {
        height: "1.25in"
    },

    footer: {
        height: "0.25in"
    }
};

const styles = {
    app: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },

    content: {
        minHeight: `calc(${layout.app.minHeight} - ${layout.header.height} - ${layout.footer.height})`
    }
};