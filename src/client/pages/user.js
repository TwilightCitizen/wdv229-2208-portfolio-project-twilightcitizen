import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { RiUserFill } from "react-icons/ri";

import { PageContext } from "../app/App";

const icon = style => <RiUserFill style={style}/>

const User = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: 'User',
            icon: icon
        }));
    }, [setPage]);

    return (
        <>
            <p>Hello from User!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default User;