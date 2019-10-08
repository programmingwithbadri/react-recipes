const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: number,
        default: 0
    },
    userName: {
        type: String
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema);