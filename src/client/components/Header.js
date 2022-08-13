/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

import { ColorContext, LayoutContext, PageContext } from "../app/App";
import SearchBox from "./SearchBox"
import IconNavLink from "./IconNavLink";

// Constants

const backNavigationIcon = style => <RiArrowGoBackFill style={style}/>

// Component

const Header = () => {
    const colors = useContext(ColorContext)
    const layout = useContext(LayoutContext);
    const [page,] = useContext(PageContext);
    const icon = page.icon ? page.icon(styles.icon) : <></>;

    return (
        <header style={styles.header(layout.header, colors)}>
            {icon}
            <h1>{page.title}</h1>
            {page.showSearch ? <SearchBox style={styles.search}/> : null}

            {page.backNavigation ?
                <IconNavLink
                    link={page.backNavigation.link}
                    label={`Back to ${page.backNavigation.title}`}
                    icon={backNavigationIcon}
                /> : null
            }
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
    }
};