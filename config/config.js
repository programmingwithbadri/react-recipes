const config = {
    production: {
        DATABASE: process.env.MONGODB_URI,
        SECRET: process.env.SECRET,
        PORT: process.env.PORT
    },
    default: {
        DATABASE: 'mongodb://localhost:27017/recipes',
        SECRET: 'SUPERSECRET',
        PORT: 4444
    }
}

exports.get = function (env) {
    return config[env] || config.default
}