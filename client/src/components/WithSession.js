import Query from 'react-apollo'

const WithSession = Component => props => (
    <Query>
        {({ data, loading }) => {
            return (
                <Component {...pxrops} />
            )
        }}
    </Query>
)

export default WithSession
