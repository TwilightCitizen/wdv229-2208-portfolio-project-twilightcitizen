import { useContext } from "react";

import { ColorContext, LayoutContext, PageContext } from "../app/App";

const Header = () => {
    const colors = useContext(ColorContext)
    const layout = useContext(LayoutContext);
    const [page,] = useContext(PageContext);

    return (
        <header style={styles.header(layout.header, colors)}>
            <h1>{page}</h1>
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