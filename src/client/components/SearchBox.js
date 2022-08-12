const SearchBox = () => {
    return (
        <form style={styles.search}>
            <label htmlFor={"search"}>Search</label>
            <input id={"search"} name={"search"} type={"text"}/>
        </form>
    );
};

export default SearchBox;

const styles = {
    margin: "auto"
};