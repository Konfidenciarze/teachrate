const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: { type: String, reqired: true, unique: true},
    password: {type: String},
    prime: {type: String, default: ''},
    secondary: {type: String, default: ''}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);