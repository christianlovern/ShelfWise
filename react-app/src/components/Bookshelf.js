import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import bookshelfReducer from '../services/reducers/bookshelf_reducer';
import BookshelfForm from './forms/BookshelfForm';
import SideBar from './SideBar';


const Bookshelf = ({ user }) => {
    const [bookcases, setBookcases] = useState([]);
    const [state, dispatch] = useReducer(bookshelfReducer, [])
    const [hidden, setHidden] = useState(true)
    const [bookshelves, setBookshelves] = useState([])
    const [items, setItems] = useState({})
    const [search, setSearch] = useState('')
    const [searchItems, setSearchItems] = useState('')
    let pathname = (window.location.pathname.split('/'));
    let bookshelfId = pathname[2]

    useEffect(() => {
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            let list = bookcases.bookshelf_list
            if(list){
                dispatch({type: 'GET_BOOKSHELF', item: list})
            }
        }

        const fetchShelves = async() => {
            console.log("OUT");
            const response = await fetch(`/api/bookshelf/${bookshelfId}/shelves`)
            let shelves = await response.json()
              if (shelves) {
                setBookshelves(shelves)
              }
              let newItems = {}
                for (let i = 0; i < shelves.shelf_list.length; i++){
                    const response = await fetch(`/api/items/${shelves.shelf_list[i].id}`)
                    let itemResponse = await response.json()
                    console.log("in for loop", itemResponse.item_list);
                    newItems = ({...newItems, [shelves.shelf_list[i].id] : itemResponse.item_list})
                }
                
                console.log(newItems);
                setItems(newItems)
                console.log(items);
        }

        
        fetchShelves();
        fetchCases();
    }, [])


    const searchBookshelf = async(res) => {
        const response = await fetch(`/api/search/bookshelf/${res}`)
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
                    <BookshelfForm hidden={hidden} setHidden={setHidden} state = {state} reducer = {bookshelfReducer} dispatch = {dispatch}/>
                </div>
            )
        } else{
            return null;
        }
    }

    const searchBox = () => {
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


    const populateShelves =  () => {
        if(bookshelves.length !== 0){
            return  bookshelves.shelf_list.map((shelf) => {
                let shelfItems = items[shelf.id]
                if (shelfItems){
                    return <div className="bookshelf-view__bookshelf-shelves">
                        {shelfItems.map((item) => {
                            console.log("id",item.id);
                            return( 
                                <div className="bookshelf-view__bookshelf-items">{item.name}</div>
                            )
                        })}
                    </div>
                }
            })
        }
    }
 
    console.log("before return",items);
  return (
    <div className="main-bookshelf__container">
        <SideBar bookcases = {state} hidden={hidden} setHidden= {setHidden} />
        <div className="bookshelf-view__header-container">
            <h2 className="bookshelf-view__header">Click on a shelf for a deeper look!</h2>
        </div>
        <ShowForm />
        <div className="bookshelf-view__bookshelf-container">{populateShelves()}</div>
        <div className="bookshelf-view__bookshelf-search-container" onChange={searchRes}>
            <input className = "bookshelf-view__bookshelf-search-input" value = {search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search this bookcase..."></input>
            <div>{searchBox()}</div>
        </div>
    </div>
  );
}


export default Bookshelf;