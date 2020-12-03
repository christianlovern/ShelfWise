import React, { useState, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { createBookshelf } from '../services/bookshelf';
import reducer from "../services/bookshelf_reducer"

const BookshelfForm = (props) => {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');


    const updateValue = (setFunc) => (e) => {
        setFunc(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookshelf = await createBookshelf(name, about);
        if(bookshelf){
            console.log("form dispatch");
            props.dispatch({type: 'SUBMIT_BOOKSHELF', item: bookshelf})
        }
        
        
    }


    return (
        <div>
        <h1 className="bookshelf__form-header">Create a Bookshelf</h1>
        <div className='bookshelf__form__container'>
            <form onSubmit={handleSubmit}>

            <div>
            <h4>Info:</h4>
                <label className="bookshelf__form__label" htmlFor='name'>Name</label>
                    <input
                    className="bookshelf__form__input"
                    name='name'
                    type='text'
                    placeholder='Bookshelf'
                    value={name}
                    onChange={updateValue(setName)}
                    />
            </div>
            <div>
                <label className="bookshelf__form__label" htmlFor='About'>About</label>
                    <input
                    className="bookshelf__form__input"
                    name='about'
                    type='text'
                    placeholder='About'
                    value={about}
                    onChange={updateValue(setAbout)}
                    />
            </div>
            <div>
            <div className="create__bookshelf">
                <button type='submit'>Create</button>
            </div>
            </div>
            </form>
        </div>
    </div>
    )
}

export default BookshelfForm;