import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";

import { PageContext } from "../app/App";

const Search = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => { setPage(() => 'Search'); });

    return (
        <>
            <p>Hello from Search!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default Search;