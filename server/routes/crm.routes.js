const express = require('express');
const crmController = require('../controllers/crm.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// All CRM routes require authentication
router.use(protect);
// Restrict to internal team
router.use(restrictTo('Admin', 'AccountManager'));

router
    .route('/leads')
    .get(crmController.getAllLeads)
    .post(crmController.createLead);

router
    .route('/leads/:id/status')
    .patch(crmController.updateLeadStatus);

module.exports = router;
