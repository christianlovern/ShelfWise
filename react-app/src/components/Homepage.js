import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SideBar from './SideBar';
import CheckedBox from './Checked'
import BookshelfForm from "./forms/BookshelfForm"
import bookshelfReducer from "../services/reducers/bookshelf_reducer"
import InviteBox from "./InviteBox"
import SearchBox from './SearchBox'
import ItemForm from "./forms/ItemForm"

const Homepage = ({ user }) => {
    const [hidden, setHidden] = useState(true)
    const [bookcases, setBookcases] = useState([]);
    const [checkedOut, setCheckedOut] = useState([]);
    const [state, dispatch] = useReducer(bookshelfReducer, [])

    useEffect(() => {
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            let list = bookcases.bookshelf_list
            if(list){
                console.log("Here");
                dispatch({type: 'GET_BOOKSHELF', item: list})
            }
        }

        const fetchChecked = async () => {
            const fetchResponse = await fetch(`/api/items/checked`)
            const response = await fetchResponse.json();
            console.log(response.items);
            setCheckedOut(response.items)
        }

        fetchChecked();
        fetchCases();
    }, [])

    const ShowForm = () => {
        if (!hidden){
            return(
                <div className="bookshelf__form-modal">
                    <BookshelfForm hidden={hidden} setHidden={setHidden} state = {state} reducer = {bookshelfReducer} dispatch = {dispatch}/>
                </div>
            )
        } else{
            return null;
        }
    }

  return (
    <div className="main__container">
      <SideBar bookcases = {state} hidden={hidden} setHidden= {setHidden} />
      <h1 className="homepage__header">Welcome {user.firstname}!</h1>
      <ShowForm />
      <ItemForm user={user} state = {state} dispatch = {dispatch} />
      <CheckedBox checkedOut = {checkedOut}/>
      <SearchBox />
      <InviteBox />
    </div>
  );
}



export default Homepage;