import React, { Component } from 'react';

class Callback extends Component {
    componentDidMount() {
        // handle authentication if the params does exists

        if (/access_token|id_token|error/.test(this.props.location.hash))
            return this.props.auth.handleAuthentication();

        throw Error('Invalid Callback URL');
    }

    render() {
        return (
            <h1>
                Loading...
            </h1>
        );
    }
}

export default Callback;