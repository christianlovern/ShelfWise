import React, { useState, useReducer, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { createItem } from '../../services/item';

const ItemForm = (props) => {
    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [favorite, setFavorite] = useState(false)
    const [type, setType] = useState('');
    const [typeList, setTypeList] = useState([]);
    const [catagory, setCatagory]= useState('');
    const [catagoryList, setCatagoryList]= useState([]);
    const [bookshelf, setBookshelf] = useState('');
    const [bookshelfList, setBookshelfList] = useState([]);
    const [shelf, setShelf] = useState('');
    const [shelfList, setShelfList] = useState([]);


    useEffect(() => {
    
        const fetchTypes = async () => {
            const typeResponse = await fetch(`/api/users/${props.user.id}/types`)
            const types = await typeResponse.json();
            if(types){
                setTypeList(types.type_list)
            }
        }
        
        fetchTypes();
        
        
        
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${props.user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            if(bookcases){
                setBookshelfList(bookcases.bookshelf_list)
            }
        }

        fetchCases();
    
    }, [])

    const updateCatagories = (setType) =>(e) => {
        setType(e.target.value)
        const fetchCatagories = async () => {
            const catagoriesResponse = await fetch(`/api/users/${e.target.value}/catagories`)
            const catagories = await catagoriesResponse.json();
            if(catagories){
                setCatagoryList(catagories.catagory_list)
            }
        }
        fetchCatagories()
    }


    
    const updateBookshelf = (setBookshelf) =>  (e) => {
        setBookshelf(e.target.value)
        const fetchShelves = async () => {
            const shelfResponse = await fetch(`api/bookshelf/search/${e.target.value}/shelves`)
            const shelves = await shelfResponse.json();
            if(shelves){
                setShelfList(shelves.shelf_list)
            }
        }
        fetchShelves()
    }
    
    const checktype = () => {
        if(!type === "") {
            return (
                <select className="item__form__input" name="catagories" id="catagories" onChange={updateValue(setCatagory)}>
                        <option key = {0} value={""}></option>
                        {catagoryList.map((item) => {
                                return(<option key = {item.id} value={item.name}>{item.name}</option>)
                        })}
                </select>
            )
        }
    }

    const updateValue = (setFunc) => (e) => {
        setFunc(e.target.value)
    }


    const handleSubmit = async (e) => {
        const item = await createItem(name, description, favorite, type, catagory, shelf);
        if(item){
            props.dispatch({type: 'SUBMIT_ITEM', item: item})
        }
    }


    return (
        <div>
        <div className='item__form__container'>
            <h1 className="item__form-header">Create an Item</h1>
            <form onSubmit={handleSubmit}>
            <div>
                <label className="item__form__label" htmlFor='name'>Name</label>
                    <input
                    className="item__form__input"
                    name='name'
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={updateValue(setName)}
                    />
            </div>
            <div>
                <label className="item__form__label" htmlFor='description'>Description</label>
                    <input
                    className="item__form__input"
                    name='about'
                    type='text'
                    placeholder='Description'
                    value={description}
                    onChange={updateValue(setDescription)}
                    />
            </div>
            <div>
                <label className="item__form__label" htmlFor='favorite'>Favorite</label>
                    <input className="item__form__input" type="checkbox" onChange={updateValue(setFavorite)}/>
            </div>
            <div>
                <label className="item__form__label" htmlFor='type' >Choose a type</label>
                    <select className="item__form__input" name="types" id="types" onChange={updateCatagories(setType)}>
                        <option key = {0} value={""}></option>
                        {typeList.map((item) => {
                             return(<option key = {item.id} value={item.id}>{item.name}</option>)
                        })}
                    </select>
            </div>
            {type? <div>
                <label className="item__form__label" htmlFor='catagories' >Choose a catagory</label>
                    <select className="item__form__input" name="catagories" id="catagories" onChange={updateValue(setCatagory)}>
                        <option key = {0} value={""}></option>
                        {catagoryList.map((item) => {
                                return(<option key = {item.id} value={item.id}>{item.name}</option>)
                            })}
                    </select>
            </div>: null}
            <div>
                <label className="item__form__label" htmlFor='Cases' >Choose a bookshelf</label>
                    <select className="item__form__input" name="Cases" id="Cases" onChange={updateBookshelf(setBookshelf)}>
                        <option key = {0} value={""}></option>
                        {bookshelfList.map((item) => {
                                    return(<option key = {item.id} value={item.name}>{item.name}</option>)
                                })}
                    </select>
            </div>
            {bookshelf? <div>
                <label className="item__form__label" htmlFor='Shelves' >Choose a shelf</label>
                    <select className="item__form__input" name="Shelves" id="Shelves" onChange={updateValue(setShelf)}>
                        <option key = {0} value={""}></option>
                        {shelfList.map((item) => {
                            return(<option key = {item.id} value={item.id}>{shelfList.indexOf(item) + 1}</option>)
                        })}
                    </select>
            </div>: null}
            <div>
            <div className="create__item">
                <button type='submit'>Create</button>
            </div>
            </div>
            </form>
        </div>
    </div>
    )
}

export default ItemForm;