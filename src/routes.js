import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';

export default function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" component={localStorage.getItem('@comanda/token') ? Main : Login} />
            <PublicRoute path="/login" exact component={localStorage.getItem('@comanda/token') ? Main : Login} />
            <PublicRoute path="/register" exact component={Register} />
        </BrowserRouter>
    );
}