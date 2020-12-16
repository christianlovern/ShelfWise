import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import BookshelfForm from './forms/BookshelfForm'


const NavBar = ({ setAuthenticated, authenticated, hidden, setHidden, bookshelves, setBookshelves }) => {

  const updateHidden = () => {
    return setHidden(!hidden)
  }

  return (
    <div className="navbar__container">
      {authenticated?
      <>
        <div className='navbar__header'>
          <NavLink to="/" exact={true} activeClassName="active">
            ShelfWise
          </NavLink>
        </div>
        <LogoutButton setAuthenticated = {setAuthenticated}/>
        <button className="navbar__create-bookshelf-button" onClick={updateHidden}>
          New Bookshelf
        </button>
      </>
      : 
      <div className='navbar__header'>

          Welcome to ShelfWise!

      </div>}

    </div>
  );
}

export default NavBar;