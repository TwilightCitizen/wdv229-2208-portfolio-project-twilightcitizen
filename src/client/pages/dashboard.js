import { NavLink } from "react-router-dom";

const Dashboard = () => {
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