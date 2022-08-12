/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RiSearchFill } from "react-icons/ri";

import { PageContext } from "../app/App";

// Constants

const icon = style => <RiSearchFill style={style}/>

// Component

const Search = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: "Search",
            icon: icon,

            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));
    }, [setPage]);

    return (
        <>
            <p>Hello from Search!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

// Exports

export default Search;

// Styles