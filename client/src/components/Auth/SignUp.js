import React, { Component } from 'react'

export default class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })

    }
    render() {
        const { username, email, password, confirmPassword } = this.state;
        return (
            <div className="App">
                <h2 className="App">SignUp</h2>
                <form className="form">
                    <input type="text" name="username" onChange={this.handleChange} placeholder="User Name" value={this.username} />
                    <input type="email" name="email" onChange={this.handleChange} placeholder="Email Address" value={this.email} />
                    <input type="password" name="password" onChange={this.handleChange} placeholder="Password" value={this.password} />
                    <input type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Confirm Password" value={this.confirmPassword} />
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    }
}
