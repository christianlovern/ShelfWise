import React, { useState, useEffect, useReducer } from 'react';
import SideBar from './SideBar';
import CheckedBox from './Checked'
import BookshelfForm from "./forms/BookshelfForm"
import InviteBox from "./InviteBox"
import SearchBox from './SearchBox'
import ItemForm from "./forms/ItemForm"

const Homepage = ({  user, setBookshelves, hidden, setHidden }) => {
    const [checkedOut, setCheckedOut] = useState([]);
    const [bookcases, setBookcases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            let list = bookcases.bookshelf_list
            if(list){
                setBookshelves(list)
                setBookcases(list)
            }
        }

        const fetchChecked = async () => {
            const fetchResponse = await fetch(`/api/items/checked`)
            const response = await fetchResponse.json();
            setCheckedOut(response.items)
        }

        fetchChecked();
        fetchCases();
    }, [])

    const ShowForm = () => {
        if (!hidden){
            return(
                <div className="bookshelf__form-modal">
                    <BookshelfForm hidden={hidden} setHidden={setHidden} bookcases = {bookcases} setBookcases={setBookcases}/>
                </div>
            )
        } else{
            return null;
        }
    }

  return (
    <div className="main__container">
      <SideBar  bookcases = {bookcases} />
      <h1 className="homepage__header">Welcome {user.firstname}!</h1>
      <ShowForm />
      <ItemForm user={user} state = {bookcases} />
      <CheckedBox checkedOut = {checkedOut} name={"homepage"}/>
      <SearchBox />
      <InviteBox />
    </div>
  );
}



export default Homepage;