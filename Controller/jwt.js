
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'my-secret-key';

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    const token =
        req.cookies?.token ||
        (authHeader && authHeader.split(' ')[1]);

    if (!token) {
        return res.redirect('/signin');
    }

    try {
        const decoded = jwt.verify(token, SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        res.clearCookie('token');
        return res.redirect('/signin');
    }
}

module.exports = { authenticateToken };
