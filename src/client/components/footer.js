import { useContext } from "react";

import { LayoutContext } from "../app/App";

const Footer = () => {
    const layout = useContext(LayoutContext);

    return (
        <footer style={styles.footer(layout.footer)}>
            <p>Hello from Footer!</p>
        </footer>
    );
};

export default Footer;

const styles = {
    footer: layout => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...layout
    })
};