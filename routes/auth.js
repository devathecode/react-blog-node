const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../SendMail/Sendmail');

router.post('/register', async (req, res) => {

    // Let's validate
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // If user already in database
    const emailExists = await User.findOne({
        email: req.body.email
    });
    if (emailExists) return res.status(409).send('Email already exists');

    // Has password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const stringToSend = 'snkjbdjbskjfskdhfiush7fyew78r74w3i8fbies';
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isVerified: false,
        verificationString: stringToSend
    });
    try {
        const savedUser = await user.save();
        sendEmail(req.body.email, req.body.host, stringToSend);
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

    // Let's validate
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // If email exists
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(409).send('Email is not found');

    // If password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // If user is verified
    if(!user.isVerified) return res.status(401).send('Please verify your email to login.')

    console.log('user', user);
    // Create and assign a token
    const token = jwt.sign(
        {_id: user._id},
        process.env.TOKEN_SECRET,
        (error, generatedToken) => {
            console.log('gene', generatedToken);
            res.header('auth-token', generatedToken).send(user)
        }
    );
});

router.get('/verify', async (req, res) => {
    // Extract token from query param
    const verificationToken = req.query.token;
    if (!verificationToken) return res.status(409).send('Invalid verification url');

    // If user is verified
    const user = await User.findOne({
        verificationString: verificationToken
    });
    if(user.isVerified) return res.status(409).send('You have already verified your email address please login to proceed.')

    // Update that the user is verified now
    const userUpdated = await User.updateOne({verificationString: verificationToken}, {isVerified: true}).then((err, result) =>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    })
});

module.exports = router;
