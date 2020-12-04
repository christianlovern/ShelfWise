import { combineReducers } from 'redux';
import bookshelfReducer from '../reducers/bookshelf_reducer';

const defaultState = {

    bookshelves: []

}


export default combineReducers({
  bookshelfReducer, defaultState
});