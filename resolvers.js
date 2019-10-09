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
        }
    }
};