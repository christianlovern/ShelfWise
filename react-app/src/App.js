import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import SideBar from "./components/SideBar";
import Homepage from "./components/Homepage";
import Bookshelf from "./components/Bookshelf";


// function Layout(props) {
//   return <div id="layout">{props.children}</div>;
// }

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      setUser(user)
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <Layout> */}
      <NavBar setAuthenticated={setAuthenticated} authenticated = {authenticated} />
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
        <UsersList/>
      </ProtectedRoute>
      <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
        <User />
      </ProtectedRoute>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        <Homepage user = {user}/>
      </ProtectedRoute>
      <ProtectedRoute path="/bookshelf/:bookshelfId" exact={true} authenticated={authenticated}>
        <Bookshelf  user = {user}/>
      </ProtectedRoute>
      
    </BrowserRouter>
  );
}

export default App;
