/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { RiErrorWarningFill } from "react-icons/ri";
import { useContext, useEffect } from "react";

import { PageContext, LayoutContext } from "../app/App";

// Constants

const icon = style => <RiErrorWarningFill style={style}/>;

// Component

const Error404 = () => {
    const [, setPage] = useContext(PageContext);
    const layout = useContext(LayoutContext);

    useEffect(() => {
        setPage(() => ({
            title: "Error 404 - Not Found",
            icon: icon,
            background: "ExclamationPoints.svg",

            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));
    }, [setPage]);

    return (
        <div style={styles.error404(layout.page)}>
            <h2>Yikes!</h2>
            <p>We're not quite sure how you got here, but that didn't work.</p>
            <p>If you got here by clicking a link in the app, something's broken, and we need to fix it.</p>
            <p>If you added this page to your favorites or bookmarks, navigated directly to a page other than the dashboard, or used your browser's back or forward buttons, that's the problem.  Just use the links in the app for now, and it should work.</p>
        </div>
    );
};

// Exports

export default Error404;

// Styles

const styles = {
    error404: layout => ({
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",

        ...layout
    })
};