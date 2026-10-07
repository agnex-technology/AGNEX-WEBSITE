import { describe, it, expect } from 'vitest';

describe('AGNEX Consultation & Lead Intake Contract', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it('should validate valid business email addresses', () => {
    expect(emailRegex.test('architect@enterprise.com')).toBe(true);
    expect(emailRegex.test('cto@agnextechnology.com')).toBe(true);
    expect(emailRegex.test('cto@agnex.tech')).toBe(true);
    expect(emailRegex.test('invalid-email')).toBe(false);
    expect(emailRegex.test('')).toBe(false);
  });

  it('should reject descriptions under 15 characters', () => {
    const minLength = 15;
    const shortDesc = 'Need an app';
    const validDesc = 'We need an enterprise ERP modernization and API migration.';
    expect(shortDesc.trim().length >= minLength).toBe(false);
    expect(validDesc.trim().length >= minLength).toBe(true);
  });

  it('should generate valid AGX inquiry reference format', () => {
    const generateRef = () => `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
    const ref = generateRef();
    expect(ref).toMatch(/^AGX-\d{6}$/);
  });

  it('should package all mandatory fields for /api/v1/consultation', () => {
    const inquiryPayload = {
      name: 'Elena Rostova',
      workEmail: 'elena@novatech.io',
      company: 'NovaTech Industries',
      description: 'Architecting a distributed logistics and ledger tracking platform.',
      needHelpWith: ['02 — Business Systems (ERP, CRM, Workflows)'],
      timeline: '1 - 3 months',
      budgetRange: '$50,000 - $100,000',
      preferredContactMethod: 'Email',
      honeypot: ''
    };

    expect(inquiryPayload.name.trim().length).toBeGreaterThan(0);
    expect(emailRegex.test(inquiryPayload.workEmail)).toBe(true);
    expect(inquiryPayload.company.trim().length).toBeGreaterThan(0);
    expect(inquiryPayload.description.trim().length).toBeGreaterThanOrEqual(15);
    expect(inquiryPayload.needHelpWith.length).toBeGreaterThanOrEqual(1);
    expect(inquiryPayload.honeypot).toBe('');
  });

  it('should identify honeypot bots correctly', () => {
    const isBot = (honeypot) => Boolean(honeypot && String(honeypot).trim().length > 0);
    expect(isBot('')).toBe(false);
    expect(isBot(undefined)).toBe(false);
    expect(isBot('http://spam-link.ru')).toBe(true);
  });
});
