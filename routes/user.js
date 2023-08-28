const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const middleware = require('../middleware/middleware')

router.post('/post', middleware.verifyToken, UserController.laphoadon);

module.exports = router;
