const mongoose = require('mongoose');


module.exports = () => { 
    // connection
    const conn = mongoose.connect('mongodb+srv://admin:admin@cluster0.x6ckbnw.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>console.log('Successfully connected to database'))

}
