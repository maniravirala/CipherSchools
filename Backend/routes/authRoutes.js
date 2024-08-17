const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User Registration
router.post('/register', authController.register);

// User Login
router.post('/login', authController.login);

// User Logout
router.get('/logout', authController.logout);

module.exports = router;
