const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config').get(process.env.NODE_ENV);
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

// Import mongoose models
const User = require('./models/User');
const Recipe = require('./models/Recipe');

const PORT = config.PORT;

// Connects to Mongo DB
mongoose.connect(config.DATABASE);

// Graph QL express middlewares
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create GraphQL Schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Initializes server
const app = express();

app.use(cors());

// Setup JWT auth
app.use(async (req, res, next) => {
    const token = req.headers['authorization'];

    if (token !== "null") {
        try {
            const currentUser = await jwt.verify(token, config.SECRET);
            req.currentUser = currentUser; // passing the current user info to graphql express
        } catch (err) {
            console.log(err);
        }
    }
    next();
})

// Connects Schemas with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress(({ currentUser }) => ({
    schema, 
    context: {
        Recipe,
        User,
        currentUser // graphql makes the current user avail in our resolvers
    }
}))
);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
});
