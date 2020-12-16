
import React from 'react';
import { useHistory } from "react-router-dom";



const RemoveModal = ({ shelfId, setRemove, item }) => {
    const history = useHistory()
   const deleteItem = async(item) => {
        await fetch(`/api/items/${item.id}/delete`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        return (
            history.goBack()
        )
   }

  return (
    <div className='remove-view__container'>
        <h1 className='remove-view__header'>WARNING !!</h1>
        <p className='remove-view__paragraph'>Are you sure you want to remove this item from your collection?</p>
        <button className="remove-view__confirm-button" onClick={() => deleteItem(item)}>Yes, continue</button>
        <p className='remove-view__paragraph'>If you are trying to check out an item please use the check out button instead</p>
        <button onClick={() => setRemove(false)} className="remove-view__cancel-button">Oops! cancel</button>
    </div>
  );
}

export default RemoveModal;







