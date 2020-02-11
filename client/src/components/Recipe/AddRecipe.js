import React, { Component } from 'react';
import CKEditor from 'react-ckeditor-component';
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';
import Error from '../Error';
import { WithAuth } from '../WithAuth';

const initialState = {
    name: "",
    imageUrl: "",
    description: "",
    instructions: "",
    category: "Breakfast",
    userName: ""
}

class AddRecipe extends Component {
    state = { ...initialState }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleInstructionsChange = (event) => {
        const newContent = event.editor.getData()
        this.setState({
            instructions: newContent
        })
    }

    validateForm = () => {
        const { name, imageUrl, description, instructions } = this.state;
        const isInValid = !name || !description || !instructions || !imageUrl;
        return isInValid
    }

    clearState = () => {
        this.setState({ ...initialState })
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(async ({ data }) => {
            this.clearState();
            this.props.history.push('/')
        })
    }

    // updating the cache to add the currently added recipe to the getAllRecipes query
    // Destructuring the single object cache to cache and addRecipe from data
    // Note: This is being performed because sometimes it is possible
    // that the recipe would be added to the DB but while redirecting to the home page
    // the newly added recipe wont be showed
    // because we are doing to calls, addRecipe and GetAllRecipes which will take time
    updateCache = (cache, { data: { addRecipe } }) => {
        // Get the current recipes from the cache
        const { getAllRecipes } = cache.readQuery({
            query: GET_ALL_RECIPES
        });

        // Manually adding the newly added recipe to the cache
        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            }
        })

    }

    componentDidMount() {
        this.setState({
            userName: this.props.session.getCurrentUser.userName
        });
    }

    render() {
        const { name, imageUrl, category, description, instructions, userName } = this.state;
        return (
            <Mutation mutation={ADD_RECIPE}
                variables={{ name, imageUrl, category, description, instructions, userName }}
                // the below queries will be run so that
                // it will be update in profile page
                refetchQueries={() => [
                    { query: GET_USER_RECIPES, variables: { userName } }
                ]}
                update={this.updateCache}>
                {(addRecipe, { data, loading, error }) => {
                    return (
                        <div className="App">
                            <h2>Add a Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                                <input type="text" name="name" onChange={this.handleChange} placeholder="Add Recipe Name" value={name} />
                                <input type="text" name="imageUrl" onChange={this.handleChange} placeholder="Add Image" value={imageUrl} />
                                <select name="category" onChange={this.handleChange} value={category}>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                                <input type="text" name="description" onChange={this.handleChange} placeholder="Add Description" value={description} />
                                <label htmlFor="instructions"> Add Instructions </label>
                                <CKEditor
                                    name="instructions"
                                    content={instructions}
                                    events={{
                                        change: this.handleInstructionsChange
                                    }} />
                                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        </div>
                    );
                }}
            </Mutation>
        )
    }
}

export default WithAuth(session => session && session.getCurrentUser)(withRouter(AddRecipe));
