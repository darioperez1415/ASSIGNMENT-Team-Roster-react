import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import firebaseConfig from './api/apiKeys';
import './styles/index.scss';
import Initialize from './Initialize';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

firebase.Initialize(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Initialize />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
