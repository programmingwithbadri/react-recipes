import React from 'react'
import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE } from '../../queries';
import { Link } from 'react-router-dom';

const deleteRecipe = deleteUserRecipe => {
    const confirmDelete = window.confirm('Are you sure you want to delete the recipe?');

    if (confirmDelete) {
        deleteUserRecipe().then(({ data }) => {
            console.log(data)
        })

    }
}

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
                                    <p style={{ marginBottom: '0' }}>Likes: {recipe.likes}</p>
                                    <Mutation mutation={DELETE_USER_RECIPE} variables={{ _id: recipe._id }}>
                                        {deleteUserRecipe => {
                                            return (
                                                <p
                                                    className="delete-button"
                                                    onClick={() => deleteRecipe(deleteUserRecipe)}
                                                >X</p>
                                            )
                                        }}
                                    </Mutation>
                                </li>
                            ))
                        }
                    </ul>)
            }}
        </Query>
    )
}
