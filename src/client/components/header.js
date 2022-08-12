import { useContext } from "react";

import { ColorContext, LayoutContext, PageContext } from "../app/App";
import { NavLink } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";

const Header = () => {
    const colors = useContext(ColorContext)
    const layout = useContext(LayoutContext);
    const [page,] = useContext(PageContext);
    const icon = page.icon ? page.icon(styles.icon) : <></>;

    const backNavigation = (backNavigation => {
        if (!backNavigation) return;

        return (
            <NavLink to={backNavigation.link} title={backNavigation.title} style={styles.backNavigation}>
                <RiArrowGoBackFill style={styles.backNavigationArrow(colors)}/>
                <p style={styles.backNavigationLabel(colors)}>Go back to {backNavigation.title}</p>
            </NavLink>
        )
    })(page.backNavigation);

    return (
        <header style={styles.header(layout.header, colors)}>
            {icon}
            <h1>{page.title}</h1>
            {backNavigation}
        </header>
    );
};

export default Header;

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