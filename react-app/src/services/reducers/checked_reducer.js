function checkedReducer(state, action) {
    let { type, item } = action;
    let checked = [state]
    if (type === "GET_CHECKED") {
        let bookshelves = item
        return bookshelves
    }
}

export default checkedReducer;