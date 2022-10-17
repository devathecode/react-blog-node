const express = require('express');
const app = express();
require('dotenv').config();


//connecting  to the database
require('./startup/db')();

//importing routes
require('./startup/routes')(app);

//listening to port
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running... on port ${PORT}`)
});
