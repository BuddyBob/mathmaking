import App from './App';
import { AuthProvider } from './components/context/AuthContext';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';
ReactDOM.render(

    <Router>
        <StyledEngineProvider injectFirst>
        <AuthProvider>
            
        < App />
        </AuthProvider>
        </StyledEngineProvider>
    </Router>, document.getElementById("root"));