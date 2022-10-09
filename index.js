const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import routes
const authRoute = require('./routes/auth');
const postRoutes = require('./routes/posts');
const cors = require('cors');

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
    console.log('connected to DB')
});

// Middleware
app.use(express.json());
//Route Middlewares
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api/user', authRoute);
app.use('/api/posts', postRoutes);

app.listen(9000, () => {
    console.log('Server running...')
});
