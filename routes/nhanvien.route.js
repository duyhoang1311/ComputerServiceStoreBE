const express = require('express');
const router = express.Router();
const NhanVienController = require('../controllers/nhanvien.controller');
const middleware = require('../middleware/middleware');

router.post('/staff-register', NhanVienController.nvdangky);
router.post('/staff-login', NhanVienController.nvdangnhap);
router.get('/all-staff', middleware.verifyToken, NhanVienController.getallnv);



module.exports = router;
