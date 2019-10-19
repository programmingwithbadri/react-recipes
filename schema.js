exports.typeDefs = `
type Recipe {
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    userName: String
}
type Token {
    token: String!
}
type User {
    _id: ID
    username: String! @unique
    password: String  
    email: String! @unique
    joinedDate: String
    favourites: [Recipe]
}
type Query {
    getAllRecipes: [Recipe]
}
type Mutation {
    addRecipe(name: String!, category: String!, description: String!,
    instructions: String!, userName: String): Recipe

    signUpUser(userName: String!, email: String!, password: String!): Token
}
`;