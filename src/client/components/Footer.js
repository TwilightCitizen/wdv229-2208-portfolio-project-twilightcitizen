/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext } from "react";

import { ColorContext, LayoutContext } from "../app/App";

// Component

const Footer = () => {
    const colors = useContext(ColorContext);
    const layout = useContext(LayoutContext);

    return (
        <footer style={styles.footer(layout.footer, colors)}>
            <p style={styles.title}>WDV2 2208 Portfolio Project by David A. Clark, Jr.</p>
        </footer>
    );
};

// Exports

export default Footer;

// Styles

const styles = {
    footer: (layout, colors) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        ...layout,

        background: colors.light
    }),

    title: {
        display: "flex"
    }
};