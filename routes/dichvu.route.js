const express = require('express');
const router = express.Router();
const DichVuController = require('../controllers/dichvu.controller');

router.post('/them-dich-vu', DichVuController.themDichVu);
router.get('/get-all-dich-vu', DichVuController.getAllDichVu);

module.exports = router;
