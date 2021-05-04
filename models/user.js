'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  avatar: String,
  hash: String,
  salt: String,
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

// Method to save the password crypto
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

module.exports = mongoose.model('User', UserSchema)
