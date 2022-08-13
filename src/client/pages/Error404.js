/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { PageContext } from "../app/App";
import { RiErrorWarningFill } from "react-icons/ri";
import { useContext, useEffect } from "react";

// Constants

const icon = style => <RiErrorWarningFill style={style}/>

// Component

const Error404 = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: 'Error 404 - Not Found',
            icon: icon,

            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));
    }, [setPage]);

    return (
        <>
            <h2>Yikes!</h2>
            <p>We're sure how you got here, but we couldn't find anything to match that request.</p>
        </>
    );
};

// Exports

export default Error404;

// Styles