/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { useFetch } from "react-async";
import { RiChat4Fill } from "react-icons/ri";

import { PageContext, ChatContext, LayoutContext } from "../app/App";
import ChatDetail from "../components/ChatDetail";

// Constants

const icon = style => <RiChat4Fill style={style}/>;
const serverPort = process.env.REACT_APP_SERVER_PORT;
const url = id => `http://localhost:${serverPort}/details/${id}`;

// Component

const Detail = () => {
    const [, setPage] = useContext(PageContext);
    const [chat, setChat] = useContext(ChatContext);
    const layout = useContext(LayoutContext);
    const selectedChat = chat;

    const isGroup = selectedChat._id.split("@")[1] === "groups.kik.com";
    const headerRest = `${isGroup ? "in" : "with"} ${selectedChat.displayName}`;

    const {
        data: chatDetails,
        error: chatDetailsError,
        isPending: chatDetailsPending
    } = useFetch(
        url(selectedChat._id), { headers: { accept: "application/json" } }
    );

    useEffect(() => {
        setPage(() => ({
            title: `Chat ${isGroup ? "in" : "with"} ${selectedChat.displayName}`,
            icon: icon,
            background: "ChatBubbles.svg",
            
            backNavigation: {
                title: "Dashboard",
                link: "/dashboard"
            }
        }));

        return () => setChat({});
    }, [setPage, setChat, isGroup, selectedChat.displayName]);

    return (
        <div style={styles.detail(layout.page)}>
            {
                chatDetailsPending ?
                    <h2>Searching for Chat Details {headerRest}</h2> :
                chatDetailsError ?
                    <h2>Error Searching for Chat Details {headerRest}</h2> :
                    <h2>Chat Details {headerRest}</h2>
            } {
                chatDetails?.length > 0 ?
                    chatDetails.map((chatDetail, index) =>
                        <ChatDetail detail={chatDetail} chat={selectedChat} key={index}/>
                    ) :

                    <>
                        <p>It looks like there are no chat events recorded for this chat.  That is normal if you just started running this app on your machine because the database would be empty of chat events.</p>

                        {
                            isGroup ?
                                <p>Try logging into Kik with one of the test accounts and chatting in this group.  That should generate some chat events for the Kik bot to save.  Then, select this group chat from the Dashboard again, and those chat events should be recorded here.</p> :

                                <>
                                    <p>Try logging into Kik with one of the test accounts and chatting privately with the Kik bot.  That should generate some chat events for the Kik bot to save.  Then, select that private chat from the Dashboard, and you should see those chat events recorded.</p>

                                    <p><b>Note:</b>  If you selected a private chat with someone other than one of the test accounts, you will not be able to log into Kik with that account to chat with the Kik bot.</p>
                                </>
                        }
                    </>
            }
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