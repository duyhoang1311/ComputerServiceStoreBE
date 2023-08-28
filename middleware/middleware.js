const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const Middleware = {
    // verifyToken, xac thuc nguoi dung
    verifyToken(req, res, next) {
        const token = req.headers.token;
        // Neu nguoi dung co token
        if (token) {
            const accessToken = token.split(' ')[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.json({ success: false, message: 'Token is not valid' });
                req.userId = user.userId;
                req.nhanvien = user.nhanvien;
                req.khach = user.khach;
                next();
            });
        } else {
            return res.json({ success: false, message: 'You are not authenticated' });
        }
    },

    verifyAdminAuth(req, res, next) {
        Middleware.verifyToken(req, res, () => {
            if (req.nhanvien) {
                next();
            } else {
                console.log('Là nhân viên: ' + req.nhanvien);
                console.log('Là khách: ' + req.khach);
                return res.status(403).json({ success: false, message: 'Bạn không có quyền thực hiện lệnh này' });
            }
        });
    },
};

module.exports = Middleware;
