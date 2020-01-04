import React, { Component } from 'react';
import withSession from '../WithSession';
import { Mutation } from 'react-apollo';
import { LIKE_RECIPE, GET_RECIPE, UNLIKE_RECIPE } from '../../queries';

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

    handleClick = (likeRecipe, unlikeRecipe) => {
        // Toggle the liked state if the button is clicked
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => this.handleLike(likeRecipe, unlikeRecipe)
        )
    }

    handleLike = (likeRecipe, unlikeRecipe) => {
        if (this.state.liked) {
            likeRecipe().then(async ({ data }) => {
                console.log(data);
                await this.props.refetch();
            })
        } else {
            unlikeRecipe().then(async ({ data }) => {
                console.log(data);
                await this.props.refetch();
            })
        }
    }

    updateLike = (cache, { data: { likeRecipe } }) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({
            query: GET_RECIPE,
            variables: { _id }
        });

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
            }
        })
    }

    updateUnlike = (cache, { data: { unlikeRecipe } }) => {
        const { _id } = this.props;
        const { getRecipe } = cache.readQuery({
            query: GET_RECIPE,
            variables: { _id }
        });

        cache.writeQuery({
            query: GET_RECIPE,
            variables: { _id },
            data: {
                getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
            }
        })
    }

    render() {
        const { userName, liked } = this.state;
        const { _id } = this.props;
        return (
            <Mutation
                mutation={UNLIKE_RECIPE}
                variables={{ _id, userName }}
                update={this.updateUnlike}>
                {unlikeRecipe => (
                    <Mutation
                        mutation={LIKE_RECIPE}
                        variables={{ _id, userName }}
                        update={this.updateLike}>
                        {likeRecipe => (
                            userName
                            && <button onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                                {liked ? 'Unlike' : 'Like'}
                            </button>
                        )}
                    </Mutation>
                )}
            </Mutation>
        )
    }
}

export default withSession(LikeRecipe);
