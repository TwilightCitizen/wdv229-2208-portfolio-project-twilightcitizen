/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { ColorContext } from "../app/App";

// Component

const IconNavLink = props => {
    const colors = useContext(ColorContext);
    const [light, setLight] = useState(props.light);

    const lighten = () => { if (props.disabled) return; setLight(true); }
    const darken = () => { if (props.disabled) return; setLight(false); }

    return (
        <NavLink
            to={props.link} title={props.label} style={styles.iconNavLink}
            onMouseOver={darken} onMouseOut={lighten}
            onFocus={darken} onBlur={lighten}
            onMouseDown={lighten} onMouseUp={darken}
            onKeyDown={lighten} onKeyUp={darken}
        >
            {props.icon(styles.icon(colors, light))}
            <p style={styles.label(colors, light)}>{props.label}</p>
        </NavLink>
    );
};

// Exports

export default IconNavLink;

// Styles

const styles = {
    iconNavLink: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "0.0625in",
        marginLeft: "auto",
        marginRight: "0.25in",
        textDecoration: "none"
    },

    icon: (colors, light = true) => ({
        color: light? colors.veryLight : colors.light,
    }),

    label: (colors, light = true) => ({
        color: light? colors.veryLight : colors.light,
        fontWeight: "bold",
    })
};