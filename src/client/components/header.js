import { useContext } from "react";

import { LayoutContext } from "../app/App";

const Header = () => {
    const layout = useContext(LayoutContext);

    return (
        <header style={styles.header(layout.header)}>
            <p>Hello from Header!</p>
        </header>
    );
};

export default Header;

const styles = {
    header: layout => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...layout
    })
};