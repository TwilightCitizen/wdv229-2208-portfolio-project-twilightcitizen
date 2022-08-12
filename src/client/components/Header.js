/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

import { ColorContext, LayoutContext, PageContext } from "../app/App";
import SearchBox from "./SearchBox"

// Component

const Header = () => {
    const colors = useContext(ColorContext)
    const layout = useContext(LayoutContext);
    const [page,] = useContext(PageContext);
    const icon = page.icon ? page.icon(styles.icon) : <></>;

    const backNavigation = backNavigation => {
        if (!backNavigation) return;

        return (
            <NavLink to={backNavigation.link} title={backNavigation.title} style={styles.backNavigation}>
                <RiArrowGoBackFill style={styles.backNavigationArrow(colors)}/>
                <p style={styles.backNavigationLabel(colors)}>Go back to {backNavigation.title}</p>
            </NavLink>
        )
    };

    return (
        <header style={styles.header(layout.header, colors)}>
            {icon}
            <h1>{page.title}</h1>
            {page.showSearch ? <SearchBox style={styles.search}/> : null}
            {backNavigation(page.backNavigation)}
        </header>
    );
};

// Exports

export default Header;

// Styles

const styles = {
    header: (layout, colors) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",

        ...layout,

        background: colors.dark,
        color: colors.veryLight
    }),

    icon: {
        height: "0.75in",
        margin: "0.25in",
        width: "auto"
    },

    search: {
        marginLeft: "auto",
        marginRight: "0.25in",
    },

    backNavigation: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.0625in",
        marginLeft: "auto",
        marginRight: "0.25in",
        textDecoration: "none"
    },

    backNavigationArrow: colors => ({
        color: colors.veryLight,
    }),

    backNavigationLabel: colors => ({
        color: colors.veryLight,
        fontWeight: "bold",

    })
};