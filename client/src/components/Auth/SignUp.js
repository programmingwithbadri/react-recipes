import React, { Component } from 'react'

export default class SignUp extends Component {
    render() {
        return (
            <div className="App">
                <h2 className="App">SignUp</h2>
                <form className="form">
                    <input type="text" name="username" placeholder="User Name" />
                    <input type="email" name="email" placeholder="Email Address" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                    <button type="submit" className="button-primary">Submit</button>
                </form>
            </div>
        )
    }
}
