import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";

import { PageContext } from "../app/App";

const Detail = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => { setPage(() => 'Detail'); });

    return (
        <>
            <p>Hello from Detail!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default Detail;