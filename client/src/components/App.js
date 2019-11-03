import React from 'react';
import './App.css';
import { GET_ALL_RECIPES } from '../queries';
import { Query } from 'react-apollo';

const App = () => (
  <div className="App">
    <h1> Hello </h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>
        if (error) return <div>Error!</div>

        console.log(data);

        return (
          <ul>{data.getAllRecipes.map(recipe => (
            <li key={recipe._id}>
              {recipe.name}
            </li>
          ))}
          </ul>
        )
      }}
    </Query>
  </div>
)

export default App;
