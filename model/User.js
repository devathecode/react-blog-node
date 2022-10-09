const mongoose = require('mongoose');
const {boolean, string} = require("joi");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max : 255,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationString: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('User', userSchema);
