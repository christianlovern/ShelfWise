import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SideBar from './SideBar';
import BookshelfForm from "./BookshelfForm"

const Homepage = ({ user }) => {
    console.log(user);
    const [hidden, setHidden] = useState(true)
    const [bookcases, setBookcases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            console.log("In fetch", bookcases.bookshelf_list)
            let list = bookcases.bookshelf_list
            setBookcases(list)
        }
        fetchCases();
    }, [])

    const ShowForm = () => {
        if (!hidden){
            return(
                <BookshelfForm />
            )
        } else{
            return null;
        }
    }

  return (
    <div className="main__container">
      <SideBar bookcases = {bookcases} hidden={hidden} setHidden= {setHidden} />
      <h1 className="homepage__header">Welcome {user.firstname}!</h1>
      <ShowForm />
      <div className="homepage__checked-out-container">
          <h2 className="homepage__checked-out-container-title">Currently checked out items</h2>
      </div>
    </div>
  );
}



export default Homepage;