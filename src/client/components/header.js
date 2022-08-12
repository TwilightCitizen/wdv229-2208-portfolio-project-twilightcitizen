import { useContext } from "react";

import { ColorContext, LayoutContext } from "../app/App";

const Header = () => {
    const colors = useContext(ColorContext)
    const layout = useContext(LayoutContext);

    return (
        <header style={styles.header(layout.header, colors)}>
            <p>Hello from Header!</p>
        </header>
    );
};

export default Header;

const styles = {
    header: (layout, colors) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        ...layout,

        background: colors.dark,
        color: colors.veryLight
    })
};