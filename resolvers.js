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
            return await Recipe.find().sort({
                createdDate: "desc"
            });
        },

        // Since we are sending the arg as id in the schema,
        // we are destructuring that in the func param,
        // instead of passing args like other queries
        getRecipe: async (root, { _id }, { Recipe }) => {
            return await Recipe.findById({ _id });
        },

        searchRecipes: async (root, { searchTerm }, { Recipe }) => {
            if (searchTerm) {
                const searchResults = await Recipe.find(
                    {
                        // find the search term based on the index set
                        $text: { $search: searchTerm }
                    },
                    {
                        // adds the meta field in the recipe
                        // to identify which field is searched most
                        score: { $meta: "textScore" }
                    })
                    .sort({
                        // so that we could sort by meta field
                        score: { $meta: 'textScore' }
                    });

                return searchResults;
            } else {
                // if nothing is entered in search box return all recipes
                return await Recipe.find().sort({
                    likes: 'desc',
                    createdDate: 'desc'
                });
            }
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
        },

        getUserRecipes: async (root, { userName }, { Recipe }) => {
            return await Recipe.find({ userName }).sort({
                createdDate: 'desc'
            });
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

        likeRecipe: async (root, { _id, userName }, { Recipe, User }) => {
            // find the recipe by id and increment likes by 1.
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
            const user = await User.findOneAndUpdate({ userName }, {
                $addToSet: {
                    favourites: _id
                }
            })

            return recipe;
        },

        unlikeRecipe: async (root, { _id, userName }, { Recipe, User }) => {
            // find the recipe by id and increment likes by 1.
            const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
            const user = await User.findOneAndUpdate({ userName }, {
                $pull: {
                    favourites: _id
                }
            })

            return recipe;
        },

        deleteUserRecipe: async (root, { _id }, { Recipe }) => {
            return await Recipe.findOneAndRemove({ _id })
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