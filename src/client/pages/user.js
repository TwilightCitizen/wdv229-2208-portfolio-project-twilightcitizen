import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";

import { PageContext } from "../app/App";

const User = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => { setPage(() => 'User'); });

    return (
        <>
            <p>Hello from User!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default User;