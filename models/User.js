var mongoosedb = require('../config/dbconfig');
var bcrypt = require('bcryptjs');



let date = new Date();
date = date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });


// User Schema
var UserSchema = mongoosedb.Schema({
    username: {
        type: String,
        index: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    profileimg: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    date_at: {
        type: String,
        default: date,
    },
});

var User = module.exports = mongoosedb.model('User', UserSchema);


module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}