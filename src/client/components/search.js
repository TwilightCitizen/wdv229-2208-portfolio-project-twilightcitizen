const Search = () => {
    return (
        <form style={styles.search}>
            <label htmlFor={"search"}>Search</label>
            <input id={"search"} name={"search"} type={"text"}/>
        </form>
    );
};

export default Search;

const styles = {
    marginLeft: "1in",
    marginRight: "auto"
};