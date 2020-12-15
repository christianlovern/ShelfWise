import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/auth";

const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return (
    <button className="navbar__logout-btn">
      <NavLink className="navbar__link" to= '/login' onClick={onLogout}>Logout</NavLink>
    </button>
  )
};

export default LogoutButton;
