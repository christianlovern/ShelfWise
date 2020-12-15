import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import bookshelfReducer from '../services/reducers/bookshelf_reducer';
import BookshelfForm from './forms/BookshelfForm';
import ShelfBox from './Shelf';
import SideBar from './SideBar';


const Bookshelf = ({ user, appBookshelves,setShelfItems, hidden, setHidden }) => {
    let pathname = (window.location.pathname.split('/'));
    let currBookshelfId = pathname[2]
    const [bookcases, setBookcases] = useState(appBookshelves)
    const [shelves, setShelves] = useState([])
    const [bookshelfId, setBookshelfId] = useState(currBookshelfId)
    const [items, setItems] = useState({})
    const [search, setSearch] = useState('')
    const [searchItems, setSearchItems] = useState('')
    const [focus, setFocus] = useState(false)    
    useEffect(() => {
        if(appBookshelves.length === 0){
            const fetchCases = async () => {
                const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
                const bookcases = await caseResponse.json();
                let list = bookcases.bookshelf_list
                if(list){
                    // dispatch({type: 'GET_BOOKSHELF', item: list})
                    setBookcases(list)
                }
            }
            fetchCases();
        }

        const fetchShelves = async() => {
            const response = await fetch(`/api/bookshelf/${bookshelfId}/shelves`)
            let shelves = await response.json()
              if (shelves) {
                setShelves(shelves)
                
              }
              let newItems = {}
                for (let i = 0; i < shelves.shelf_list.length; i++){
                    const response = await fetch(`/api/items/${shelves.shelf_list[i].id}`)
                    let itemResponse = await response.json()
                    newItems = ({...newItems, [shelves.shelf_list[i].id] : itemResponse.item_list})
                }
                
                setItems(newItems)
        }        
        fetchShelves();
        
    }, [bookshelfId])

    const changeFocus = () => {
        setFocus(!focus)
    }

    const searchBookshelf = async(res) => {
        const response = await fetch(`/api/search/bookshelf/${currBookshelfId}/${res}`)
        return await response.json()
    }

    const searchRes = async() => {
        if (search !== ""){
          let searchResults = await searchBookshelf(search);
          if (searchResults) {
            setSearchItems(searchResults.items)
          }
        }
      }

    
      const ShowForm = () => {
        if (!hidden){
            return(
                <div className="bookshelf__form-modal">
                    <BookshelfForm hidden={hidden} setHidden={setHidden} bookcases = {bookcases} setBookcases={setBookcases}/>
                </div>
            )
        } else{
            return null;
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
                                    <NavLink  className="search__results-link" to={`/shelf/${item.shelfId}/item/${item.id}`}>{item.name}</NavLink>
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


    const populateShelves =  () => {
        if(shelves.length !== 0){
            return  shelves.shelf_list.map((shelf) => {
                let shelfItems = items[shelf.id]
                if (shelfItems){
                    if(shelfItems.length !== 0)
                    return (
                        <NavLink onClick={() => setShelfItems(shelfItems)} className="bookkshelf-view__shelf-link" to={`/shelf/${shelf.id}`}>
                            <div className="bookshelf-view__bookshelf-shelves">
                                {shelfItems.map((item) => {
                                    return( 
                                        <div className="bookshelf-view__bookshelf-items">{item.name}</div>
                                    )
                                })}
                            </div>
                        </NavLink>
                    )
                }
            })
        }
    }

    
    const populateFavorites = () => {
        if (items.length !== 0){
            let itemKeys = Object.keys(items)
                if(itemKeys){
                    return itemKeys.map((key) => {
                        return items[key].map((item) => {
                            if(item.favorite === true){
                                return (
                                    <li className="favorites-list-item" key = {item.id}>
                                        <NavLink  className="sidebar__bookshelf-link" to={`/shelf/${item.shelfId}/item/${item.id}`}>{item.name}</NavLink>
                                    </li>
                                )
                            }
                        })
                    })
                }
        }
    }
    
 
  return (
    <div className="main-bookshelf__container">
        <SideBar bookcases = {bookcases} setBookshelfId = {setBookshelfId}/>
        <div className="bookshelf-view__header-container">
            <h2 className="bookshelf-view__header">Click on a shelf for a deeper look!</h2>
        </div>
        <ShowForm />
        <div className="bookshelf-view__bookshelf-container">{populateShelves()}</div>
        <div className="favorite-list-container">
            <h1 className="favorite-list-header">Favorite items in this bookcase</h1>
            <ul>{populateFavorites()}</ul>
        </div>
        <div className="bookshelf-view__bookshelf-search-container" onChange={searchRes}>
            <input onFocus={() => {setFocus(true)}} onBlur={() => {setTimeout(changeFocus, 100)}} className = "bookshelf-view__bookshelf-search-input" value = {search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search this bookcase..."></input>
            <div>{searchBox()}</div>
        </div>
    </div>
  );
}


export default Bookshelf;