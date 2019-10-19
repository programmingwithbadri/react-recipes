import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';

export default class SignUp extends Component {
    state = {
        userName: "",
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

    handleSubmit = (event, signUpUser) => {
        event.preventDefault();
        signUpUser().then(data => {
            console.log(data)
        })

    }

    render() {
        const { userName, email, password, confirmPassword } = this.state;
        return (
            <div className="App">
                <h2 className="App">SignUp</h2>
                <Mutation mutation={SIGNUP_USER}
                    variables={{ userName, email, password }}>
                    {(signUpUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signUpUser)}>
                                <input type="text" name="userName" onChange={this.handleChange} placeholder="User Name" value={userName} />
                                <input type="email" name="email" onChange={this.handleChange} placeholder="Email Address" value={email} />
                                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" value={password} />
                                <input type="password" name="confirmPassword" onChange={this.handleChange} placeholder="Confirm Password" value={confirmPassword} />
                                <button type="submit" className="button-primary">Submit</button>
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}
