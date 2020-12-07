import React, { useState, useReducer } from 'react'


export const createBookshelf = async(name, about) => {
    // const [state, dispatch] = useReducer(reducer, [])

    const response = await fetch('api/bookshelf/create', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            about
        })
    });
    return await response.json()
}
