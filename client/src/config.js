const config = {
    production: {
        GRAPHQLAPI: 'http://reactrecipegraphql.herokuapp.com/graphql'
    },
    default: {
        GRAPHQLAPI: 'http://localhost:4444/graphql'
    }
}

exports.get = function (env) {
    return config[env] || config.default
}
