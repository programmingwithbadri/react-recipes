import React from 'react'
import { Query } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries';
import { Link } from 'react-router-dom';

export const UserRecipes = ({ userName }) => {
    return (
        <Query query={GET_USER_RECIPES} variables={{ userName }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div>Error!</div>
                return (
                    <ul className="App">
                        <h3>Your Recipe's:</h3>
                        {
                            data.getUserRecipes.map(recipe => (
                                <li key={recipe._id}>
                                    <Link to={`/recipe/${recipe._id}`}>
                                        <p>{recipe.name}</p>
                                    </Link>
                                    <p>Likes: {recipe.likes}</p>
                                </li>
                            ))
                        }
                    </ul>)
            }}
        </Query>
    )
}
