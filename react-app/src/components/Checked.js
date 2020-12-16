import React from 'react';
import { NavLink } from 'react-router-dom';



const CheckedBox = ({  checkedOut, name }) => {

    const check = async (item) => {
        await fetch(`/api/items/${item.id}/checked`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })

    }


    const checkedList = checkedOut.map((item) => {
        return (
            <li className="homepage-checked-out__list" key={item.name}>
                <NavLink className="homepage__checked-out-link" to={`/shelf/${item.shelfId}/item/${item.id}`}>{item.name}</NavLink>
                <button className="check-in__btn" onClick={() => check(item)}>Check In</button>
            </li>
        )
    })

  return (
    <div className={`${name}__checked-out-container`}>
        <h2 className={`${name}__checked-out-container-title`}>Currently checked out items</h2>
        <ul>{checkedList}</ul>
    </div> 
  );
}

export default CheckedBox;



