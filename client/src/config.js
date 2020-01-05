const config = {
    production: {
        GRAPHQLAPI: process.env.GRAPHQLAPI
    },
    default: {
        GRAPHQLAPI: 'http://localhost:4444/graphql'
    }
}

exports.get = function (env) {
    return config[env] || config.default
}
