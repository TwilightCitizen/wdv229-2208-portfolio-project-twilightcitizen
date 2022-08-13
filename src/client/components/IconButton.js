/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useState } from "react";

import { ColorContext } from "../app/App";

// Component

const IconButton = props => {
    const colors = useContext(ColorContext);
    const [light, setLight] = useState(props.light);

    const lighten = () => { if (props.disabled) return; setLight(true); }
    const darken = () => { if (props.disabled) return; setLight(false); }

    return (
        <>
            <label htmlFor={"button"} style={styles.label}>{props.label}</label>

            <button
                id={"button"} name={"button"} style={styles.button(colors, light)}
                onMouseOver={darken} onMouseOut={lighten}
                onFocus={darken} onBlur={lighten}
                onMouseDown={lighten} onMouseUp={darken}
                onKeyDown={lighten} onKeyUp={darken}
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.icon(styles.icon(colors, light))}
            </button>
        </>
    );
};

// Exports

export default IconButton;

// Styles

const styles = {
    button: (colors, light) => ({
        padding: "0",
        borderRadius: "100%",
        background: colors.veryLight,
        border: `1px solid ${light ? colors.light : colors.veryLight}`
    }),

    icon: (colors, light = false) => ({
        height: "0.25in",
        width: "auto",
        background: colors.veryLight,
        color: light? colors.light : colors.dark
    }),

    label: {
        visibility: "hidden",
        width: "0"
    },
};