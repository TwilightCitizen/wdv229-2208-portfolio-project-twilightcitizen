import { useContext } from "react";

import { ColorContext, LayoutContext, PageContext } from "../app/App";

const Header = () => {
    const colors = useContext(ColorContext)
    const layout = useContext(LayoutContext);
    const [page,] = useContext(PageContext);
    const icon = page.icon ? page.icon(styles.icon) : <></>;

    return (
        <header style={styles.header(layout.header, colors)}>
            {icon}
            <h1>{page.title}</h1>
        </header>
    );
};

export default Header;

const styles = {
    icon: {
        height: "0.75in",
        margin: "0.25in",
        width: "auto"
    },

    header: (layout, colors) => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",

        ...layout,

        background: colors.dark,
        color: colors.veryLight
    })
};