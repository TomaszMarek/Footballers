const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

require('dotenv').config();

router.post('/register', [
    //waliddacja danych typu express
    body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'), // Walidacja email
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email, // Dodane pole email
            password: req.body.password
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/login', [
    body('username').isLength({ min: 4 }).withMessage('Username must be at least 4 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body; //z ciała żądania

    try {
        const user = await User.findOne({ username }); //szukanie uzytkownik operacja asynchroniczna
        if (!user) {
            return res.status(401).json({ message: "User doesn't exist"  });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
