const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const saltRounds = 10;

const UserSchema = new Schema({
    username: String,
    password: String
})

UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        // Store hash in your password DB.
        if (err) console.error(err);
        user.password = hash;
        next();
    });
})

// export model
const User = mongoose.model('User', UserSchema);

module.exports = User;