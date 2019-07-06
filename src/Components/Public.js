import React, { Component } from 'react';

class Public extends Component {
    state = {
        message: ''
    };

    async componentDidMount() {
        try {
            let response = await fetch('/public');
            if (!response.ok)
                throw Error('Network response was not ok');

            let result = await response.json();

            this.setState({ message: result.message });
        } catch (err) {
            this.setState({ message: err.message });
        }
    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Public;