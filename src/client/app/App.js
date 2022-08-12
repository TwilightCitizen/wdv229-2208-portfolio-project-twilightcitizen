import {
    Navigate,
    Routes,
    Route
} from "react-router-dom";

import { createContext, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";
import User from "../pages/User"
import Search from "../pages/Search"

const LayoutContext = createContext({});
const ColorContext = createContext({});
const PageContext = createContext([]);

const App = () => {
    const [page, setPage] = useState({});

    return (
        <div className="App" style={styles.app}>
            <ColorContext.Provider value={colors}>
            <LayoutContext.Provider value={layout}>
            <PageContext.Provider value={[page, setPage]}>
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
            </PageContext.Provider>
            </LayoutContext.Provider>
            </ColorContext.Provider>
        </div>
    );
}

export default App;

export { ColorContext, LayoutContext, PageContext };

const colors = {
    veryDark: "#000000",
    dark: "#0263E0",
    light: "#0263E01F",
    veryLight: "#FFFFFF"
}

const layout = {
    app: {
        minHeight: "100vh"
    },

    header: {
        height: "1.25in"
    },

    footer: {
        height: "0.5in"
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