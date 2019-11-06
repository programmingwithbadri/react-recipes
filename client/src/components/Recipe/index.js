import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo'
import { GET_RECIPE } from '../../queries';

const Recipe = (props) => {
    // Destructuring the props to get param
    // id will be sent in the url
    const { _id } = props.match.params; // properly destructuring props.match.params._id
    console.log(_id);
    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>Error!</div>;
                console.log(data);
                return <div >Recipe page</div>;
            }}
        </Query >
    )
}

export default withRouter(Recipe); 
