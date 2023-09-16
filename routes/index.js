const express = require('express');
const router = express.Router;
const middleware = require('../middleware/middleware');
const userRouter = require('./user');
const authRouter = require('./auth');
const khachRouter = require('./khach.route');
const nhanvienRouter = require('./nhanvien.route');
const loaidichvuRouter = require('./loaidv.route');
const dichvuRouter = require('./dichvu.route');
const phieuNhapRouter = require('./phieunhap.route');
const hoadonRouter = require('./hoadon.route');

function routes(app) {
    app.use('/auth', authRouter);
    app.use('/user', userRouter);
    app.use('/khach', khachRouter);
    app.use('/nhanvien', nhanvienRouter);
    app.use('/loaidv', loaidichvuRouter);
    app.use('/dichvu', middleware.verifyAdminAuth, dichvuRouter);
    app.use('/phieu-nhap', phieuNhapRouter);
    app.use('/hoadon', middleware.verifyAdminAuth, hoadonRouter);
}

module.exports = routes;
