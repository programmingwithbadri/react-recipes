import React from 'react';
import { withRouter } from 'react-router-dom';

const Recipe = (props) => {
    // Destructuring the props to get param
    // id will be sent in the url
    const _id = props.match.params;
    console.log(_id);
    return (
        <div>
            Recipe page
        </div>
    )
}

export default withRouter(Recipe); 
