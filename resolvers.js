const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('./config/config').get(process.env.NODE_ENV);

const createToken = (user, secret, expiresIn) => {
    const { userName, email } = user;
    return jwt.sign({ userName, email }, secret, { expiresIn })
}
exports.resolvers = {
    Query: {
        // Method gets param(root, args, context)
        // args: args defined/ will be passed in the schema
        // context: which model will be affected?
        getAllRecipes: async (root, args, { Recipe }) => {
            return await Recipe.find();
        },

        // Since we are sending the arg as id in the schema,
        // we are destructuring that in the func param,
        // instead of passing args like other queries
        getRecipe: async (root, { _id }, { Recipe }) => {
            return await Recipe.findOne({ _id });
        },

        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }

            const user = await User.findOne({ userName: currentUser.userName })
                .populate({
                    path: 'favourites', // populate the recipes for the user model
                    model: 'Recipe'
                });

            return user;
        }
    },
    Mutation: {
        // Method gets param(root, args, context)
        // args: args defined/ will be passed in the schema
        // context: which model will be affected?
        addRecipe: async (root, { name, category, description, instructions, userName }, { Recipe }) => {
            const newRecipe = await new Recipe({
                name,
                category,
                description,
                instructions,
                userName
            }).save();

            return newRecipe;
        },

        signUpUser: async (root, { userName, email, password }, { User }) => {
            const user = await User.findOne({ userName });

            if (user) {
                throw new Error("User Already exists!");
            }

            const newUser = await new User({
                userName,
                email,
                password
            }).save();

            return { token: createToken(newUser, config.SECRET, '1hr') };
        },

        signInUser: async (root, { userName, password }, { User }) => {
            const user = await User.findOne({ userName });

            if (!user) {
                throw new Error("User not exists!");
            }

            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                throw new Error("Invalid password");
            }

            return { token: createToken(user, config.SECRET, '1hr') };
        }
    }
};