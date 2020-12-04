import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import searchFetch from "../services/search"


const SearchBox = () => {
  const [search, setSearch] = useState('')
  const [bookshelves, setBookshelves] = useState([])
  const [items, setItems] = useState([])


  
  
  
  useEffect(() => {
    const searchRes = async() => {
      if (search !== ""){
        let searchResults = await searchFetch(search);
        if (searchResults) {
          setBookshelves(searchResults.bookshelfs)
          setItems(searchResults.items)
        }
      }
    }
    searchRes()
}, [search])
  
  const searchBox = () => {
    if (items.length > 0 || bookshelves.length > 0) {
      if(items.length > 0 && bookshelves.length === 0){
        return (
          <div className="search-container__results-box">
            <div className="search-container__results-items">
              <h4>Items that match your search</h4>
              <ul>
                {items.map((item) => {
                  return(
                    <li key = {item.id} value = {item.name}>
                      <NavLink className="search__results-link" to = {`/items/${item.id}`}>{item.name}</NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="search-container__results-bookshelves">
              <h4>No bookshelves match that search</h4>
            </div>
          </div>
        )
      }else if(items.length === 0 && bookshelves.length > 0){
        return (
          <div className="search-container__results-box">
            <div className="search-container__results-items">
              <h4>No items match that search</h4>
            </div>
            <div className="search-container__results-bookshelves">
              <h4>Bookshelves that match that search</h4>
              <ul>
                {bookshelves.map((bookshelf) => {
                  return(
                    <li key = {bookshelf.id} value = {bookshelf.name}>
                      <NavLink className="search__results-link" to = {`/bookshelf/${bookshelf.id}`}>{bookshelf.name}</NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      } else {
        return (
          <div className="search-container__results-box">
            <div className="search-container__results-items">
              <h4>Items that match that search</h4>
              <ul>
                {items.map((item) => {
                  return(
                    <li key = {item.id} value = {item.name}>
                      <NavLink className="search__results-link" to = {`/items/${item.id}`}>{item.name}</NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="search-container__results-bookshelves">
              <h4>Bookshelves that match that search</h4>
              <ul>
                {bookshelves.map((bookshelf) => {
                  return(
                    <li key = {bookshelf.id} value = {bookshelf.name}>
                      <NavLink className="search__results-link" to = {`/bookshelf/${bookshelf.id}`}>{bookshelf.name}</NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      }
    } else{
      return( null )
    }
  }

  
  return (
    <div className="homepage__search-container">
        <h2 className="homepage__search-container-title">What's next?</h2>
          <input className="homepage__search-container-input" placeholder="Search...." value = {search} onChange={(e) => setSearch(e.target.value)}></input>
          <div>
            {searchBox()}
          </div>
        <div className="homepage__search-container-button-container">
            <button className="homepage__search-container-button" >Search</button>
        </div>
    </div> 
  );
}

export default SearchBox;



