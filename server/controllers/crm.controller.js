const WorkflowService = require('../services/workflow.service');
const { query } = require('../data/db.pool');

exports.getAllLeads = async (req, res, next) => {
    try {
        if (process.env.DATABASE_URL) {
            const dbResult = await query(
                'SELECT id, contact_name, contact_email, contact_phone, status, budget, created_at FROM leads ORDER BY created_at DESC LIMIT 100',
                [],
                req.correlationId || ''
            );
            return res.status(200).json({
                status: 'success',
                results: dbResult.rowCount,
                data: {
                    leads: dbResult.rows
                }
            });
        }

        // Development fallback when DATABASE_URL is not set
        res.status(200).json({
            status: 'success',
            results: 0,
            data: {
                leads: []
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.createLead = async (req, res, next) => {
    try {
        const { contact_name, status, budget } = req.body;
        // Placeholder for DB insert
        const newLead = { id: 'generated-uuid', contact_name, status: status || 'NEW', budget };
        
        // Trigger Background Workflow
        await WorkflowService.handleNewLead(newLead);

        res.status(201).json({
            status: 'success',
            data: {
                lead: newLead
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.updateLeadStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        // Placeholder for DB update
        res.status(200).json({
            status: 'success',
            data: {
                lead: { id, status }
            }
        });
    } catch (err) {
        next(err);
    }
};
