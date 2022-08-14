/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

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
import User from "../pages/User";
import Search from "../pages/Search";
import Error404 from "../pages/Error404";

// Contexts

const LayoutContext = createContext({});
const ColorContext = createContext({});
const PageContext = createContext([]);
const SearchContext = createContext([]);
const ChatContext = createContext([]);
const UserContext = createContext([]);

// Component

const App = () => {
    const [page, setPage] = useState({});
    const [search, setSearch] = useState("")
    const [chat, setChat] = useState({});
    const [user, setUser] = useState({});

    return (
        <div className="App" style={styles.app}>
            <ColorContext.Provider value={colors}>
            <LayoutContext.Provider value={layout}>
            <PageContext.Provider value={[page, setPage]}>
            <SearchContext.Provider value={[search, setSearch]}>
            <ChatContext.Provider value={[chat, setChat]}>
            <UserContext.Provider value={[user, setUser]}>
                <Header/>

                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        { Object.keys(chat).length !== 0 && <Route path="/detail" element={<Detail/>}/> }
                        { Object.keys(user).length !== 0 && <Route path="/user" element={<User/>}/> }
                        { search !== "" && <Route path="/search" element={<Search/>}/> }
                        <Route path="/error-404" element={<Error404/>}/>
                        <Route path="*" element={<Navigate to="/error-404" replace/>}/>
                    </Routes>
                </div>

                <Footer/>
            </UserContext.Provider>
            </ChatContext.Provider>
            </SearchContext.Provider>
            </PageContext.Provider>
            </LayoutContext.Provider>
            </ColorContext.Provider>
        </div>
    );
}

// Exports

export default App;

export {
    ColorContext,
    LayoutContext,
    PageContext,
    SearchContext,
    ChatContext,
    UserContext
};

// Styles

const colors = {
    veryDark: "#000000",
    dark: "#0263E0",
    light: "#D5E7FF",
    veryLight: "#FFFFFF"
}

const layout = {
    app: {
        minHeight: "100vh",
    },

    page: {
        padding: "0.25in"
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