import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollFade from '../components/motion/ScrollFade';
import { LinkedInIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from '../components/brand/SocialIcons';
import { siteConfig } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { Container, SectionLabel, TechnicalLabel } from '../components/primitives';
import { useLocalization } from '../localization/LocalizationContext';
import { CountryCode } from '../localization/types';
import { COUNTRIES } from '../localization/countries';

interface FormData {
  needHelpWith: string[];
  description: string;
  timeline: string;
  budgetRange: string;
  name: string;
  workEmail: string;
  company: string;
  country: string;
  phone: string;
  website: string;
  preferredContactMethod: string;
  honeypot: string; // Anti-spam hidden field
}

export default function Contact() {
  const { country, setCountry, allCountries, isIndia } = useLocalization();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>(() => ({
    needHelpWith: [],
    description: '',
    timeline: '1 - 3 months',
    budgetRange: country.budgetTiers[1]
      ? `${country.budgetTiers[1].label} (${country.budgetTiers[1].range})`
      : `${country.budgetTiers[0]?.label || ''} (${country.budgetTiers[0]?.range || ''})`,
    name: '',
    workEmail: '',
    company: '',
    country: country.name,
    phone: '',
    website: '',
    preferredContactMethod: 'Email',
    honeypot: ''
  }));

  const [searchParams] = useSearchParams();

  // Keep country and budget synchronized if country changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      country: country.name,
      budgetRange: country.budgetTiers[1]
        ? `${country.budgetTiers[1].label} (${country.budgetTiers[1].range})`
        : `${country.budgetTiers[0]?.label || ''} (${country.budgetTiers[0]?.range || ''})`
    }));
  }, [country.code]);

  // Route & commercial tier parameter integration (e.g. /contact?tier=start|build|engineer|custom)
  useEffect(() => {
    const tier = searchParams.get('tier');
    if (!tier) return;

    if (tier === 'start') {
      setFormData((prev) => ({
        ...prev,
        needHelpWith: ['01 — Digital Platforms (Web / Mobile Apps)'],
        budgetRange: country.budgetTiers[0]
          ? `${country.budgetTiers[0].label} (${country.budgetTiers[0].range})`
          : prev.budgetRange
      }));
    } else if (tier === 'build') {
      setFormData((prev) => ({
        ...prev,
        needHelpWith: [
          '01 — Digital Platforms (Web / Mobile Apps)',
          '03 — Intelligence & AI Automation'
        ],
        budgetRange: country.budgetTiers[1]
          ? `${country.budgetTiers[1].label} (${country.budgetTiers[1].range})`
          : prev.budgetRange
      }));
    } else if (tier === 'engineer') {
      setFormData((prev) => ({
        ...prev,
        needHelpWith: ['02 — Business Systems (ERP, CRM, Workflows)'],
        budgetRange: country.budgetTiers[2]
          ? `${country.budgetTiers[2].label} (${country.budgetTiers[2].range})`
          : prev.budgetRange
      }));
    } else if (tier === 'custom') {
      setFormData((prev) => ({
        ...prev,
        needHelpWith: ['04 — Architecture, APIs & Cloud Modernization'],
        budgetRange: 'Flexible / Needs Technical Scoping'
      }));
    }
  }, [searchParams, country.budgetTiers]);

  const helpOptions = [
    { id: 'digital', label: '01 — Digital Platforms (Web / Mobile Apps)' },
    { id: 'systems', label: '02 — Business Systems (ERP, CRM, Workflows)' },
    { id: 'intelligence', label: '03 — Intelligence & AI Automation' },
    { id: 'engineering', label: '04 — Architecture, APIs & Cloud Modernization' }
  ];

  const toggleHelpOption = (label: string) => {
    setFormData((prev) => {
      const exists = prev.needHelpWith.includes(label);
      return {
        ...prev,
        needHelpWith: exists
          ? prev.needHelpWith.filter((item) => item !== label)
          : [...prev.needHelpWith, label]
      };
    });
    if (validationErrors.needHelpWith) {
      setValidationErrors((prev) => ({ ...prev, needHelpWith: '' }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (formData.needHelpWith.length === 0) {
      errors.needHelpWith = 'Please select at least one capability domain.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      errors.description = 'Please provide at least a brief summary of what you are building or solving (min 15 characters).';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim() || !emailRegex.test(formData.workEmail.trim())) {
      errors.workEmail = 'Please provide a valid work email address.';
    }
    if (!formData.company.trim()) {
      errors.company = 'Please provide your company or organization name.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    // Spam honeypot detection
    if (formData.honeypot) {
      setReferenceId(`AGX-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/v1/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          needHelpWith: formData.needHelpWith,
          description: formData.description,
          timeline: formData.timeline,
          budgetRange: formData.budgetRange,
          name: formData.name,
          workEmail: formData.workEmail,
          company: formData.company,
          country: formData.country || country.name,
          phone: formData.phone,
          website: formData.website,
          preferredContactMethod: formData.preferredContactMethod,
          honeypot: formData.honeypot
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }

      const result = await response.json().catch(() => ({}));
      const assignedRef = result.data?.referenceId || `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(assignedRef);
      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'A network disruption occurred. Please try again or reach out directly.';
      setErrorMessage(msg || 'A network disruption occurred. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Project Consultation & Inquiry | AGNEX Technology</title>
        <meta
          name="description"
          content="Start an engineering consultation with AGNEX Technology. Tell us what you are trying to build, improve, or solve."
        />
        <link rel="canonical" href="https://agnextechnology.com/contact" />
        <meta property="og:title" content="Project Consultation & Inquiry | AGNEX Technology" />
        <meta
          property="og:description"
          content="Start an engineering consultation with AGNEX Technology. Practical digital solutions engineered for business impact."
        />
        <meta property="og:url" content="https://agnextechnology.com/contact" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://agnextechnology.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Contact",
                      "item": "https://agnextechnology.com/contact"
                    }
                  ]
                },
                {
                  "@type": "ContactPage",
                  "name": "Project Consultation & Inquiry",
                  "description": "Start an engineering consultation with AGNEX Technology.",
                  "mainEntity": {
                    "@type": "Organization",
                    "name": "AGNEX Technology",
                    "url": "https://agnextechnology.com",
                    "telephone": "+91 75983 41607",
                    "sameAs": [
                      "https://www.linkedin.com/company/agnex-technology",
                      "https://www.instagram.com/agnextechnology"
                    ]
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(5rem, 8vw, 7.5rem) 0 4rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
        className="agnex-blueprint-grid"
      >
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="03" text="PROJECT DISCOVERY & INQUIRY" />
              <TechnicalLabel code="SYS//CONSULT_03" status="ACTIVE" />
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.08,
                marginBottom: '1.25rem',
                color: 'var(--agnex-navy)',
                maxWidth: '920px',
                letterSpacing: 'var(--tracking-tight)'
              }}
            >
              Let's Engineer What's Next.
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                maxWidth: '740px',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Tell us what you're trying to build, improve or solve. You will receive direct architectural feedback and a realistic project roadmap from our engineering leads.
            </p>

            {/* Official Direct Contact & Channels */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 'clamp(1rem, 2.5vw, 2.5rem)',
                marginTop: '2.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              {/* Direct Line Option */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 700
                  }}
                >
                  {isIndia ? 'Direct Line:' : 'Global Desk:'}
                </span>
                <a
                  href={siteConfig.links.phone}
                  className="contact-phone-pill"
                  aria-label={`Call AGNEX Technology at ${country.phoneFormat}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--agnex-navy)',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    minHeight: '44px',
                    transition: 'all 200ms ease'
                  }}
                >
                  <PhoneIcon size={15} style={{ color: 'var(--agnex-blue)' }} />
                  <span>{country.phoneFormat}</span>
                </a>
              </div>

              {/* Region & Timezone Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 700
                  }}
                >
                  Active Market:
                </span>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--agnex-navy)',
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    minHeight: '44px'
                  }}
                >
                  <span>{country.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>·</span>
                  <span style={{ color: 'var(--agnex-blue)' }}>{country.timeZoneLabel}</span>
                </div>
              </div>

              {/* Official WhatsApp Channel */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 700
                  }}
                >
                  WhatsApp:
                </span>
                <a
                  href={siteConfig.links.whatsappWithText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-phone-pill contact-whatsapp-pill"
                  aria-label={`Chat with AGNEX Technology on WhatsApp at ${siteConfig.whatsapp}`}
                  onClick={() => trackEvent('whatsapp_click', { location: 'contact_hero' })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--agnex-navy)',
                    textDecoration: 'none',
                    padding: '0.5rem 0.875rem',
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    minHeight: '44px',
                    transition: 'all 200ms ease'
                  }}
                >
                  <WhatsAppIcon size={15} style={{ color: '#10B981' }} />
                  <span>{siteConfig.whatsapp}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-blue)',
                      marginLeft: '0.25rem'
                    }}
                  >
                    Chat on WhatsApp →
                  </span>
                </a>
              </div>

              {/* Connect with AGNEX */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 700
                  }}
                >
                  Connect:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill"
                    aria-label="Official AGNEX Technology LinkedIn Page"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-xs)',
                      minHeight: '44px',
                      transition: 'color 200ms ease, transform 200ms ease'
                    }}
                  >
                    <LinkedInIcon size={16} />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-pill"
                    aria-label="Official AGNEX Technology Instagram Profile"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-xs)',
                      minHeight: '44px',
                      transition: 'color 200ms ease, transform 200ms ease'
                    }}
                  >
                    <InstagramIcon size={16} />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* Consultation Form Section */}
      <section className="agnex-section agnex-section-subtle">
        <Container style={{ maxWidth: '880px' }}>
          {isSuccess ? (
            /* Success State */
            <div
              style={{
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
                padding: 'clamp(3rem, 5vw, 5rem) 2rem',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--agnex-blue-pale)',
                  border: '2px solid var(--agnex-blue)',
                  color: 'var(--agnex-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 700,
                  margin: '0 auto 1.5rem auto'
                }}
              >
                ✓
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
                Consultation Request Received
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.name}</strong>. An AGNEX engineering lead will review your project parameters and respond to <strong>{formData.workEmail}</strong> within 24 business hours.
              </p>
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--agnex-canvas-subtle)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--agnex-navy)',
                  fontWeight: 600,
                  marginBottom: '2.5rem',
                  display: 'inline-block'
                }}
              >
                DISCOVERY_REF: {referenceId || `AGX-${Math.floor(100000 + Math.random() * 900000)}`} // STATUS: QUEUED_FOR_ARCHITECT_REVIEW
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={siteConfig.links.whatsappWithText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  aria-label="Continue on WhatsApp with AGNEX Technology"
                  onClick={() => trackEvent('whatsapp_click', { location: 'contact_success' })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minHeight: '44px',
                    padding: '0.875rem 1.75rem'
                  }}
                >
                  <WhatsAppIcon size={16} />
                  <span>Continue on WhatsApp →</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                    setFormData({
                      needHelpWith: [],
                      description: '',
                      timeline: '1 - 3 months',
                      budgetRange: country.budgetTiers[1]
                        ? `${country.budgetTiers[1].label} (${country.budgetTiers[1].range})`
                        : `${country.budgetTiers[0]?.label || ''} (${country.budgetTiers[0]?.range || ''})`,
                      name: '',
                      workEmail: '',
                      company: '',
                      country: country.name,
                      phone: '',
                      website: '',
                      preferredContactMethod: 'Email',
                      honeypot: ''
                    });
                  }}
                  className="btn btn-secondary"
                  style={{ minHeight: '44px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Progressive Disclosure Multi-Step Form */
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              {/* Progress Indicator */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2rem',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--agnex-navy)',
                      color: '#FFFFFF',
                      fontWeight: 700
                    }}
                  >
                    STEP {currentStep} OF 2
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', fontWeight: 600 }}>
                    {currentStep === 1 ? 'Project Scope & Requirements' : 'Organization & Contact Details'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '3px',
                      backgroundColor: 'var(--agnex-blue)',
                      borderRadius: '2px'
                    }}
                  />
                  <div
                    style={{
                      width: '28px',
                      height: '3px',
                      backgroundColor: currentStep === 2 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.15)',
                      borderRadius: '2px',
                      transition: 'background-color 0.3s'
                    }}
                  />
                </div>
              </div>

              {/* Fast-Track Official WhatsApp Callout */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  backgroundColor: 'var(--agnex-canvas-subtle)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '2rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <WhatsAppIcon size={16} style={{ color: '#10B981' }} />
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--agnex-navy)' }}>
                      Start a Direct Conversation on WhatsApp
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    Tell us what you're building. We'll outline an immediate response.
                  </p>
                </div>
                <a
                  href={siteConfig.links.whatsappWithText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary contact-whatsapp-direct"
                  aria-label="Continue on WhatsApp with AGNEX Technology"
                  onClick={() => trackEvent('whatsapp_click', { location: 'contact_form_helper' })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: 'var(--text-xs)',
                    padding: '0.5rem 1rem',
                    minHeight: '40px'
                  }}
                >
                  <WhatsAppIcon size={14} style={{ color: '#10B981' }} />
                  <span>Continue on WhatsApp</span>
                  <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                </a>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  style={{
                    padding: '1rem',
                    backgroundColor: '#FEE2E2',
                    border: '1px solid #EF4444',
                    borderRadius: 'var(--radius-sm)',
                    color: '#B91C1C',
                    fontSize: 'var(--text-sm)',
                    marginBottom: '2rem'
                  }}
                >
                  {errorMessage}
                </div>
              )}

              {/* Anti-spam honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                />
              </div>

              {/* STEP 1: Project Scope */}
              {currentStep === 1 && (
                <form onSubmit={handleNextStep}>
                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.75rem' }} id="help-label">
                      What do you need help with? <span style={{ color: 'var(--agnex-blue)' }}>*</span>
                    </label>
                    <div
                      role="group"
                      aria-labelledby="help-label"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '0.75rem'
                      }}
                    >
                      {helpOptions.map((opt) => {
                        const checked = formData.needHelpWith.includes(opt.label);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleHelpOption(opt.label)}
                            style={{
                              textAlign: 'left',
                              padding: '1rem',
                              backgroundColor: checked ? 'var(--agnex-blue-pale)' : '#FFFFFF',
                              border: '1px solid',
                              borderColor: checked ? 'var(--agnex-blue)' : 'var(--border-strong)',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--agnex-navy)',
                              fontWeight: checked ? 600 : 500,
                              fontSize: 'var(--text-xs)',
                              fontFamily: 'var(--font-sans)',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem'
                            }}
                          >
                            <span
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '3px',
                                border: '1px solid',
                                borderColor: checked ? 'var(--agnex-blue)' : 'var(--border-strong)',
                                backgroundColor: checked ? 'var(--agnex-blue)' : '#FFFFFF',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                color: '#FFFFFF',
                                fontWeight: 700
                              }}
                            >
                              {checked ? '✓' : ''}
                            </span>
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    {validationErrors.needHelpWith && (
                      <span role="alert" style={{ display: 'block', color: '#DC2626', fontSize: 'var(--text-xs)', marginTop: '0.5rem', fontWeight: 500 }}>
                        {validationErrors.needHelpWith}
                      </span>
                    )}
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <label htmlFor="description" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                      Project Description & Core Challenge <span style={{ color: 'var(--agnex-blue)' }}>*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="agnex-textarea"
                      placeholder="Briefly describe what you are trying to build, current technical bottlenecks, or desired outcomes..."
                      value={formData.description}
                      onChange={handleInputChange}
                      aria-required="true"
                    />
                    {validationErrors.description && (
                      <span role="alert" style={{ display: 'block', color: '#DC2626', fontSize: 'var(--text-xs)', marginTop: '0.5rem', fontWeight: 500 }}>
                        {validationErrors.description}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '2rem'
                    }}
                  >
                    <div>
                      <label htmlFor="timeline" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Estimated Target Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        className="agnex-select"
                        value={formData.timeline}
                        onChange={handleInputChange}
                      >
                        <option value="Immediate (< 1 month)">Immediate (&lt; 1 month)</option>
                        <option value="1 - 3 months">1 - 3 months</option>
                        <option value="3 - 6 months">3 - 6 months</option>
                        <option value="Exploratory / Unscheduled">Exploratory / Unscheduled</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budgetRange" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Anticipated Budget Range ({country.currencySymbol.trim()} · {country.name})
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        className="agnex-select"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                      >
                        {country.budgetTiers.map((tier) => {
                          const val = `${tier.label} (${tier.range})`;
                          return (
                            <option key={tier.id} value={val}>
                              {val}
                            </option>
                          );
                        })}
                        <option value="Flexible / Needs Technical Scoping">Flexible / Needs Technical Scoping</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                      <span>Continue to Contact Info</span>
                      <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Organization & Contact Info */}
              {currentStep === 2 && (
                <form onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div>
                      <label htmlFor="name" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Your Full Name <span style={{ color: 'var(--agnex-blue)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="agnex-input"
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={handleInputChange}
                        aria-required="true"
                      />
                      {validationErrors.name && (
                        <span role="alert" style={{ display: 'block', color: '#DC2626', fontSize: 'var(--text-xs)', marginTop: '0.5rem', fontWeight: 500 }}>
                          {validationErrors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="workEmail" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Work Email Address <span style={{ color: 'var(--agnex-blue)' }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="workEmail"
                        name="workEmail"
                        className="agnex-input"
                        placeholder="alex@company.com"
                        value={formData.workEmail}
                        onChange={handleInputChange}
                        aria-required="true"
                      />
                      {validationErrors.workEmail && (
                        <span role="alert" style={{ display: 'block', color: '#DC2626', fontSize: 'var(--text-xs)', marginTop: '0.5rem', fontWeight: 500 }}>
                          {validationErrors.workEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div>
                      <label htmlFor="company" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Company / Organization <span style={{ color: 'var(--agnex-blue)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        className="agnex-input"
                        placeholder="Nexus Enterprises"
                        value={formData.company}
                        onChange={handleInputChange}
                        aria-required="true"
                      />
                      {validationErrors.company && (
                        <span role="alert" style={{ display: 'block', color: '#DC2626', fontSize: 'var(--text-xs)', marginTop: '0.5rem', fontWeight: 500 }}>
                          {validationErrors.company}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Operational Region / Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="agnex-select"
                        value={country.code}
                        onChange={(e) => {
                          const selected = e.target.value as CountryCode;
                          setCountry(selected);
                          const cfg = COUNTRIES[selected];
                          setFormData((prev) => ({
                            ...prev,
                            country: cfg.name,
                            budgetRange: cfg.budgetTiers[1]
                              ? `${cfg.budgetTiers[1].label} (${cfg.budgetTiers[1].range})`
                              : `${cfg.budgetTiers[0]?.label || ''} (${cfg.budgetTiers[0]?.range || ''})`
                          }));
                        }}
                      >
                        {allCountries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name} ({c.marketLabel})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label htmlFor="phone" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)' }}>
                          Phone Number (Optional)
                        </label>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                          Prefix: {country.dialCode}
                        </span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="agnex-input"
                        placeholder={country.phoneFormat}
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="preferredContactMethod" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                        Preferred Contact Method
                      </label>
                      <select
                        id="preferredContactMethod"
                        name="preferredContactMethod"
                        className="agnex-select"
                        value={formData.preferredContactMethod}
                        onChange={handleInputChange}
                      >
                        <option value="Email">Email</option>
                        <option value="Video Call (Google Meet / Zoom)">Video Call (Google Meet / Zoom)</option>
                        <option value="Phone Call">Phone Call</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="website" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                      Company Website (Optional)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      className="agnex-input"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Regional Invoicing & Commercial Framework Banner */}
                  <div
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--agnex-canvas-subtle)',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.875rem'
                    }}
                  >
                    <div style={{ fontSize: '1.25rem', lineHeight: 1 }}>
                      {isIndia ? '🇮🇳' : '🌐'}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <strong style={{ color: 'var(--agnex-navy)' }}>
                        {isIndia ? 'India Operations & Tax Invoicing:' : `${country.name} Commercial Framework:`}
                      </strong>{' '}
                      {country.businessContext.invoicingLabel} ({country.businessContext.taxLabel}). {country.businessContext.workflowContext} Typical production delivery: {country.businessContext.turnaround}
                    </div>
                  </div>

                  {/* Privacy & Confidentiality Guarantee */}
                  <div
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--agnex-canvas-subtle)',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '2rem'
                    }}
                  >
                    🔒 <strong>Strict Enterprise Privacy:</strong> We treat all project inquiries and architectural details under standard mutual confidentiality. We never sell or share contact details.
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid var(--border-color)'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-secondary"
                      disabled={isSubmitting}
                    >
                      ← Back to Scope
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                      style={{ padding: '0.875rem 2.25rem' }}
                    >
                      {isSubmitting ? 'Transmitting Discovery...' : 'Submit Project Inquiry →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </Container>
      </section>

      <style>{`
        .contact-phone-pill:hover,
        .contact-whatsapp-pill:hover {
          border-color: var(--agnex-blue) !important;
          background-color: #FFFFFF !important;
          color: var(--agnex-blue) !important;
          box-shadow: 0 2px 8px rgba(1, 122, 239, 0.15);
        }
        .contact-social-pill:hover {
          color: var(--agnex-blue) !important;
          transform: translateY(-1px);
        }
        .contact-whatsapp-direct:hover {
          border-color: var(--agnex-blue) !important;
          color: var(--agnex-blue) !important;
        }
      `}</style>
    </>
  );
}
