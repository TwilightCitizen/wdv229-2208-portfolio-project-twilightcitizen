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

    console.log(selectedChat._id);

    const isGroup = selectedChat._id.split("@")[1] === "groups.kik.com";
    const headerRest = `${isGroup ? "in" : "with"} ${selectedChat.displayName}`;

    const { data: chatDetails, error: chatDetailsError, isPending: chatDetailsPending } = useFetch(
        url(selectedChat._id), { headers: { accept: "application/json" } }
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
            {
                chatDetailsPending ?
                    <h2>Searching for Chat Details {headerRest}</h2> :
                chatDetailsError ?
                    <h2>Error Searching for Chat Details {headerRest}</h2> :
                    <h2>Chat Details {headerRest}</h2>
            } {
                chatDetails ? chatDetails.map((chatDetail, index) =>
                    <ChatDetail detail={chatDetail} chat={selectedChat} key={index}/>
                ) : null
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