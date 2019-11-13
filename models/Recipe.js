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
        type: Number,
        default: 0
    },
    userName: {
        type: String
    }
});

// adding index to say which fields we are searching on
RecipeSchema.index({
    '$**': 'text'
});

module.exports = mongoose.model('Recipe', RecipeSchema);