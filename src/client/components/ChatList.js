/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { ChatContext } from "../app/App";

// Component

const ChatList = props => {
    const [,setChat] = useContext(ChatContext);

    const chats = props.chats.map((chat, index) => {
        const onClick = () => { setChat(chat); };

        return (
            <li style={styles.chat} key={index}>
                <NavLink to={"/detail"} title={chat.displayName} onClick={onClick}>
                    {chat.displayName}
                </NavLink>
            </li>
        );
    });

    return (
        <div>
            <h2>{props.title}</h2>

            {
                chats.length > 0 ?
                    <ul>{chats}</ul> :
                    <p>It looks like there are no {props.title} right now.</p>
            }
        </div>
    );
};

// Exports

export default ChatList;

// Styles

const styles = {
    chat: {
        margin: "0.125in auto"
    }
};