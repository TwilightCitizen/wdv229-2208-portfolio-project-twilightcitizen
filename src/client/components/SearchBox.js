/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { RiSearchFill, RiArrowRightCircleFill } from "react-icons/ri";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ColorContext, SearchContext } from "../app/App";
import IconButton from "./IconButton";

// Constants

const buttonIcon = style => <RiArrowRightCircleFill style={style}/>;
const searchPattern = /^[0-9a-zA-Z]+$/;

// Component

const SearchBox = props => {
    const colors = useContext(ColorContext);
    const [,setSearch] = useContext(SearchContext);
    const [searchText, setSearchText] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate()

    const onSearchTextChange = value => {
        if (!value.match(searchPattern)) {
            setButtonDisabled(true);

            return;
        }

        setSearchText(value);
        setButtonDisabled(false);
    };

    const onButtonClick = () => {
        setSearch(searchText);
        navigate("/search");
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

            <IconButton
                light={true}
                disabled={buttonDisabled}
                label={"Go"}
                icon={buttonIcon}
                onClick={onButtonClick}
            />
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
    }
}