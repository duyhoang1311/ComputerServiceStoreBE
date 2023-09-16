const express = require('express');
const router = express.Router();
const HoaDonController = require('../controllers/hoadon.controller');

router.post('/lap-hoa-don', HoaDonController.lapHoaDon);

module.exports = router;
