/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";

import { PageContext } from "../app/App";

// Constants

const icon = style => <RiDashboardFill style={style}/>

// Component

const Dashboard = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: 'Dashboard',
            icon: icon,
            showSearch: true
        }));
    }, [setPage]);

    return (
        <>
            <p>Hello from Dashboard!</p>
            <p><NavLink to={"/detail"} title={"Chat"}>Chat</NavLink></p>
            <p><NavLink to={"/search"} title={"Search"}>Search</NavLink></p>
        </>
    );
};

// Exports

export default Dashboard;

// Styles