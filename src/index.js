import React from 'react';  //enables JSX to work the way its supposed to
import ReactDOM from 'react-dom'; //becuase we need to render somethign to the page


import './index.css';
import reportWebVitals from './reportWebVitals';
import MenuTemplate from "./MenuTemplate";




ReactDOM.render(
    <MenuTemplate /> ,  document.getElementById('root')    //what you want to render and where to render it            //cannot have 2 adjacent JSX objects , need a wrapper
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();