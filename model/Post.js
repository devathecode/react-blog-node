const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    featuredImage: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('POST', postSchema);