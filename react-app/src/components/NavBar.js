import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  return (
    <div className="navbar__container">
      <div className='navbar__header'>
        ShelfWise
      </div>
      <div className="navbar__dropdown">
        <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <NavLink to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
      </div>
    </div>
  );
}

export default NavBar;