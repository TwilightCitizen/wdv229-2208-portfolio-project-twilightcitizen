/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

// Component

import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { ChatContext, UserContext } from "../app/App";

const ChatDetail = props => {
    const [, setChat] = useContext(ChatContext);
    const [, setUser] = useContext(UserContext);

    return (
        <div style={styles.chatDetail(props.detail.event)}>
            <p>{props.detail.timeStamp}: </p>

            <NavLink
                to={"/user"}
                title={props.detail.user.displayName}
                style={styles.user}

                onClick={() => {
                    setChat(props.chat);
                    setUser(props.detail.user)
                }}
            >
                {props.detail.user.displayName}
            </NavLink>

            <p style={styles.event}>
                {
                    props.detail.event === "chat" ? "Said: " :
                    props.detail.event === "join" ? "Joined." :
                    props.detail.event === "leave" ? "Left." :
                    props.detail.event === "image" ? "Sent an Image: " :
                    props.detail.event === "gif" ? "Sent a GIF: " : null
                }
            </p>

            <p>
                {
                    props.detail.event === "chat" ? props.detail.content :
                    props.detail.event === "join" || props.detail.event === "leave" ? null :
                    props.detail.event === "image" || props.detail.event === "gif" ?

                    <a href={props.detail.content} target={"_blank"} rel="noreferrer">
                        {props.detail.content}
                    </a> : null
                }
            </p>
        </div>
    );
};

// Exports

export default ChatDetail;

// Styles

const styles = {
    chatType: {
        background: "#4488FF44",
        borderBottom: "2px solid #4488FF"
    },

    joinType: {
        background: "#88FF8844",
        borderBottom: "2px solid #88FF88"
    },

    leaveType: {
        background: "#FF888844",
        borderBottom: "2px solid #FF8888"
    },

    imageType: {
        background: "#4488FF44",
        borderBottom: "2px solid #4488FF"
    },

    gifType: {
        background: "#4488FF44",
        borderBottom: "2px solid #4488FF"
    },

    chatDetail: detailType => ({
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "start",
        gap: "0.0625in",
        padding: "0.0625in",
        borderRadius: "0.0625in",
        background: "#DDDDDD",

        ...styles[`${detailType}Type`]
    }),

    user: {
        fontWeight: "bold"
    },

    event: {
        fontWeight: "bold"
    }
};