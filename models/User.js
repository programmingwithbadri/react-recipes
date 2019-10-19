const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Runs this function before the data is being saved to the DB
UserSchema.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
            return next(err);
        }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            
            this.password = hash;
            next();
        })
    })
})

module.exports = mongoose.model('User', UserSchema);