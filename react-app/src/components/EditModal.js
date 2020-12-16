
import React from 'react';

import EditItemForm from './forms/EditItemForm'


const EditModal = ({ setCurrBookshelf,user ,bookcases, setEdit, item }) => {
    return (
        <div className='edit-view__container'>
            <h1 className='edit-view__header'>Edit Item</h1>
            <EditItemForm item={item} user={user} />
            <button onClick={() => setEdit(false)} className="edit-view__cancel-button">Oops! cancel</button>
        </div>
    );
}

export default EditModal;



