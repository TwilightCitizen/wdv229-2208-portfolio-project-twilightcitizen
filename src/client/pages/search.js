import { NavLink } from "react-router-dom";

const Search = () => {
    return (
        <>
            <p>Hello from Search!</p>
            <p><NavLink to={"/dashboard"} title={"Dashboard"}>Dashboard</NavLink></p>
        </>
    );
};

export default Search;