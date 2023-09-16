const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const KhachController = require('../controllers/khach.controller');

router.post('/customer-register', KhachController.khachDangKy);
router.post('/customer-login', KhachController.khachDangNhap);
router.get('/get-all-customer', middleware.verifyAdminAuth, KhachController.layTatCaKhach);
router.delete('/delete-customer/:_id', middleware.verifyAdminAuth, KhachController.xoaKhach);
router.put('/update-customer/:_id', middleware.verifyToken, KhachController.capNhatKhach);

module.exports = router;
