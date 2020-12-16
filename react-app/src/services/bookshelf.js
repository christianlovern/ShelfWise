
export const createBookshelf = async(name, about, shelves) => {
    const response = await fetch('/api/bookshelf/create', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            about,
            shelves
        })
    });
    return await response.json()
}
