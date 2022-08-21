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
                title={props.detail.fromUser.displayName}
                style={styles.user}

                onClick={() => {
                    setChat(props.chat);
                    setUser(props.detail.fromUser)
                }}
            >
                {props.detail.fromUser.displayName}
            </NavLink>

            <p style={styles.event}>
                {
                    props.detail.event === "Chat" ? "Said: " :
                    props.detail.event === "Join" ? "Joined." :
                    props.detail.event === "Leave" ? "Left." :
                    props.detail.event === "Image" ? "Sent an Image: " :
                    props.detail.event === "GIF" ? "Sent a GIF: " : null
                }
            </p>

            <p>
                {
                    props.detail.event === "Chat" ? props.detail.content :
                    props.detail.event === "Join" || props.detail.event === "Leave" ? null :
                    props.detail.event === "Image" || props.detail.event === "GIF" ?

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
    ChatType: {
        background: "#4488FF44",
        borderBottom: "2px solid #4488FF"
    },

    JoinType: {
        background: "#88FF8844",
        borderBottom: "2px solid #88FF88"
    },

    LeaveType: {
        background: "#FF888844",
        borderBottom: "2px solid #FF8888"
    },

    ImageType: {
        background: "#4488FF44",
        borderBottom: "2px solid #4488FF"
    },

    GIFType: {
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
        borderBottom: "2px solid #888888",

        ...styles[`${detailType}Type`]
    }),

    user: {
        fontWeight: "bold"
    },

    event: {
        fontWeight: "bold"
    }
};