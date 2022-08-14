/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiUserFill } from "react-icons/ri";

import {
    PageContext,
    ChatContext,
    LayoutContext,
    UserContext,
    ColorContext
} from "../app/App";

// Constants

const icon = style => <RiUserFill style={style}/>

// Component

const User = () => {
    const [, setPage] = useContext(PageContext);
    const [chat, setChat] = useContext(ChatContext);
    const layout = useContext(LayoutContext)
    const [user,] = useContext(UserContext)
    const colors = useContext(ColorContext)

    useEffect(() => {
        setPage(() => ({
            title: "User",
            icon: icon,

            backNavigation: {
                title: "Chat",
                link: "/detail"
            }
        }));

        setChat(chat);
    }, [setPage, chat, setChat]);

    return (
        <div style={styles.user(layout.page)}>
            <RiUserFill style={styles.profilePic(colors)}/>

            <label htmlFor={"username"}>Username</label>

            <input
                id={"username"} name={"username"}
                type={"text"} value={user.username}
                disabled={true} style={styles.input(colors)}
            />

            <label htmlFor={"displayName"}>Display Name</label>

            <input
                id={"displayName"} name={"displayName"}
                type={"text"} value={user.displayName}
                disabled={true} style={styles.input(colors)}
            />

            <label htmlFor={"daysOnKik"}>Days on Kik</label>

            <input
                id={"daysOnKik"} name={"daysOnKik"}
                type={"text"} value={"123"}
                disabled={true} style={styles.input(colors)}
            />
        </div>
    );
};

// Exports

export default User;

// Styles

const styles = {
    user: layout => ({
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "0.0625in",

        ...layout
    }),

    profilePic: colors => ({
        height: "3in",
        width: "3in",
        borderRadius: "100%",
        background: colors.dark,
        color: colors.veryLight
    }),

    input: colors => ({
        fontSize: "1.5em",
        fontWeight: "bold",
        color: colors.veryDark,
        background: colors.light,
        borderRadius: "0.0625in",
        padding: "0.0625in",
        border: `1px solid ${colors.dark}`,
        width: "3in"
    })
};