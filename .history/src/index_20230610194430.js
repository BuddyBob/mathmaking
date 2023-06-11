import App from './App';
import { AuthProvider } from './components/context/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(

    <Router>
        
        <AuthProvider>
            
        < App />
        </AuthProvider>
    </Router>, document.getElementById("root"));