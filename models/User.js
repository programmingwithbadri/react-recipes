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
    userName: {
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

module.exports = mongoose.model('User', UserSchema);