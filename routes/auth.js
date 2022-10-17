const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {login,register,verify} = require('../controller/users');

router.post('/register', register);

router.post('/login', login);

router.get('/verify', verify);

module.exports = router;
