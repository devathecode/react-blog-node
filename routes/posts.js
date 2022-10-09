const router = require('express').Router();
const verify = require('../verifyToken/verifytoken')

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'Angular components',
            description: 'sjnknsjkjnkjnkjnknsknkjsn'
        }
    })
})

module.exports = router;
