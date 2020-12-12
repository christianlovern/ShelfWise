import React, { useState, useEffect, useReducer } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import RemoveModal from './RemoveModal'
import EditModal from './EditModal'

const ItemView = ({ user, hidden, setHidden }) => {
    let {currShelfId, currItemId} = useParams()
    console.log("shelfID", currShelfId, "itemId", currItemId);
    const [item, setItem] = useState({})
    const [bookcases, setBookcases] = useState([])
    const [currBookshelf, setCurrBookshelf] = useState('')
    const [shelfList, setShelfList] = useState([])
    const [remove, setRemove] = useState(false)
    const [edit, setEdit] = useState(false)
    const [favorite, setFavorite] = useState(false)
    const [checked, setChecked] = useState(false)
    console.log(currBookshelf);
    useEffect(() => {
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            let list = bookcases.bookshelf_list
            if(list){
                setBookcases(list)
            }
        }

        const fetchItem = async () => {
            const fetchResponse = await fetch(`/api/items/item/${currItemId}`)
            const response = await fetchResponse.json();
            setItem(response.item)
            setFavorite(response.item.favorite)
            setChecked(response.item.checked_out)
        }

        const fetchInformation = async () => {
            const fetchResponse = await fetch(`/api/bookshelf/shelf/${currShelfId}/name`)
            const response = await fetchResponse.json();
            setCurrBookshelf(response.bookshelf)
            setShelfList(response.shelf_list)
        }

        fetchItem();
        fetchCases();
        fetchInformation()
    }, [currBookshelf, currShelfId])

    const getShelfNumber = () => {
        for(let i = 0; i < shelfList.length; i++){
            if (shelfList[i].id === item.shelfId){
                return i+1;
            }
        }
    }

    const check = async (item) => {
        await fetch(`/api/items/${item.id}/checked`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
        setChecked(!checked)
    }

    const changeFavorite = async (item) => {
        await fetch(`/api/items/${item.id}/favorite`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
        setFavorite(!favorite)
    }


    const ShowRemove = () => {
        if (remove === true){
            return(
                <div className="item-view__remove-modal">
                    <RemoveModal shelfId={currShelfId} remove={remove} setRemove={setRemove} item={item} />
                </div>
            )
        } else{
            return null;
        }
    }

    const editItem = () => {
        if (edit === true){
            return(
                <div className="item-view__remove-modal">
                    <EditModal  user={user} bookcases={bookcases} setEdit={setEdit} item={item} />
                </div>
            )
        }
    }


  return (
    <div className="main-bookshelf__container">
        <SideBar bookcases = {bookcases} hidden={hidden} setHidden= {setHidden} />
        <div className="item-view__header-container">
            <h1 className="item-view__header">{item.name}</h1>
        </div>
        <ShowRemove />
        <div className="item-view__information-container">
            {favorite === false?
                <div onClick={() => changeFavorite(item)} className= "item-view__information-star-false" />
                : <div onClick={() => changeFavorite(item)} className= "item-view__information-star-true" />}
            <div className='edit-view__edit-btn' onClick={() => setEdit(true)} />
        {editItem()}
            {<ul className="item-view__information-list">
                <li className="item-view__information-list-item"> Bookshelf: {currBookshelf} </li>
                <li className="item-view__information-list-item"> Shelf: {getShelfNumber()} </li>
                { item.position?
                <li className="item-view__information-list-item"> Position: {item.position} </li>
                : null}
                <li className="item-view__information-list-item"> {`Checked out: ${checked}`} </li>
                <li className="item-view__information-list-item"> {`Favorited: ${favorite}`} </li>
                <li className="item-view__information-list-item">Description: {item.description}</li>
            </ul>}
            {item.checked_out === true? 
                <button className="item-view__check-in__btn" onClick={() => check(item)}>Check In</button>
            : <button className="item-view__check-in__btn" onClick={() => check(item)}>Check Out</button>}
            <button className="item-view__remove__btn" onClick={() => setRemove(true)}>Delete</button>
        </div>
    </div>
  );
}

export default ItemView;



