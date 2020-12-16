import React, { useState } from 'react';
import { createBookshelf } from '../../services/bookshelf';

const BookshelfForm = (props) => {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [shelves, setShelves] = useState(0)


    const updateValue = (setFunc) => (e) => {
        setFunc(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookshelf = await createBookshelf(name, about, shelves);
        props.setBookcases([...props.bookcases, bookshelf]) 
        props.setHidden(!props.hidden)
    }


    return (
        <div>
        <div className='bookshelf__form__container'>
        <h1 className="bookshelf__form-header">Create a Bookshelf</h1>
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
                <label className="bookshelf__form__label" htmlFor='Shelves'>Number of shelves</label>
                    <input
                    className="bookshelf__form__input"
                    name='shelves'
                    type='number'
                    value={shelves}
                    onChange={updateValue(setShelves)}
                    />
            </div>
            <div>
            <div className="create__bookshelf">
                <button type='submit'>Create</button>
                <button onClick={() => props.setHidden(!props.hidden)}>Close</button>
            </div>
            </div>
            </form>
        </div>
    </div>
    )
}

export default BookshelfForm;