const express = require('express');
const authRoute = require('../routes/auth');
const postRoutes = require('../routes/posts');
const cors = require('cors');


module.exports = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use('/api/user', authRoute);
    app.use('/api/posts', postRoutes);
}
