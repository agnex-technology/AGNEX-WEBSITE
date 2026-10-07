const express = require('express');
const consultationController = require('../controllers/consultation.controller');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Route-level rate limiter: maximum 10 submissions per 15 minutes per IP
const consultationLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message: 'Too many consultation requests from this IP. Please wait a few minutes before trying again.'
    }
});

router.post('/', consultationLimiter, consultationController.createConsultation);

module.exports = router;
