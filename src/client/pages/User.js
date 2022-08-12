import { useContext, useEffect } from "react";
import { RiUserFill } from "react-icons/ri";

import { PageContext } from "../app/App";

const icon = style => <RiUserFill style={style}/>

const User = () => {
    const [, setPage] = useContext(PageContext);

    useEffect(() => {
        setPage(() => ({
            title: "User",
            icon: icon,

            backNavigation: {
                title: "Chat",
                link: "/detail"
            }
        }));
    }, [setPage]);

    return (
        <>
            <p>Hello from User!</p>
        </>
    );
};

export default User;