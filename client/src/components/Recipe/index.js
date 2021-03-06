import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo'
import { GET_RECIPE } from '../../queries';
import LikeRecipe from './LikeRecipe';
import { Spinner } from '../Spinner';

const Recipe = (props) => {
    // Destructuring the props to get param
    // id will be sent in the url
    const { _id } = props.match.params; // properly destructuring props.match.params._id
    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ data, loading, error }) => {
                if (loading) return <Spinner />
                if (error) return <div>Error!</div>;
                return (
                    <div className="App">
                        <div className="recipe-image"
                            style={{
                                background: `url(${data.getRecipe.imageUrl})
                             center center / cover no-repeat` }}
                        ></div>
                        <div className="recipe">
                            <div className="recipe-header">
                                <h2 className="recipe-name">
                                    <strong>{data.getRecipe.name}</strong>
                                </h2>
                                <h5>
                                    <strong>{data.getRecipe.category}</strong>
                                </h5>
                                <p>
                                    Created by <strong>{data.getRecipe.username}</strong>
                                </p>
                                <p>
                                    {data.getRecipe.likes} <span role="img"
                                        aria-label="heart">❤️</span>
                                </p>
                            </div>
                            <blockquote className="recipe-description">
                                {data.getRecipe.description}
                            </blockquote>
                            <h3 className="recipe-instructions__title">
                                Instructions:
                            </h3>
                            <div className="recipe-instructions"
                                dangerouslySetInnerHTML={{
                                    __html: data.getRecipe.instructions // Inserts HTMl tag here
                                }}>
                            </div>
                            <LikeRecipe _id={_id} />
                        </div>
                    </div>
                );
            }}
        </Query >
    )
}

export default withRouter(Recipe); 
