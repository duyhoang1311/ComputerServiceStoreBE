const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const PhieuNhapController = require('../controllers/phieunhap.controller')

router.post('/tao-phieu-nhap', middleware.verifyToken, PhieuNhapController.taoPhieuNhap);
router.post('/get-all-phieu-nhap', middleware.verifyAdminAuth, PhieuNhapController.getAllPhieuNhap);

module.exports = router;
