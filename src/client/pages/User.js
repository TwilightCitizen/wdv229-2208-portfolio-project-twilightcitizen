/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiUserFill } from "react-icons/ri";

import { PageContext, ChatContext } from "../app/App";

// Constants

const icon = style => <RiUserFill style={style}/>

// Component

const User = () => {
    const [, setPage] = useContext(PageContext);
    const [chat, setChat] = useContext(ChatContext);

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
        <p>Hello from User!</p>
    );
};

// Exports

export default User;

// Styles