import React from 'react'
import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE, GET_ALL_RECIPES, GET_CURRENT_USER } from '../../queries';
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
                                    <Mutation
                                        mutation={DELETE_USER_RECIPE}
                                        variables={{ _id: recipe._id }}
                                        // the below queries will be run so that
                                        // it will be update in home page
                                        refetchQueries={() => [
                                            { query: GET_ALL_RECIPES },
                                            { query: GET_CURRENT_USER }
                                        ]}
                                        update={(cache, { data: { deleteUserRecipe } }) => { // destructuring deleteUserRecipe
                                            const { getUserRecipes } = cache.readQuery({
                                                query: GET_USER_RECIPES,
                                                variables: { userName }
                                            }); // get all user recipes from the cache

                                            // update the cache to remove the deleted recipe 
                                            // so that we dont need to reload the page
                                            // to not see the deleted recipe
                                            cache.writeQuery({
                                                query: GET_USER_RECIPES,
                                                variables: { userName },
                                                data: {
                                                    getUserRecipes: getUserRecipes.filter(
                                                        recipe => recipe._id !== deleteUserRecipe._id
                                                    )
                                                }
                                            });
                                        }}
                                    >
                                        {(deleteUserRecipe, attrs = {}) => { // attrs contains the additional functions to find if the operation is loading
                                            return (
                                                <p
                                                    className="delete-button"
                                                    onClick={() => deleteRecipe(deleteUserRecipe)}
                                                >
                                                    {attrs.loading ? "deleting..." : "X"}
                                                </p>
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