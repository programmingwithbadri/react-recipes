exports.typeDefs = `
type Recipe {
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int
    userName: String
}
type User {
    username: String! @unique
    password: String  
    email: String! @unique
    joinedDate: String
    favourites: [Recipe]
}
type Query {
    getAllRecipes: [Recipe]
}
`;