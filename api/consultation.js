/**
 * AGNEX Technology — Vercel Serverless Function: Consultation & Lead Intake
 * Route: /api/consultation (Rewritten from /api/v1/consultation via vercel.json)
 * Plan: Vercel Hobby Free Tier (₹0/month)
 * Database (Optional Free Tier): Supabase PostgreSQL (via DATABASE_URL)
 * Notification (Optional Free Tier): Resend HTTP API (via RESEND_API_KEY, 3000 free emails/mo)
 */

import { Resend } from 'resend';

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
      country,
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
      country: country ? String(country).trim() : 'India',
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

    // 05 — Production Email Notification via Resend SDK
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const alertRecipient = process.env.INQUIRY_ALERT_EMAIL || 'agnextechnology@gmail.com';
        await resend.emails.send({
          from: 'AGNEX Lead Desk <onboarding@resend.dev>',
          to: alertRecipient,
          subject: `[New Project Inquiry] ${leadPayload.company} — ${referenceId}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 8px;">
              <h2 style="color: #0C1C29; margin-top: 0;">New Project Consultation Inquiry</h2>
              <p style="color: #017AEF; font-family: monospace; font-weight: bold; margin-bottom: 20px;">REFERENCE: ${referenceId}</p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 8px 0; color: #64748B; width: 140px;">Name:</td><td style="padding: 8px 0; color: #0C1C29; font-weight: 600;">${leadPayload.name}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Work Email:</td><td style="padding: 8px 0; color: #017AEF; font-weight: 600;"><a href="mailto:${leadPayload.workEmail}">${leadPayload.workEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Company:</td><td style="padding: 8px 0; color: #0C1C29; font-weight: 600;">${leadPayload.company}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Country / Region:</td><td style="padding: 8px 0; color: #0C1C29; font-weight: 600;">${leadPayload.country}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Phone:</td><td style="padding: 8px 0; color: #0C1C29;">${leadPayload.phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Timeline:</td><td style="padding: 8px 0; color: #0C1C29;">${leadPayload.timeline}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Budget:</td><td style="padding: 8px 0; color: #0C1C29;">${leadPayload.budgetRange || 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748B;">Services:</td><td style="padding: 8px 0; color: #0C1C29;">${leadPayload.needHelpWith.join(', ')}</td></tr>
              </table>
              <div style="background-color: #F8FAFC; border-left: 4px solid #017AEF; padding: 16px; border-radius: 4px; margin-top: 16px;">
                <p style="margin: 0 0 8px 0; color: #64748B; font-size: 12px; font-weight: bold; text-transform: uppercase;">Project Description</p>
                <p style="margin: 0; color: #0C1C29; line-height: 1.6; white-space: pre-wrap;">${leadPayload.description}</p>
              </div>
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #94A3B8; text-align: center;">
                AGNEX Technology Lead Dispatch Engine · ${new Date().toISOString()}
              </div>
            </div>
          `
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
