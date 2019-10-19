import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql'
});

const Root = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
)

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>, document.getElementById('root'));

