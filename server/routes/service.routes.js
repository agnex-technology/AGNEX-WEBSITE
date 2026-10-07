const express = require('express');
const router = express.Router();
// Placeholder controller
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            services: [
                { id: 1, name: 'Web Development', active: true },
                { id: 2, name: 'Mobile Apps', active: true },
                { id: 3, name: 'Cloud Infrastructure', active: true }
            ]
        }
    });
});
module.exports = router;
