const express = require('express');
const router = express.Router;
const middleware = require('../middleware/middleware');
const userRouter = require('./user');
const authRouter = require('./auth');
const khachRouter = require('./khach.route');
const nhanvienRouter = require('./nhanvien.route');

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/khach', khachRouter);
    app.use('/nhanvien', nhanvienRouter);
}

module.exports = routes;
