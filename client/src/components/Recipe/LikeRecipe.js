import React, { Component } from 'react';
import withSession from '../WithSession';
import { Mutation } from 'react-apollo';
import { LIKE_RECIPE } from '../../queries';

class LikeRecipe extends Component {
    state = {
        liked: false,
        userName: ''
    }

    componentDidMount() {
        if (this.props.session.getCurrentUser) {
            const { userName, favourites } = this.props.session.getCurrentUser;
            const { _id } = this.props;

            // Check if the current recipe is already part of the favourites(liked) recipes
            const prevLiked = favourites.findIndex(favourite => favourite._id === _id) > -1;

            this.setState({
                liked: prevLiked,
                userName
            });
        }
    }

    handleClick = likeRecipe => {
        // Toggle the liked state if the button is clicked
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => this.handleLike(likeRecipe)
        )
    }

    handleLike = likeRecipe => {
        if (this.state.liked) {
            likeRecipe().then(async ({ data }) => {
                console.log(data);
                await this.props.refetch();
            })
        } else {
            // mutation for unlike the recipe
            console.log('Unlike')
        }
    }

    render() {
        const { userName, liked } = this.state;
        const { _id } = this.props;
        return (
            <Mutation mutation={LIKE_RECIPE} variables={{ _id, userName }}>
                {likeRecipe => (
                    userName
                    && <button onClick={() => this.handleClick(likeRecipe)}>
                        {liked ? 'Liked' : 'Like'}
                    </button>
                )}
            </Mutation>
        )
    }
}

export default withSession(LikeRecipe);
