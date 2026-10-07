const express = require('express');
const authController = require('../controllers/auth.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Routes
router.use(protect); // All routes after this require a valid JWT

router.get('/me', authController.getMe);

// Admin Only Routes
router.use(restrictTo('Admin'));
// e.g. router.get('/users', userController.getAllUsers);

module.exports = router;
