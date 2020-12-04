import React, { useState, useReducer, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { createItem } from '../../services/item';

const ItemForm = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [favorite, setFavorite] = useState(false)
    const [typeList, setTypeList] = useState([]);
    const [type, setType] = useState('');
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
        
        
        const fetchCatagories = async () => {
            const catagoriesResponse = await fetch(`/api/users/${props.user.id}/catagories`)
            const catagories = await catagoriesResponse.json();
            if(catagories){
                setCatagoryList(catagories.catagory_list)
            }
            
        }
        
        fetchCatagories()
        
        const fetchCases = async () => {
            const caseResponse = await fetch(`/api/users/${props.user.id}/bookshelves`)
            const bookcases = await caseResponse.json();
            if(bookcases){
                setBookshelfList(bookcases.bookshelf_list)
            }
        }

        fetchCases();
    
    }, [])


    const updateValue = (setFunc) => (e) => {
        setFunc(e.target.value)
    }

    const updateBookshelf = (setBookshelf) => (e) => {
        setBookshelf(e.target.value)

        //e.target.value is showing correctly

        console.log(bookshelf);

        //Bookshelf not populating for some reason???



        if(bookshelf){
            const fetchShelves = async () => {
                const shelfResponse = await fetch(`/api/bookshelf/${bookshelf}/shelves`)
                const shelves = await shelfResponse.json();
                if(shelves){
                    // setShelfList(shelves)
                    console.log("SHELVES", shelfList);
                }
            }
            fetchShelves()
        }
    }


    const getTypeList = () => {
        return (
            typeList.map((item) => {
                return(<option value={item.name}>{item.name}</option>)
            })
        )
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = await createItem();
        if(item){
            console.log("form dispatch");
            props.dispatch({type: 'SUBMIT_ITEM', item: item})
        }
        
        
    }


    return (
        <div>
        <div className='item__form__container'>
        <   h1 className="item__form-header">Create an Item</h1>
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
                    <select className="item__form__input" name="types" id="types" onChange={updateValue(setType)}>
                        {typeList.map((item) => {
                             return(<option key = {item.id} value={item.name}>{item.name}</option>)
                        })}
                    </select>
            </div>
            <div>
                <label className="item__form__label" htmlFor='catagories' >Choose a catagory</label>
                    <select className="item__form__input" name="catagories" id="catagories" onChange={updateValue(setCatagory)}>
                        {catagoryList.map((item) => {
                                return(<option key = {item.id} value={item.name}>{item.name}</option>)
                            })}
                    </select>
            </div>
            <div>
                <label className="item__form__label" htmlFor='Cases' >Choose a bookshelf</label>
                    <select className="item__form__input" name="Cases" id="Cases" onChange={updateBookshelf(setBookshelf)}>
                    {bookshelfList.map((item) => {
                                return(<option key = {item.id} value={item.name}>{item.name}</option>)
                            })}
                    </select>
            </div>
            <div>
                <label className="item__form__label" htmlFor='Shelves' >Choose a shelf</label>
                    <select className="item__form__input" name="Shelves" id="Shelves" onChange={updateValue(setShelf)}>
                    {shelfList.map((item) => {
                                return(<option key = {item.id} value={item.name}>{item.name}</option>)
                            })}
                    </select>
            </div>
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