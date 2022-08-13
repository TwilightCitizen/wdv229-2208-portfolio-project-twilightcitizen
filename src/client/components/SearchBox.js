/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { RiSearchFill, RiArrowRightCircleFill } from "react-icons/ri";
import { useContext, useState } from "react";

import { ColorContext } from "../app/App";

// Component

const SearchBox = props => {
    const colors = useContext(ColorContext);
    const [isLight, setIsLight] = useState(true);
    const [isDisabled, setIsDisabled] = useState(true);
    const [searchText, setSearchText] = useState("");

    const lighten = () => { if (isDisabled) return; setIsLight(true); }
    const darken = () => { if (isDisabled) return; setIsLight(false); }

    const onSearchTextChange = value => {
        setSearchText(value);
        setIsDisabled(value === '');
    };

    return (
        <div style={{...props.style, ...styles.search(colors)}}>
            <RiSearchFill style={styles.searchIcon(colors)}/>

            <label htmlFor={"search"} style={styles.label}>Search</label>

            <input
                id={"search"} name={"search"}
                type={"text"} placeholder={"Search for Groups"}
                style={styles.field}
                onChange={event => onSearchTextChange(event.target.value)}
            />

            <label htmlFor={"button"} style={styles.label}>Go</label>

            <button
                id={"button"} name={"button"} style={styles.button(colors, isLight)}
                onMouseOver={darken} onMouseOut={lighten}
                onFocus={darken} onBlur={lighten}
                onMouseDown={lighten} onMouseUp={darken}
                onKeyDown={lighten} onKeyUp={darken}
                disabled={isDisabled}
            >
                <RiArrowRightCircleFill style={styles.goIcon(colors, isLight)}/>
            </button>
        </div>
    );
};

// Exports

export default SearchBox;

// Styles

const styles = {
    search: colors => ({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        background: colors.veryLight,
        padding: "0.0625in",
        borderRadius: "0.03125in"
    }),

    searchIcon: colors => ({
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

    button: (colors, isLight) => ({
        padding: "0",
        borderRadius: "100%",
        background: colors.veryLight,
        border: `1px solid ${isLight ? colors.light : colors.veryLight}`
    }),

    goIcon: (colors, isLight = false) => ({
        height: "0.25in",
        width: "auto",
        background: colors.veryLight,
        color: isLight? colors.light : colors.dark
    }),
}