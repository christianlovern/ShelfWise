import React from 'react';
import ReactDOM from 'react-dom';
import "./css/main.css"
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/components/redux/store'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
