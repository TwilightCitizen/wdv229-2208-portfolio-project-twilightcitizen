import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";

import { PageContext } from "../app/App";

const icon = style => <RiDashboardFill style={style}/>

const Dashboard = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: 'Dashboard',
            icon: icon
        }));
    }, [setPage]);

    return (
        <>
            <p>Hello from Dashboard!</p>

            <ul>
                <li><NavLink to={"/detail"} title={"Detail"}>Detail</NavLink></li>
                <li><NavLink to={"/user"} title={"User"}>User</NavLink></li>
                <li><NavLink to={"/search"} title={"Search"}>Search</NavLink></li>
            </ul>
        </>
    );
};

export default Dashboard;