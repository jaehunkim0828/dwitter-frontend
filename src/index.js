import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Socket from './network/socket.js';
import TokenStorage from './db/token.js';

const tokenStorage = new TokenStorage();
const socketClient = new Socket('http://localhost:8080', () => tokenStorage.getToken());


ReactDOM.render(
  <React.StrictMode>
    <App socketClient={socketClient}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
