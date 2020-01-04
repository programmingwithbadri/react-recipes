const config = {
    production: {
        DATABASE: process.env.MONGODB_URI,
        SECRET: process.env.SECRET,
        PORT: process.env.PORT,
        GRAPHQLAPI: process.env.GRAPHQLAPI
    },
    default: {
        DATABASE: 'mongodb://localhost:27017/recipes',
        SECRET: 'SUPERSECRET',
        PORT: 4444,
        GRAPHQLAPI: 'http://localhost:4444/graphql'
    }
}

exports.get = function (env) {
    return config[env] || config.default
}