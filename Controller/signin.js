
const User = require('../Model/signup.js');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'my-secret-key';

async function handlesignin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(400).send('Wrong email or password');
        }

        const token = jwt.sign(
            { userId: user._id },
            SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000
        });

        return res.redirect('/home');

    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
}

module.exports = { handlesignin };
