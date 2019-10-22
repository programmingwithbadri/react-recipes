import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    userName: "",
    password: ""
}

export default class SignIn extends Component {
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

    validateForm = () => {
        const { userName, password } = this.state;
        const isInValid = !userName || !password;
        return isInValid
    }

    handleSubmit = (event, signInUser) => {
        event.preventDefault();
        signInUser().then(data => {
            console.log(data)
        })

        this.clearState();

    }

    render() {
        const { userName, password } = this.state;
        return (
            <div className="App">
                <h2 className="App">SignIn</h2>
                <Mutation mutation={SIGNIN_USER}
                    variables={{ userName, password }}>
                    {(signInUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signInUser)}>
                                <input type="text" name="userName" onChange={this.handleChange} placeholder="User Name" value={userName} />
                                <input type="password" name="password" onChange={this.handleChange} placeholder="Password" value={password} />
                                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}
