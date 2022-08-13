/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RiChat4Fill } from "react-icons/ri";

import { PageContext } from "../app/App";

// Constants

const icon = style => <RiChat4Fill style={style}/>;

// Component

const Detail = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: "Chat",
            icon: icon,
            
            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));
    }, [setPage]);

    return (
        <>
            <p>Hello from Detail!</p>
            <p><NavLink to={"/user"} title={"User"}>User</NavLink></p>
        </>
    );
};

// Exports

export default Detail;

// Styles