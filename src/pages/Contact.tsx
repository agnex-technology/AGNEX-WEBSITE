import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollFade from '../components/motion/ScrollFade';

interface FormData {
  needHelpWith: string[];
  description: string;
  timeline: string;
  budgetRange: string;
  name: string;
  workEmail: string;
  company: string;
  phone: string;
  website: string;
  preferredContactMethod: string;
  honeypot: string; // Anti-spam hidden field
}

export default function Contact() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    needHelpWith: [],
    description: '',
    timeline: '1 - 3 months',
    budgetRange: '$25,000 - $50,000',
    name: '',
    workEmail: '',
    company: '',
    phone: '',
    website: '',
    preferredContactMethod: 'Email',
    honeypot: ''
  });

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
      // Silently pretend success to bots
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
                    "url": "https://agnextechnology.com"
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
          padding: 'clamp(4rem, 6vw, 6rem) 0 3rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--agnex-base)'
        }}
        className="agnex-grid-mesh"
      >
        <div className="agnex-container">
          <ScrollFade>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.5rem' }}>
              03 // PROJECT DISCOVERY & CONSULTATION
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                color: 'var(--agnex-white)'
              }}
            >
              Let's Engineer What's Next.
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-muted)',
                maxWidth: '700px',
                lineHeight: 1.6
              }}
            >
              Tell us what you're trying to build, improve or solve. You will receive direct architectural feedback and a realistic project roadmap from our engineering leads.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base-raised)' }}>
        <div className="agnex-container" style={{ maxWidth: '840px' }}>
          {isSuccess ? (
            /* Success State */
            <div
              className="agnex-card"
              style={{
                backgroundColor: 'var(--agnex-base)',
                textAlign: 'center',
                padding: 'clamp(3rem, 5vw, 5rem) 2rem',
                border: '1px solid var(--agnex-accent-border)'
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--agnex-accent-subtle)',
                  border: '2px solid var(--agnex-accent)',
                  color: 'var(--agnex-white)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.75rem',
                  margin: '0 auto 1.5rem auto'
                }}
              >
                ✓
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '1rem' }}>
                Consultation Request Received
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Thank you, <strong>{formData.name}</strong>. An AGNEX engineering lead will review your project parameters and respond to <strong>{formData.workEmail}</strong> within 24 business hours.
              </p>
              <div
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--agnex-base-raised)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--agnex-steel)',
                  marginBottom: '2.5rem',
                  display: 'inline-block'
                }}
              >
                DISCOVERY_REF: {referenceId || `AGX-${Math.floor(100000 + Math.random() * 900000)}`} // STATUS: QUEUED_FOR_ARCHITECT_REVIEW
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setCurrentStep(1);
                    setFormData({
                      needHelpWith: [],
                      description: '',
                      timeline: '1 - 3 months',
                      budgetRange: '$25,000 - $50,000',
                      name: '',
                      workEmail: '',
                      company: '',
                      phone: '',
                      website: '',
                      preferredContactMethod: 'Email',
                      honeypot: ''
                    });
                  }}
                  className="btn btn-secondary"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            /* Progressive Disclosure Multi-Step Form */
            <div
              className="agnex-card"
              style={{
                backgroundColor: 'var(--agnex-base)',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                border: '1px solid var(--border-color)'
              }}
            >
              {/* Progress Indicator */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '2.5rem',
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--agnex-accent)',
                      color: '#FFFFFF',
                      fontWeight: 700
                    }}
                  >
                    STEP {currentStep} OF 2
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', fontWeight: 500 }}>
                    {currentStep === 1 ? 'Project Scope & Requirements' : 'Organization & Contact Details'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '3px',
                      backgroundColor: 'var(--agnex-accent)',
                      borderRadius: '2px'
                    }}
                  />
                  <div
                    style={{
                      width: '28px',
                      height: '3px',
                      backgroundColor: currentStep === 2 ? 'var(--agnex-accent)' : 'var(--agnex-graphite)',
                      borderRadius: '2px',
                      transition: 'background-color 0.3s'
                    }}
                  />
                </div>
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid var(--agnex-error)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--agnex-error)',
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
                  <div className="agnex-form-group">
                    <label className="agnex-label" id="help-label">
                      What do you need help with? <span style={{ color: 'var(--agnex-accent)' }}>*</span>
                    </label>
                    <div
                      role="group"
                      aria-labelledby="help-label"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '0.75rem',
                        marginTop: '0.5rem'
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
                              backgroundColor: checked ? 'var(--agnex-accent-subtle)' : 'var(--agnex-base-raised)',
                              border: '1px solid',
                              borderColor: checked ? 'var(--agnex-accent)' : 'var(--border-color)',
                              borderRadius: 'var(--radius-sm)',
                              color: checked ? 'var(--agnex-white)' : 'var(--agnex-steel)',
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
                                width: '16px',
                                height: '16px',
                                borderRadius: '3px',
                                border: '1px solid',
                                borderColor: checked ? 'var(--agnex-accent)' : 'var(--agnex-steel-dark)',
                                backgroundColor: checked ? 'var(--agnex-accent)' : 'transparent',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                color: '#FFFFFF'
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
                      <span className="agnex-form-error" role="alert" style={{ marginTop: '0.5rem' }}>
                        {validationErrors.needHelpWith}
                      </span>
                    )}
                  </div>

                  <div className="agnex-form-group">
                    <label className="agnex-label" htmlFor="description">
                      Project Description & Core Challenge <span style={{ color: 'var(--agnex-accent)' }}>*</span>
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
                      <span className="agnex-form-error" role="alert">
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
                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="timeline">
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

                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="budgetRange">
                        Anticipated Budget Range
                      </label>
                      <select
                        id="budgetRange"
                        name="budgetRange"
                        className="agnex-select"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                      >
                        <option value="$15,000 - $25,000">$15,000 - $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000+">$100,000+</option>
                        <option value="Flexible / Needs Estimation">Flexible / Needs Estimation</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                      <span>Continue to Contact Info</span>
                      <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
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
                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="name">
                        Your Full Name <span style={{ color: 'var(--agnex-accent)' }}>*</span>
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
                        <span className="agnex-form-error" role="alert">
                          {validationErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="workEmail">
                        Work Email Address <span style={{ color: 'var(--agnex-accent)' }}>*</span>
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
                        <span className="agnex-form-error" role="alert">
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
                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="company">
                        Company / Organization <span style={{ color: 'var(--agnex-accent)' }}>*</span>
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
                        <span className="agnex-form-error" role="alert">
                          {validationErrors.company}
                        </span>
                      )}
                    </div>

                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="website">
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
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '2.5rem'
                    }}
                  >
                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="phone">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="agnex-input"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="agnex-form-group" style={{ margin: 0 }}>
                      <label className="agnex-label" htmlFor="preferredContactMethod">
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
                      </select>
                    </div>
                  </div>

                  {/* Privacy & Confidentiality Guarantee */}
                  <div
                    style={{
                      padding: '1rem',
                      backgroundColor: 'var(--agnex-base-raised)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--agnex-steel)',
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
        </div>
      </section>
    </>
  );
}
