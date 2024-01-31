const mongoose = require('mongoose');
const validator = require('validator')

require('dotenv').config();

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Provide correct email address!')
            }
        }
    },
    password: {type: String, required: true, trim: true, minlength: 6}
});

const User = mongoose.model('user', userSchema);

module.exports = User;