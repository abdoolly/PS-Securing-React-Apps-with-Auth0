import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        const { isAuthenticated } = this.props.auth;
        let isLoggedIn = isAuthenticated();

        return (
            <nav>
                <ul>
                    <li><Link to='#' onClick={() => this.props.history.goBack()} >Back</Link></li>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/public'>Public</Link></li>
                    <li><Link to='/private'>Private</Link></li>
                    <li>
                        <Link to='#' onClick={this.getAuthAction(isLoggedIn)}>{this.getButtonString(isLoggedIn)}</Link>
                    </li>
                </ul>
            </nav>
        );
    }

    getAuthAction(isLoggedIn) {
        const { login, logout } = this.props.auth;

        if (isLoggedIn)
            return logout;

        return login;
    }

    getButtonString(isLoggedIn) {
        if (isLoggedIn)
            return 'Log out';

        return 'Log in';
    }
}

export default Nav;