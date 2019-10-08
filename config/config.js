const config = {
    production: {
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        DATABASE: 'mongodb://localhost:27017/recipes'
    }
}

exports.get = function (env) {
    return config[env] || config.default
}