const express = require('express');
const hrmsController = require('../controllers/hrms.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');
const { upload } = require('../services/storage.service');

const router = express.Router();

// Publicly viewable jobs
router.get('/jobs', hrmsController.getAllJobs);

// Protected routes
router.use(protect);

// Candidates can apply for jobs
router.post('/jobs/:jobId/apply', restrictTo('Candidate'), upload.single('resume'), hrmsController.applyForJob);

// Recruiters can manage jobs
router.post('/jobs', restrictTo('Admin', 'Recruiter'), hrmsController.createJob);

module.exports = router;
