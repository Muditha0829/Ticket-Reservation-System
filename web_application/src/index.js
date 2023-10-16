import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './Components/AuthContext';
import ARouter from './Components/ARouter';

ReactDOM.render(
  <Router>
    <UserProvider>
      <ARouter />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);