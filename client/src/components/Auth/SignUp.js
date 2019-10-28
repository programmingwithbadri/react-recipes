import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

class SignUp extends Component {
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
        const { userName, email, password, confirmPassword } = this.state;
        const isInValid = !userName || !email || !password || password !== confirmPassword
        return isInValid
    }

    handleSubmit = (event, signUpUser) => {
        event.preventDefault();
        signUpUser().then(({ data }) => {
            console.log(data)
            localStorage.setItem("token", data.signUpUser.token);
            this.clearState();
            this.props.history.push('/')
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

export default withRouter(SignUp);