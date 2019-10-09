exports.resolvers = {
    Query: {
        getAllRecipes: () => {}
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