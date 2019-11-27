import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('@comanda/token') ? (
                <Redirect 
                    to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}
                />
            ) : (
                <Component {...props} />
            )

        }
    />
);

export default PrivateRoute;