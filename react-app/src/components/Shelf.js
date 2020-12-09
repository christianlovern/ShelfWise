import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import bookshelfReducer from '../services/reducers/bookshelf_reducer';
import BookshelfForm from './forms/BookshelfForm';
import SideBar from './SideBar';
import CheckedBox from './Checked'

const ShelfBox = ({ user, shelfItems }) => {
    let pathname = (window.location.pathname.split('/'));
    let currshelfId = pathname[2];
    const [hidden, setHidden] = useState(true)
    const [bookshelves, setBookshelves] = useState([])
    const [items, setItems] = useState(shelfItems)
    const [focus, setFocus] = useState(false) 
    const [searchItems, setSearchItems] = useState('')
    const [search, setSearch] = useState('')
    const [checkedOut, setCheckedOut] = useState([])
    
    useEffect(() => {
        console.log("top of effect", items);
        const fetchItems= async() => {
            if(shelfItems.length === 0){
                const response = await fetch(`/api/items/${currshelfId}`)
                let itemResponse = await response.json()
                setItems(itemResponse.item_list)
            }
        }


        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            let list = bookcases.bookshelf_list
            if(list){
               setBookshelves(list)
            }
        }
        fetchCases();
        fetchItems();
    },[])

    const getChecked = () => {
        const checked = []
        if(items.length !== 0){
            items.map((item) => {
                if(item.checked_out === true){
                    console.log("in if",item);
                    checked.push(item)
                }
            })
        } 
        console.log("checked",checked)
        return checked
    }
    const changeFocus = () => {
        setFocus(!focus)
    }

    const searchShelf = async(res) => {
        const response = await fetch(`/api/search/shelf/${currshelfId}/${res}`)
        return await response.json()
    }

    const searchRes = async() => {
        if (search !== ""){
          let searchResults = await searchShelf(search);
          if (searchResults) {
            setSearchItems(searchResults.items)
          }
        }
      }

    const searchBox = () => {
        if(focus === true){
            if(searchItems.length > 0){
                return(
                <div className="search-container__results-box">
                    <div className="search-container__results-items">
                        <h4>Items that match your search</h4>
                        <ul>
                            {searchItems.map((item) => {
                            return(
                                <li key = {item.id} value = {item.name}>
                                    <NavLink className="search__results-link" to = {`/items/${item.id}`}>{item.name}</NavLink>
                                </li>
                            )
                            })}
                        </ul>
                    </div>
            </div>
                )
            }
        }
    }

    const populateFavorites = () => {
        if (items.length !== 0){
            return items.map((item) => {
                if(item.favorite === true){
                    return (
                        <li className="favorites-list-item" key = {item.id}>
                            <NavLink  className="sidebar__bookshelf-link" to={`/item/${item.id}`}>{item.name}</NavLink>
                        </li>
                    )
                }
            })
        }
    }
    

    const ShowForm = () => {
        if (!hidden){
            return(
                
                <div className="bookshelf__form-modal">
                    <BookshelfForm hidden={hidden} setHidden={setHidden} state = {bookshelves} />
                </div>
            )
        } else{
            return null;
        }
    }
    console.log("checked out",checkedOut);
    return (
        <div className="main-bookshelf__container">
            <SideBar bookcases = {bookshelves} hidden={hidden} setHidden= {setHidden} />
            <div className="bookshelf-view__header-container">
                <h2 className="bookshelf-view__header">Click on an Item for a deeper look!</h2>
            </div>
            <ShowForm />
            <div className="item-view__bookshelf-container">
                <div className="item-view__bookshelf-shelves">
                    {items.length !== 0 ? items.map((item) => {
                        return( 
                            <NavLink className="item-view__link" to = {`/items/${item.id}`}>
                                <div className="bookshelf-view__bookshelf-items">{item.name}</div>
                            </NavLink>
                        )
                    }): null}
                </div>
            </div>
            <div className="shelf-view__shelf-search-container" onChange={searchRes}>
                <input onFocus={() => {setFocus(true)}} onBlur={() => {setTimeout(changeFocus, 100)}} className = "shelf-view__shelf-search-input" value = {search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search this Shelf..."></input>
                <div>{searchBox()}</div>
            </div>
            <div className="shelf-view__favorite-container">
                <h1 className="favorite-list-header">Favorite items in this bookcase</h1>
                <ul>{populateFavorites()}</ul>
            </div>
            <CheckedBox checkedOut = {getChecked()}/>
        </div>
    );
}

export default ShelfBox;

