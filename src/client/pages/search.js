import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RiSearchFill } from "react-icons/ri";

import { PageContext } from "../app/App";

const icon = style => <RiSearchFill style={style}/>

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

export default Search;