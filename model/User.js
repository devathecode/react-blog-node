const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.generateToken = () =>{
    return jwt.sign({id:this._id,name:this.name,isVerified:this.isVerified,},JWT_SECRET)
}
module.exports = mongoose.model('User', userSchema);
