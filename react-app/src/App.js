import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ShelfBox from "./components/Shelf"
import { authenticate } from "./services/auth";
import SideBar from "./components/SideBar";
import Homepage from "./components/Homepage";
import Bookshelf from "./components/Bookshelf";
import ItemView from "./components/Item"

// function Layout(props) {
//   return <div id="layout">{props.children}</div>;
// }

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({})
  const [shelfItems, setShelfItems] = useState([])
  const [bookshelves, setBookshelves] = useState([])
  

  
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
      <NavBar setAuthenticated={setAuthenticated} authenticated = {authenticated} hidden={hidden} setHidden={setHidden} bookshelves={bookshelves} setBookshelves={setBookshelves}/>
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          setUser = {setUser}
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
        <Homepage   user = {user} setBookshelves={setBookshelves} hidden={hidden} setHidden={setHidden}/>
      </ProtectedRoute>
      <ProtectedRoute path="/bookshelf/:bookshelfId" exact={true} authenticated={authenticated}>
        <Bookshelf  user = {user} appBookshelves={bookshelves} setShelfItems={setShelfItems} hidden={hidden} setHidden={setHidden}/>
      </ProtectedRoute>
      <ProtectedRoute path="/shelf/:shelfId" exact={true} authenticated={authenticated}>
        <ShelfBox  user = {user} shelfItems={shelfItems} hidden={hidden} setHidden={setHidden}/>
      </ProtectedRoute>
      <ProtectedRoute path="/item/:itemId" exact={true} authenticated={authenticated}>
        <ItemView  user = {user}  hidden={hidden} setHidden={setHidden}/>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
