//import { StrictMode } from 'react';
//import { createRoot } from 'react-dom/client';
//import './index.css';
//import App from './App.jsx';
//import customFetch from './utils/customFetch.js';


//const data = await customFetch.get('/test');
//console.log(data);

//fetch('/api/v1/test')
  //.then((res) => res.json())
  //.then((data) => console.log(data));

//createRoot(document.getElementById('root')).render(
  //<StrictMode>
    //<App />
  //</StrictMode>,
//)

import React from "react";
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// fetch('http://localhost:5100/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// fetch('/api/v1/test') // ✅ Uses Vite proxy
//   .then((res) => res.json())
//   .then((data) => console.log(data));

import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
      <App />
       <ToastContainer position='top-center' />
    </React.StrictMode>
)