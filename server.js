const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config').get(process.env.NODE_ENV);

// Import mongoose models
const User = require('./models/User');
const Recipe = require('./models/Recipe');

const PORT = process.env.PORT || 4444;

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

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

// Connects Schemas with GraphQL
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context:{
        Recipe,
        User
    }
}))

app.listen(PORT, ()=> {
    console.log(`Server is listening at port ${PORT}`)
});
