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
import NavBar from './components/NavBar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import Recipe from './components/Recipe';
import Profile from './components/Profile';

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

const Root = ({ refetch, session }) => (
    <BrowserRouter>
        <NavBar session={session} />
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/signin" render={() => <SignIn refetch={refetch} />} />
            <Route path="/signup" render={() => <SignUp refetch={refetch} />} />
            <Route path="/search" component={Search} />
            <Route path="/recipe/add" render={() => <AddRecipe session={session} />} />
            <Route path="/recipe/:_id" component={Recipe} />
            <Route path="/profile" component={Profile} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
)

const RootWithSession = WithSession(Root); // Add the higher order component for Root component

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, document.getElementById('root'));

