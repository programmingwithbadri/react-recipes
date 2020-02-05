exports.typeDefs = `
type Recipe {
    _id: ID
    name: String!
    imageUrl: String!
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
    getUserRecipes(userName: String!): [Recipe]
    getRecipe(_id: ID!): Recipe
    searchRecipes(searchTerm: String): [Recipe]
}
type Mutation {
    addRecipe(name: String!, imageUrl: String!, category: String!, description: String!,
    instructions: String!, userName: String): Recipe
    
    deleteUserRecipe(_id: ID!) : Recipe

    likeRecipe(_id: ID!, userName: String!): Recipe

    unlikeRecipe(_id: ID!, userName: String!): Recipe

    signUpUser(userName: String!, email: String!, password: String!): Token

    signInUser(userName: String!, password: String!): Token
}
`;