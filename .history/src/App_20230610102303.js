import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { AuthProvider } from './components/context/AuthContext';
import Home from './Home';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route element={<AuthProvider><Home /></AuthProvider>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);