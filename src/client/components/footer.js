import { useContext } from "react";

import { ColorContext, LayoutContext } from "../app/App";

const Footer = () => {
    const colors = useContext(ColorContext);
    const layout = useContext(LayoutContext);

    return (
        <footer style={styles.footer(layout.footer, colors)}>
            <p>Hello from Footer!</p>
        </footer>
    );
};

export default Footer;

const styles = {
    footer: (layout, colors) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        ...layout,

        background: colors.light
    })
};