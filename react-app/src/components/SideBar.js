import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const SideBar = ({ bookcases, setBookshelfId }) => {
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

  return (
    <div className="sidebar__container">
        <h2 className="sidebar__bookshelf-title">Bookshelves</h2>
        <ul>{bookcaseList}</ul>
    </div>
  );
}


export default SideBar;