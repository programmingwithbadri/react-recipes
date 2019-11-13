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
    userName: String! @unique
    password: String  
    email: String! @unique
    joinedDate: String
    favourites: [Recipe]
}
type Query {
    getAllRecipes: [Recipe]
    getCurrentUser: User
    getRecipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String): [Recipe]
}
type Mutation {
    addRecipe(name: String!, category: String!, description: String!,
    instructions: String!, userName: String): Recipe

    signUpUser(userName: String!, email: String!, password: String!): Token

    signInUser(userName: String!, password: String!): Token
}
`;