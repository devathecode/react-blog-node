const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation/user.validation");

module.exports.register = async (req, res) => {

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
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        isVerified: false,
    });
    const stringToSend = jwt.sign(user._id,JWT_RESETPASS_SECRET);

    try {
        const savedUser = await user.save();
        sendEmail(req.body.email, req.body.host, stringToSend);
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
}



module.exports.login = async (req, res) => {

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

    // Create and assign a token
    const token = user.generateToken();
    res.send({messgage:'Successfull login',token})
}


module.exports.verify = async (req,res) =>{
    // Extract token from query param
    const verificationToken = req.params.token;
    if (!verificationToken) return res.status(409).send('Invalid verification url');

    //decoding
    const decoded = jwt.verify(req.params.token,JWT_RESETPASS_SECRET);

    // If user is verified
    const user = await User.findById(decoded._id);
    if(user.isVerified) return res.status(409).send('You have already verified your email address please login to proceed.')

    // Update that the user is verified now
    user.isVerified = true;
    await user.save();
    res.send({message:'Successfully verified'});
}