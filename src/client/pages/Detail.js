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

import { PageContext, ChatContext, LayoutContext } from "../app/App";

// Constants

const icon = style => <RiChat4Fill style={style}/>;

// Component

const Detail = () => {
    const [, setPage] = useContext(PageContext);
    const [chat, setChat] = useContext(ChatContext);
    const layout = useContext(LayoutContext);
    const chatDetails = chat;
    const isGroup = chatDetails.jid.split("@")[1].split(".")[0] === "groups";

    useEffect(() => {
        setPage(() => ({
            title: `Chat ${isGroup ? "in" : "with"} ${chatDetails.displayName}`,
            icon: icon,
            
            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));

        return () => setChat({});
    }, [setPage]);

    return (
        <div style={styles.detail(layout.page)}>
            <p>Chat details {isGroup ? "in" : "with"} {chatDetails.displayName}</p>
            <p><NavLink to={"/user"} title={"User"}>User</NavLink></p>
        </div>
    );
};

// Exports

export default Detail;

// Styles

const styles = {
    detail: layout => ({
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",

        ...layout
    })
};