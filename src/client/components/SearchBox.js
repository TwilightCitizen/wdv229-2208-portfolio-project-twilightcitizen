const SearchBox = props => {
    return (
        <form style={props.style}>
            <label htmlFor={"search"}>Search</label>
            <input id={"search"} name={"search"} type={"text"}/>
        </form>
    );
};

export default SearchBox;