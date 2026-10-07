/**
 * AGNEX Technology — Vercel Serverless Function: Consultation & Lead Intake
 * Route: /api/consultation (Rewritten from /api/v1/consultation via vercel.json)
 * Plan: Vercel Hobby Free Tier (₹0/month)
 * Database (Optional Free Tier): Supabase PostgreSQL (via DATABASE_URL)
 * Notification (Optional Free Tier): Resend HTTP API (via RESEND_API_KEY, 3000 free emails/mo)
 */

export default async function handler(req, res) {
  // CORS Preflight / Origin Handling
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      status: 'error',
      message: 'Method Not Allowed. Use POST.'
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
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
    } = body;

    // 01 — Anti-bot Honeypot Trapping
    // Silently accept bots to avoid triggering aggressive retry loops
    if (honeypot && String(honeypot).trim().length > 0) {
      const botRef = `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
      return res.status(200).json({
        status: 'success',
        message: 'Consultation request received',
        data: { referenceId: botRef }
      });
    }

    // 02 — Input Validation (Matching enterprise test suite specifications)
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Full name is required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!workEmail || !emailRegex.test(String(workEmail).trim())) {
      return res.status(400).json({
        status: 'error',
        message: 'Valid work email is required'
      });
    }

    if (!company || typeof company !== 'string' || company.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Company or organization name is required'
      });
    }

    if (!description || typeof description !== 'string' || description.trim().length < 15) {
      return res.status(400).json({
        status: 'error',
        message: 'Project description must be at least 15 characters'
      });
    }

    // 03 — Deterministic Inquiry Reference ID
    const referenceId = `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
    const receivedAt = new Date().toISOString();

    const leadPayload = {
      referenceId,
      name: name.trim(),
      workEmail: workEmail.trim().toLowerCase(),
      company: company.trim(),
      phone: phone ? String(phone).trim() : null,
      website: website ? String(website).trim() : null,
      needHelpWith: Array.isArray(needHelpWith) ? needHelpWith : [needHelpWith].filter(Boolean),
      timeline: timeline || '1 - 3 months',
      budgetRange: budgetRange || 'Flexible',
      preferredContactMethod: preferredContactMethod || 'Email',
      description: description.trim(),
      receivedAt
    };

    // 04 — Optional Free Database Persistence (Supabase Free Tier)
    if (process.env.DATABASE_URL) {
      try {
        const { Pool } = await import('pg');
        const pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false }
        });
        await pool.query(
          `INSERT INTO leads (contact_name, contact_email, contact_phone, status, notes)
           VALUES ($1, $2, $3, 'NEW', $4)`,
          [leadPayload.name, leadPayload.workEmail, leadPayload.phone, JSON.stringify(leadPayload)]
        );
        await pool.end();
      } catch (dbError) {
        // Log telemetry without breaking the user experience
        console.warn('[Consultation API] Optional DB persistence bypassed:', dbError.message);
      }
    }

    // 05 — Optional Free Email Notification (Resend Free Tier: 3,000 emails/month free)
    if (process.env.RESEND_API_KEY) {
      try {
        const alertRecipient = process.env.INQUIRY_ALERT_EMAIL || 'contact@agnextechnology.com';
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'AGNEX System <onboarding@resend.dev>',
            to: alertRecipient,
            subject: `[New Inquiry] ${leadPayload.company} — ${referenceId}`,
            html: `
              <h2>New Consultation Request Received</h2>
              <p><strong>Reference:</strong> ${referenceId}</p>
              <p><strong>Name:</strong> ${leadPayload.name}</p>
              <p><strong>Email:</strong> ${leadPayload.workEmail}</p>
              <p><strong>Company:</strong> ${leadPayload.company}</p>
              <p><strong>Timeline:</strong> ${leadPayload.timeline}</p>
              <p><strong>Budget Range:</strong> ${leadPayload.budgetRange}</p>
              <p><strong>Pillars:</strong> ${leadPayload.needHelpWith.join(', ')}</p>
              <p><strong>Scope:</strong></p>
              <blockquote>${leadPayload.description}</blockquote>
            `
          })
        });
      } catch (emailError) {
        console.warn('[Consultation API] Optional notification dispatch bypassed:', emailError.message);
      }
    }

    // 06 — Successful Response Delivery
    return res.status(201).json({
      status: 'success',
      message: 'Consultation request received successfully',
      data: {
        referenceId,
        receivedAt,
        company: leadPayload.company
      }
    });
  } catch (err) {
    console.error('[Consultation API Error]:', err);
    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred while processing your consultation request.'
    });
  }
}
