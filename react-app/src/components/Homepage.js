import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SideBar from './SideBar';
import BookshelfForm from "./BookshelfForm"
import reducer from "../services/bookshelf_reducer"

const Homepage = ({ user }) => {
    const [hidden, setHidden] = useState(true)
    const [bookcases, setBookcases] = useState([]);
    const [state, dispatch] = useReducer(reducer, [])

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
        fetchCases();
    }, [])

    const ShowForm = () => {
        if (!hidden){
            return(
                <BookshelfForm state = {state} reducer = {reducer} dispatch = {dispatch}/>
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
      <div className="homepage__checked-out-container">
          <h2 className="homepage__checked-out-container-title">Currently checked out items</h2>
      </div>
    </div>
  );
}



export default Homepage;