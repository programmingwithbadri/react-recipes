import React, { Component } from 'react';

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

    clearState = () => {
        this.setState({ ...initialState })
    }

    render() {
        const { name, description, category, instructions } = this.state;
        return (
            <div className="App">
                <h2>Add a Recipe</h2>
                <form className="form">
                    <input type="text" name="name" onChange={this.handleChange} placeholder="Add Recipe Name" value={name} />
                    <select name="category" onChange={this.handleChange} value={category}>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snack">Snack</option>
                    </select>
                    <input type="text" name="description" onChange={this.handleChange} placeholder="Add Description" value={description} />
                    <textarea name="instructions" onChange={this.handleChange} placeholder=" Add Instructions" value={instructions}></textarea>
                    <button type="submit"></button>
                </form>
            </div>
        )
    }
}

export default AddRecipe
