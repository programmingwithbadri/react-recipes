import React, { Component } from 'react';
import withSession from '../WithSession';

class LikeRecipe extends Component {
    state = {
        userName: ''
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            const { userName } = this.props.session.getCurrentUser;
            this.setState({ userName });
        }
    }

    render() {
        const { userName } = this.state;
        return userName && <button>Like</button>
    }
}

export default withSession(LikeRecipe);
