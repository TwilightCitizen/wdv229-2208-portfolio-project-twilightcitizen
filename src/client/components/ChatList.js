/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { NavLink } from "react-router-dom";

// Component

const ChatList = props => {
    const chats = props.chats.map((element, index) => {
        const onClick = () => console.log("clicked");

        return (
            <li style={styles.chat} key={index}>
                <NavLink to={"/detail"} title={element.displayName} onClick={onClick}>
                    {element.displayName}
                </NavLink>
            </li>
        );
    });

    return (
        <div>
            <h2>{props.title}</h2>
            {chats.length > 0 ? <ul>{chats}</ul> : <p>It looks like there are no {props.title} right now.</p>}
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