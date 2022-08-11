import { NavLink } from "react-router-dom";

const User = () => {
    return (
        <>
            <p>Hello from User!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default User;