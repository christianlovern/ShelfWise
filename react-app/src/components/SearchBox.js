import React, { useState, useEffect, useReducer } from 'react';
import { NavLink } from 'react-router-dom';



const SearchBox = () => {
  return (
    <div className="homepage__search-container">
        <h2 className="homepage__search-container-title">What's next?</h2>
        <input className="homepage__search-container-input" placeholder="Search...."></input>
        <div className="homepage__search-container-button-container">
            <button className="homepage__search-container-button">Search</button>
        </div>
    </div> 
  );
}

export default SearchBox;



