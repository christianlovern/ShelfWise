import React from 'react';
import { NavLink } from 'react-router-dom';
import { authenticate } from '../services/auth';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <div className="navbar__container">
      <div className='navbar__header'>
        ShelfWise
      </div>
      {authenticated ? (
      <div className="navbar__dropdown">
        <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <div>
              <NavLink to="/" exact={true} activeClassName="active">
                Home
              </NavLink>
            </div>
            <div>
              <LogoutButton setAuthenticated = {setAuthenticated}/>
            </div>
          </div>
      </div>
      ): null }
    </div>
  );
}

export default NavBar;