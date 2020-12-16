
export const createItem = async(name, description, favorite, type, catagory, shelf) => {
    // const [state, dispatch] = useReducer(reducer, [])
    const response = await fetch('api/items/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            favorite,
            type,
            catagory,
            shelf
        })
    });
    return await response.json()
}

export const editItem = async(item, description, type, catagory, shelf) => {
    const response = await fetch(`/api/items/${item.id}/edit`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            description,
            type,
            catagory,
            shelf
        })
    });
    return await response.json()
}