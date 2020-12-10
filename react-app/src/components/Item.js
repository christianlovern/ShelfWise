import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';


const ItemView = ({ user, hidden, setHidden }) => {
    let pathname = (window.location.pathname.split('/'));
    let currItemId = pathname[2];
    const [item, setItem] = useState({})
    const [bookcases, setBookcases] = useState([])
    const [checked, setChecked] = useState(false)

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
        }

        fetchItem();
        fetchCases();
    }, [])


  return (
    <div className="main-bookshelf__container">
        <SideBar bookcases = {bookcases} hidden={hidden} setHidden= {setHidden} />
        <div className="item-view__header-container">
            <h1 className="item-view__header">{item.name}</h1>
        </div>
        <div className="item-view__information-container">
            {<ul className="item-view__information-list">
                <li className="item-view__information-list-item"> Shelf: {item.shelfId} </li>
                <li className="item-view__information-list-item"> Checked out: {item.checked} </li>
                <li className="item-view__information-list-item"> Favorited: {item.favorite} </li>
            </ul>}
        </div>
    </div>
  );
}

export default ItemView;



