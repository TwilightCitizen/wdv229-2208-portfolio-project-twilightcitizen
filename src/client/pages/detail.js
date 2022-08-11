import { NavLink } from "react-router-dom";

const Detail = () => {
    return (
        <>
            <p>Hello from Detail!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default Detail;