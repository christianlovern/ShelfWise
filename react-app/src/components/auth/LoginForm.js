import React, { useState } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../services/auth";

const LoginForm = ({ authenticated, setAuthenticated, setUser }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setUser(user)
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="landing-page__container">
      <div className="landing-page__info-picture-1"></div>
      <div className="landing-page__info-text-1">
        <h2 className="landing-page__info-text-1-header">One Stop Designed Homepage</h2>
        <p className="landing-page__info-text-1-text">Your homepage is designed as an easy to use maintenance stop! Check in books, search for items, add a new item to your collection, and dive deeper into your bookshelves! </p>
      </div>
      <div className="landing-page__info-picture-2"></div>
      <div className="landing-page__info-text-2">
        <h2 className="landing-page__info-text-2-header">Complete Booshelf View!</h2>
        <p className="landing-page__info-text-2-text"> Easy to navigate bookshelves showing all items! Peek at your favorite items or dive deeper into the view to see the shelf!</p>
      </div>
      <div className="landing-page__info-picture-3"></div>
      <div className="landing-page__info-text-3">
        <h2 className="landing-page__info-text-3-header">Informative Item Page!</h2>
        <p className="landing-page__info-text-3-text">Clean and easy to read item view with all the needed information to quickly find your things! Favorite, check out, and remove items in a breeze!</p>
      </div>
      <div className="login-form__container">
        <div className='login-form'>
          <h1> Log In! </h1>
          <form  onSubmit={onLogin}>
            <div>
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
            <div className='login-form-field'>
              <label className='login-form-label' htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login-form-field'>
              <label className='login-form-label' htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            <div className='login-form__login-btn'>
              <button type="submit">Login</button>
            </div>
            </div>
            <div className="login-page__p">
              Don't have an account? Sign up now!
            </div>
            <button>
              <NavLink className='login-form__signup-btn' to="/sign-up" exact={true} >
                Sign Up
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
