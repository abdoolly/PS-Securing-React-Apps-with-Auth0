import { Route } from 'react-router-dom';
import React from 'react';

export function SecureRoute({ component: Component, auth, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            if (!auth.isAuthenticated()) { auth.login(); return null };

            return <Component auth={auth} {...props} />;
        }} />
    );
}

