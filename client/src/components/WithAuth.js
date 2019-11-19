import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries';

export const WithAuth = conditionFunction => Component => props => (
    <Query query={GET_CURRENT_USER}>
        {({ data, loading, refetch }) => {
            if (loading) return null;
            return conditionFunction(data) ?
                <Component {...props} refetch={refetch} session={data} />
                : <Redirect to='/' />
        }}
    </Query>
)
