const { query } = require('../data/db.pool');
const NotificationService = require('../services/notification.service');

/**
 * Handle new consultation / RFP inquiries from the frontend
 * POST /api/v1/consultation
 */
exports.createConsultation = async (req, res, next) => {
    try {
        const {
            name,
            workEmail,
            company,
            phone,
            website,
            needHelpWith,
            description,
            timeline,
            budgetRange,
            preferredContactMethod,
            honeypot
        } = req.body;

        // Anti-bot honeypot: Silently accept without processing
        if (honeypot && String(honeypot).trim() !== '') {
            return res.status(200).json({
                status: 'success',
                message: 'Consultation request received',
                data: {
                    referenceId: `AGX-${Math.floor(100000 + Math.random() * 900000)}`
                }
            });
        }

        // Validate required fields
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ status: 'error', message: 'Full name is required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!workEmail || !emailRegex.test(String(workEmail).trim())) {
            return res.status(400).json({ status: 'error', message: 'Valid work email is required' });
        }

        if (!company || typeof company !== 'string' || company.trim().length === 0) {
            return res.status(400).json({ status: 'error', message: 'Company or organization name is required' });
        }

        if (!description || typeof description !== 'string' || description.trim().length < 15) {
            return res.status(400).json({
                status: 'error',
                message: 'Project description must be at least 15 characters'
            });
        }

        // Generate deterministic inquiry reference ID
        const referenceId = `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
        const receivedAt = new Date().toISOString();

        const notesPayload = JSON.stringify({
            referenceId,
            company: company.trim(),
            website: website ? String(website).trim() : null,
            needHelpWith: Array.isArray(needHelpWith) ? needHelpWith : [needHelpWith].filter(Boolean),
            timeline: timeline || '1 - 3 months',
            budgetRange: budgetRange || 'Flexible',
            preferredContactMethod: preferredContactMethod || 'Email',
            description: description.trim(),
            receivedAt
        });

        // Attempt PostgreSQL insertion if configured
        let dbSaved = false;
        try {
            if (process.env.DATABASE_URL) {
                await query(
                    `INSERT INTO leads (contact_name, contact_email, contact_phone, status, notes)
                     VALUES ($1, $2, $3, 'NEW', $4)`,
                    [name.trim(), workEmail.trim().toLowerCase(), phone ? String(phone).trim() : null, notesPayload],
                    req.headers['x-request-id'] || ''
                );
                dbSaved = true;
            }
        } catch (dbErr) {
            console.error(JSON.stringify({
                level: 'error',
                message: '[ConsultationController] DB persistence warning - lead logged to stream',
                error: dbErr.message,
                referenceId
            }));
        }

        // Structured audit log for telemetry / lead ingestion
        console.log(JSON.stringify({
            level: 'info',
            message: '[ConsultationController] Lead Captured',
            referenceId,
            name: name.trim(),
            email: workEmail.trim().toLowerCase(),
            company: company.trim(),
            dbSaved,
            timestamp: receivedAt
        }));

        // Send alert notification (asynchronous, non-blocking)
        NotificationService.sendEmail(
            process.env.INQUIRY_ALERT_EMAIL || 'leads@agnex.tech',
            `[New Consultation Request] ${company.trim()} — ${referenceId}`,
            `<p>New inquiry received from <strong>${name.trim()}</strong> (${workEmail.trim()}) at <strong>${company.trim()}</strong>.</p>
             <p>Reference: ${referenceId}</p>
             <p>Needs: ${Array.isArray(needHelpWith) ? needHelpWith.join(', ') : 'Not specified'}</p>
             <p>Summary: ${description.trim()}</p>`
        ).catch((notifyErr) => {
            console.warn(JSON.stringify({
                level: 'warn',
                message: '[ConsultationController] Notification dispatch failed',
                error: notifyErr.message
            }));
        });

        return res.status(201).json({
            status: 'success',
            message: 'Consultation request received successfully',
            data: {
                referenceId,
                receivedAt,
                company: company.trim()
            }
        });
    } catch (err) {
        next(err);
    }
};
