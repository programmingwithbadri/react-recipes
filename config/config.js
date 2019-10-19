const config = {
    production: {
        DATABASE: process.env.MONGODB_URI,
        SECRET: process.env.SECRET
    },
    default: {
        DATABASE: 'mongodb://localhost:27017/recipes',
        SECRET: 'SUPERSECRET'
    }
}

exports.get = function (env) {
    return config[env] || config.default
}