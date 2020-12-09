import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const SideBar = ({ bookcases, hidden ,setHidden, setBookshelfId }) => {
  const bookcaseList = bookcases.map((cases) => {
      if (setBookshelfId){
        return (
            <li className="sidebar__bookshelf-bullet" key = {cases.id}>
                <NavLink onClick={() => setBookshelfId(cases.id)} className="sidebar__bookshelf-link" to={`/bookshelf/${cases.id}`}>{cases.name}</NavLink>
            </li>
        )
      }else {
        return (
            <li className="sidebar__bookshelf-bullet" key = {cases.id}>
                <NavLink className="sidebar__bookshelf-link" to={`/bookshelf/${cases.id}`}>{cases.name}</NavLink>
            </li>
        )
        }
    })

    const updateHidden = () => {
        return setHidden(!hidden)
    }


  return (
    <div className="sidebar__container">
        <h2 className="sidebar__bookshelf-title">Bookshelves</h2>
        <ul>{bookcaseList}</ul>
        <button className="sidebar__create-bookshelf-button" onClick={updateHidden}>
            New Bookshelf
        </button>
    </div>
  );
}


export default SideBar;