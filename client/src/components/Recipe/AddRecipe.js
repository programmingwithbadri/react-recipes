import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { ADD_RECIPE } from '../../queries';
import Error from '../Error';

const initialState = {
    name: "",
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

    validateForm = () => {
        const { name, description, instructions } = this.state;
        const isInValid = !name || !description || !instructions;
        return isInValid
    }

    clearState = () => {
        this.setState({ ...initialState })
    }

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();
        addRecipe().then(async ({ data }) => {
            console.log(data);
            this.clearState();
            this.props.history.push('/')
        })
    }

    componentDidMount() {
        this.setState({
            userName: this.props.session.getCurrentUser.userName
        });
    }

    render() {
        const { name, category, description, instructions, userName } = this.state;
        return (
            <Mutation mutation={ADD_RECIPE}
                variables={{ name, category, description, instructions, userName }}>
                {(addRecipe, { data, loading, error }) => {
                    return (
                        <div className="App">
                            <h2>Add a Recipe</h2>
                            <form className="form" onSubmit={event => this.handleSubmit(event, addRecipe)}>
                                <input type="text" name="name" onChange={this.handleChange} placeholder="Add Recipe Name" value={name} />
                                <select name="category" onChange={this.handleChange} value={category}>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snack">Snack</option>
                                </select>
                                <input type="text" name="description" onChange={this.handleChange} placeholder="Add Description" value={description} />
                                <textarea name="instructions" onChange={this.handleChange} placeholder=" Add Instructions" value={instructions}></textarea>
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

export default withRouter(AddRecipe);
