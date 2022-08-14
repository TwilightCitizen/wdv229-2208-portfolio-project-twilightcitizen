/*
David A. Clark, Jr.
#0004796375
WDV229 2208
Portfolio Project
*/

// Imports

import { useContext, useEffect } from "react";
import { RiDashboardFill } from "react-icons/ri";

import { PageContext, LayoutContext } from "../app/App";
import ChatList from "../components/ChatList";

// Constants

const icon = style => <RiDashboardFill style={style}/>

// Component

const Dashboard = () => {
    const [, setPage] = useContext(PageContext);
    const layout = useContext(LayoutContext);

    useEffect(() => {
        setPage(() => ({
            title: "Dashboard",
            icon: icon,
            showSearch: true
        }));
    }, [setPage]);

    return (
        <div style={styles.dashboard(layout.page)}>
            <ChatList title={"Group Chats"} chats={groupChats}/>
            <ChatList title={"Private Chats"} chats={privateChats}/>
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

// Mock Data

const privateChats = [
    {
        jid: "kikteam@talk.kik.com",
        username: "kikteam",
        displayName: "Kik Team"
    }, {
        jid: "fakeuser1@talk.kik.com",
        username: "fakeuser1",
        displayName: "Fake User 1"
    }, {
        jid: "fakeuser1@talk.kik.com",
        username: "fakeuser2",
        displayName: "Fake User 2"
    }, {
        jid: "fakeuser1@talk.kik.com",
        username: "fakeuser3",
        displayName: "Fake User 3"
    }, {
        jid: "fakeuser1@talk.kik.com",
        username: "fakeuser4",
        displayName: "Fake User 4"
    }
];

const groupChats = [
    {
        jid: "1234567891_g@groups.kik.com",
        displayName: "Fake Group 1"
    }, {
        jid: "1234567892_g@groups.kik.com",
        displayName: "Fake Group 2"
    }, {
        jid: "1234567893_g@groups.kik.com",
        displayName: "Fake Group 3"
    }, {
        jid: "1234567894_g@groups.kik.com",
        displayName: "Fake Group 4"
    }, {
        jid: "1234567895_g@groups.kik.com",
        displayName: "Fake Group 5"
    },
];