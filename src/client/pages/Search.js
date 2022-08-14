/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiSearchFill } from "react-icons/ri";

import { LayoutContext, PageContext, SearchContext } from "../app/App";

// Constants

const icon = style => <RiSearchFill style={style}/>

// Component

const Search = () => {
    const [, setPage] = useContext(PageContext);
    const [search, setSearch] = useContext(SearchContext);
    const layout = useContext(LayoutContext)
    const searchTerms = search;

    const searchResults = groups
        .filter(group => group.displayName.toLowerCase().includes(searchTerms.toLowerCase()))
        .map((group, index) => <p key={index}>{group.displayName}</p>);

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
    }, [setPage]);

    return (
        <div style={styles.search(layout.page)}>
            {
                searchResults.length ?
                <h2>Here are groups matching "{searchTerms}":</h2> :
                <h2>There are no groups matching "{searchTerms}".</h2>
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

// Mock Data

const groups = [
    {
        jid: "1234567891_g@groups.kik.com",
        displayName: "Cats"
    }, {
        jid: "1234567892_g@groups.kik.com",
        displayName: "Cats are Great"
    }, {
        jid: "1234567893_g@groups.kik.com",
        displayName: "We Hate Cats"
    },  {
        jid: "1234567894_g@groups.kik.com",
        displayName: "Cat Lovers"
    }, {
        jid: "1234567891_g@groups.kik.com",
        displayName: "Dogs"
    }, {
        jid: "1234567892_g@groups.kik.com",
        displayName: "Dogs are Great"
    }, {
        jid: "1234567893_g@groups.kik.com",
        displayName: "We Hate Dogs"
    },  {
        jid: "1234567894_g@groups.kik.com",
        displayName: "Dog Lovers"
    }, {
        jid: "1234567891_g@groups.kik.com",
        displayName: "Bunnies"
    }, {
        jid: "1234567892_g@groups.kik.com",
        displayName: "Bunnies are Great"
    }, {
        jid: "1234567893_g@groups.kik.com",
        displayName: "We Hate Bunnies"
    },  {
        jid: "1234567894_g@groups.kik.com",
        displayName: "Bunny Lovers"
    },
];