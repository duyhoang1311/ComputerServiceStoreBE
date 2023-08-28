const jwt = require('jsonwebtoken');

class middleware {
    // verifyToken, xac thuc nguoi dung
    verifyToken(req, res, next) {
        const token = req.headers.token
        // Neu nguoi dung co token
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.json({ success: false, message: 'Token is not valid' });
                req.userId = user.userId;
                next();
            });
        } else {
            return res.json({ success: false, message: 'You are not authenticated' });
        }
    }
}

module.exports = new middleware();
