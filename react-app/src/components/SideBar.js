import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const SideBar = ({ bookcases, hidden ,setHidden }) => {
  const bookcaseList = bookcases.map((cases) => {
        return (
            <li className="sidebar__bookshelf-bullet" key = {cases.id}>
                <NavLink className="sidebar__bookshelf-link" to={`/user/${cases.id}`}>{cases.name}</NavLink>
            </li>
        )
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