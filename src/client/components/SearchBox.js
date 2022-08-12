import { RiSearchFill, RiArrowRightCircleFill } from "react-icons/ri";
import { useContext } from "react";

import { ColorContext } from "../app/App";

const SearchBox = props => {
    const colors = useContext(ColorContext);

    return (
        <div style={{...props.style, ...styles.search(colors)}}>
            <RiSearchFill style={styles.icon(colors)}/>

            <label htmlFor={"search"} style={styles.label}>Search</label>
            <input id={"search"} name={"search"} type={"text"} placeholder={"Search for Groups"} style={styles.field}/>

            <label htmlFor={"button"} style={styles.label}>Go</label>

            <button id={"button"} name={"button"} style={styles.button(colors)}>
                <RiArrowRightCircleFill style={styles.icon(colors)}/>
            </button>
        </div>
    );
};

const styles = {
    search: colors => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: colors.veryLight,
        padding: "0.0625in",
        borderRadius: "0.03125in"
    }),

    icon: colors => ({
        height: "0.25in",
        width: "auto",
        background: colors.veryLight,
        color: colors.dark
    }),

    label: {
        visibility: "hidden",
        width: "0"
    },

    field: {
        border: "none",
        width: "3in"
    },

    button: colors => ({
        padding: "0",
        borderRadius: "100%",
        background: colors.veryLight
    })
}

export default SearchBox;