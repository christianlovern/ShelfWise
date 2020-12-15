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
  );
};

export default LoginForm;
