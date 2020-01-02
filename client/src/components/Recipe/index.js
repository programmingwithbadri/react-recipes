import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo'
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';

const Recipe = (props) => {
    // Destructuring the props to get param
    // id will be sent in the url
    const { _id } = props.match.params; // properly destructuring props.match.params._id
    console.log(_id);
    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error!</div>;
                return (
                    <div className="App">
                        <h2>{data.getRecipe.name}</h2>
                        <p>Category: {data.getRecipe.category}</p>
                        <p>Description: {data.getRecipe.description}</p>
                        <p>Instructions: {data.getRecipe.instructions}</p>
                        <p>Likes: {data.getRecipe.likes}</p>
                        <p>Created By: {data.getRecipe.userName}</p>
                        <LikeRecipe _id={_id} />
                    </div>
                );
            }}
        </Query >
    )
}

export default withRouter(Recipe); 
