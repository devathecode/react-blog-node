const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied');

    const verified = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        {algorithm: 'RS65'},
        (error, verify) =>{
        if(error) res.status(400).send('Invalid token');
        res.user = verify;
        next()
    });
}

module.exports = auth;
