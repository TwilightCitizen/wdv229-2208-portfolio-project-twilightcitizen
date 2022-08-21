/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { useFetch } from "react-async";

import { PageContext, LayoutContext } from "../app/App";
import ChatList from "../components/ChatList";

// Constants

const icon = style => <RiDashboardFill style={style}/>
const serverPort = process.env.REACT_APP_SERVER_PORT;
const url = which => `http://localhost:${serverPort}/chats/${which}`;

// Component

const Dashboard = () => {
    const [, setPage] = useContext(PageContext);
    const layout = useContext(LayoutContext);

    const { data: groupChats, error: groupChatsError, isPending: groupChatsPending } = useFetch(
        url("group"), { headers: { accept: "application/json" } }
    );

    const { data: privateChats, error: privateChatsError, isPending: privateChatsPending } = useFetch(
        url("private"), { headers: { accept: "application/json" } }
    );

    useEffect(() => {
        setPage(() => ({
            title: "Dashboard",
            icon: icon,
            showSearch: true
        }));
    }, [setPage]);

    return (
        <div style={styles.dashboard(layout.page)}>
            {
                groupChatsPending ?
                    <h2>Searching for Group Chats</h2> :
                groupChatsError ?
                    <h2>Error Searching for Group Chats</h2> :
                    <ChatList title={"Group Chats"} chats={groupChats}/>
            } {
                privateChatsPending ?
                    <h2>Searching for Private Chats</h2> :
                privateChatsError ?
                    <h2>Error Searching for Private Chats</h2> :
                    <ChatList title={"Private Chats"} chats={privateChats}/>
            }
        </div>
    );
};

// Exports

export default Dashboard;

// Styles

const styles = {
    dashboard: layout => ({
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",

        ...layout
    })
}