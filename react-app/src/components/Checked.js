import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';



const CheckedBox = ({ checkedOut }) => {

    const checkIn = async (item) => {
        await fetch(`/api/items/${item.id}/checked`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            // body: JSON.stringify({'checked_out': !item.checked_in})
            
        })
    }


    const checkedList = checkedOut.map((item) => {
        return (
            <li className="homepage-checked-out__list" key={item.name}>
                <NavLink className="homepage__checked-out-link" to={`/user/item/${item.id}`}>{item.name}</NavLink>
                <button className="check-in__btn" onClick={() => checkIn(item)}>Check In</button>
            </li>
        )
    })

  return (
    <div className="homepage__checked-out-container">
        <h2 className="homepage__checked-out-container-title">Currently checked out items</h2>
        <ul>{checkedList}</ul>
    </div> 
  );
}

export default CheckedBox;



