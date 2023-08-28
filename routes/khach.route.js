const express = require('express');
const router = express.Router();
const KhachController = require('../controllers/khach.controller')
const middleware = require('../middleware/middleware')

router.post('/customer-register', KhachController.khachdangky)
router.post('/customer-login', KhachController.khachdangnhap)

module.exports = router;