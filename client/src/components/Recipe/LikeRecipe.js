import React, { Component } from 'react';
import withSession from '../WithSession';
import { Mutation } from 'react-apollo';
import { LIKE_RECIPE } from '../../queries';

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

    handleLike = (likeRecipe) => {
        likeRecipe().then(({ data }) => {
            console.log(data)
        })
    }

    render() {
        const { userName } = this.state;
        const { _id } = this.props;
        return (
            <Mutation mutation={LIKE_RECIPE} variables={{ _id, userName }}>
                {likeRecipe => (
                    userName
                    && <button onClick={() => this.handleLike(likeRecipe)}>Like</button>
                )}
            </Mutation>
        )
    }
}

export default withSession(LikeRecipe);
