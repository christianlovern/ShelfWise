import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../services/auth";

const LogoutButton = ({ setAuthenticated }) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <NavLink to= '/login' onClick={onLogout}>Logout</NavLink>;
};

export default LogoutButton;
