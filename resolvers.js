const jwt = require('jsonwebtoken');
const config = require('./config/config').get(process.env.NODE_ENV);

const createToken = (user, secret, expiresIn) => {
    const {userName, email} = user;
    return jwt.sign({userName, email}, secret, {expiresIn})
}
exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            return await Recipe.find();
        }
    },
    Mutation: {
        // Method gets param(root, args, context)
        addRecipe: async (root, { name, category, description, instructions, userName}, {Recipe}) => {
            const newRecipe = await new Recipe({
                name,
                category,
                description,
                instructions,
                userName
            }).save();

            return newRecipe;
        },

        signUpUser: async(root, {userName, email, password}, {User}) => {
            const user = await User.findOne({userName});

            if(user) {
                throw new Error("User Already exists!");
            }

            const newUser = await new User({
                userName,
                email,
                password
            }).save();

            return {token: createToken(newUser, config.SECRET, '1hr' )};
        }
    }
};