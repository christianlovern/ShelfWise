function reducer(state, action) {
    let { type, item } = action;
    let bookshelves = [...state]
    if (type === "GET_BOOKSHELF") {
        let bookshelves = item
        return bookshelves
    }
    
    if (type === "SUBMIT_BOOKSHELF") {
        bookshelves.push(item);
        console.log(bookshelves);
        return bookshelves
    }
    return state;
}

export default reducer;