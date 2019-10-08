const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    favourites: {
        type: [Schema.Types.ObjectId],
        ref: 'Recipe'
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User }