/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiSearchFill } from "react-icons/ri";
import { useFetch } from "react-async";

import { LayoutContext, PageContext, SearchContext } from "../app/App";


// Constants

const icon = style => <RiSearchFill style={style}/>
const serverPort = process.env.REACT_APP_SERVER_PORT;
const url = term => `http://localhost:${serverPort}/search/${term}`;

// Component

const Search = () => {
    const [, setPage] = useContext(PageContext);
    const [search, setSearch] = useContext(SearchContext);
    const layout = useContext(LayoutContext)
    const searchTerms = search;

    const { data: groups, error: groupsError, isPending: groupsPending } = useFetch(
        url(searchTerms), { headers: { accept: "application/json" } }
    );

    const searchResults = groups?.map((group, index) =>
        <p key={index}>{group.displayName}</p>
    );

    useEffect(() => {
        setPage(() => ({
            title: `Search for "${searchTerms}"`,
            icon: icon,

            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));

        return () => setSearch("");
    }, [setPage, setSearch, searchTerms]);

    return (
        <div style={styles.search(layout.page)}>
            {
                groupsPending ?
                    <h2>Searching for Groups Matching "{searchTerms}</h2> :
                groupsError ?
                    <h2>Error Searching for Groups</h2> :
                searchResults.length ?
                    <h2>Found Some Groups Matching "{searchTerms}":</h2> :
                    <h2>Found No Groups Matching "{searchTerms}".</h2>
            }

            {searchResults}
        </div>
    );
};

// Exports

export default Search;

// Styles

const styles = {
    search: layout => ({
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",

        ...layout
    })
};