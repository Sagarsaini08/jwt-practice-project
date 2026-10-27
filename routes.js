
const express = require('express');

const { handlesignup } = require('./Controller/signup');
const { handlesignin } = require('./Controller/signin');
const { authenticateToken } = require('./Controller/jwt');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', handlesignup);

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.post('/signin', handlesignin);

// Protected page
router.get('/home', authenticateToken, (req, res) => {
    res.render('home');
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/signin');
});

module.exports = router;
