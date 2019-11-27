import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PrivateRoute from './PrivateRoute'

import Company from './pages/Company';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Product from './pages/Product';
import Comanda from './pages/Comanda';
import UserRegister from './pages/UserRegister';
import ComandaRegister from './pages/ComandaRegister';
import CompanyRegister from './pages/CompanyRegister';

export default function CustomRoutes(){
    return (
        <BrowserRouter>
            <PrivateRoute path="/" exact component={User}/>
            <PrivateRoute path="/user" exact component={User}/>
            <PrivateRoute path="/user/register" exact component={UserRegister}/>
            <PrivateRoute path="/user/:userId/register" exact component={UserRegister}/>
            <PrivateRoute path="/product" exact component={Product}/>
            <PrivateRoute path="/comanda" exact component={Comanda}/>
            <PrivateRoute path="/comanda/register" exact component={ComandaRegister}/>
            <PrivateRoute path="/comanda/:comandaId/register" exact component={ComandaRegister}/>
            <PrivateRoute path="/dashboard" exact component={Dashboard}/>
            <PrivateRoute path="/company" exact component={Company}/>
            <PrivateRoute path="/company/register" exact component={CompanyRegister}/>
            <PrivateRoute path="/company/:companyId/register" exact component={CompanyRegister}/>
        </BrowserRouter>
    );
}