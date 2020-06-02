import React from 'react';
import ReactDOM from 'react-dom';

import './css/app.css';
import './css/header.css';
import { API } from './api';
import App from './components/App';

ReactDOM.render(
  <API url="https://backend-test.pi-top.com/todo-test/v1">
    <App />
  </API>,
  document.getElementById('app'),
);
