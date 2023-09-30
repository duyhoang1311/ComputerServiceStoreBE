const express = require('express');
const router = express.Router();
const DichVuController = require('../controllers/dichvu.controller');

router.post('/them-dich-vu', DichVuController.themDichVu);
router.get('/get-all-dich-vu', DichVuController.getAllDichVu);
router.delete('/xoa-dich-vu/:_id', DichVuController.xoaDichVu);
router.put('/sua-dich-vu/:_id', DichVuController.suaDichVu);

module.exports = router;
