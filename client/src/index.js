import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import WithSession from './components/WithSession';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    // Destructing network error for now
    onError: ({ networkError }) => {
        if (networkError) {
            console.log("Network Error", networkError);

            if (networkError.statusCode === 401) {
                localStorage.removeItem('token');
            }
        }
    }
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

const RootWithSession = WithSession(Root); // Add the higher order component for Root component

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, document.getElementById('root'));

