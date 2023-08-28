const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware')
const LoaiDichVuController = require('../controllers/loaidichvu.controller');

router.post('/create-type-service', middleware.verifyAdminAuth, LoaiDichVuController.taoloaidv);

module.exports = router;
