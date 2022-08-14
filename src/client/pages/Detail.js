/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiChat4Fill } from "react-icons/ri";

import { PageContext, ChatContext, LayoutContext } from "../app/App";
import ChatDetail from "../components/ChatDetail";

// Constants

const icon = style => <RiChat4Fill style={style}/>;

// Component

const Detail = () => {
    const [, setPage] = useContext(PageContext);
    const [chat, setChat] = useContext(ChatContext);
    const layout = useContext(LayoutContext);
    const selectedChat = chat;
    const isGroup = selectedChat.jid.split("@")[1].split(".")[0] === "groups";

    const chatDetails = (isGroup ? groupChatEvents : privateChatEvents(selectedChat))
        .map((chatDetail, index) =>
            <ChatDetail detail={chatDetail} chat={selectedChat} key={index}/>
        );

    useEffect(() => {
        setPage(() => ({
            title: `Chat ${isGroup ? "in" : "with"} ${selectedChat.displayName}`,
            icon: icon,
            
            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));

        return () => setChat({});
    }, [setPage, setChat, isGroup, selectedChat.displayName]);

    return (
        <div style={styles.detail(layout.page)}>
            <h2>Chat Details {isGroup ? "in" : "with"} {selectedChat.displayName}</h2>
            {chatDetails}
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
        gap: "0.125in",

        ...layout
    })
};

// Mock Data

const groupChatUser = {
    jid: "fakeuser1@talk.kik.com",
    username: "fakeuser1",
    displayName: "Fake User 1"
};

const groupChatEvents = [
    {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:08",
        event: "join",
        content: ""
    }, {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:08",
        event: "chat",
        content: "Hey, group!  How goes it?"
    }, {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:12",
        event: "image",
        content: "http://link.to.image.png"
    }, {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:13",
        event: "chat",
        content: "Sure is quiet in here."
    }, {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:14",
        event: "gif",
        content: "http://link.to.gif.mp4"
    }, {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:08",
        event: "leave",
        content: ""
    }
];

const privateChatEvents = privateChatUser => ([
    {
        user: privateChatUser,
        timeStamp: "2022-08-14, 14:08",
        event: "chat",
        content: "Hey, bot!  How goes it?"
    }, {
        user: privateChatUser,
        timeStamp: "2022-08-14, 14:09",
        event: "chat",
        content: "How come you never say anything?"
    }, {
        user: privateChatUser,
        timeStamp: "2022-08-14, 14:10",
        event: "image",
        content: "http://link.to.image.png"
    }, {
        user: groupChatUser,
        timeStamp: "2022-08-14, 14:11",
        event: "gif",
        content: "http://link.to.gif.mp4"
    }
]);