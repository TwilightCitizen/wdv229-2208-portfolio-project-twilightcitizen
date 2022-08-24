/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { ChatContext, UserContext, ColorContext } from "../app/App";

// Component

const ChatDetail = props => {
    const [, setChat] = useContext(ChatContext);
    const [, setUser] = useContext(UserContext);
    const colors = useContext(ColorContext);

    return (
        <div style={styles.chatDetail(props.detail.event)}>
            <p>{props.detail.timeStamp}: </p>

            <p>
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
            </p>

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

                    props.detail.event === "Image" ?
                        <img
                            src={props.detail.content}
                            alt={"No Context Available"}
                            style={styles.media(colors)}
                        /> :

                    props.detail.event === "GIF" ?
                        <video controls autoPlay loop style={styles.media(colors)}>
                            <source src={props.detail.content} type={"video/mp4"}/>

                            <a href={props.detail.content} target={"_blank"} rel="noreferrer">
                                {props.detail.content}
                            </a>
                        </video> : null
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
        alignItems: "top",
        justifyContent: "start",
        gap: "0.125in",
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
    },

    media: colors => ({
        borderRadius: "0.0625in",
        border: `2px solid ${colors.veryLight}`
    })
};