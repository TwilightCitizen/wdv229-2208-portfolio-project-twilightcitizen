/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiSearchFill } from "react-icons/ri";

import { PageContext, SearchContext } from "../app/App";

// Constants

const icon = style => <RiSearchFill style={style}/>

// Component

const Search = () => {
    const [, setPage] = useContext(PageContext);
    const [search, setSearch] = useContext(SearchContext);
    const searchTerms = search;

    useEffect(() => {
        setPage(() => ({
            title: "Search",
            icon: icon,

            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));

        return () => setSearch("");
    }, [setPage]);

    return (
        <>
            <p>You searched for {searchTerms}</p>
        </>
    );
};

// Exports

export default Search;

// Styles